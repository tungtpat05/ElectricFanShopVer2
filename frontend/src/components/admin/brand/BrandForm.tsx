import React, { useState, useEffect } from "react";
import { Box, Grid, Button, Switch, FormControlLabel, TextField, Typography, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SectionCard from "../common/SectionCard";
import { Brand } from "../../../types/brand";
import { createBrand, updateBrand, uploadLogoImage } from "../../../services/brandService";

interface BrandFormProps {
  mode: "add" | "edit";
  brandId?: string;
  initialData?: Brand | null;
}

const BrandForm = ({ mode, brandId, initialData }: BrandFormProps) => {
  const navigate = useNavigate();

  const [brandName, setBrandName] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [logoPublicId, setLogoPublicId] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);

  const [errors, setErrors] = useState<{ brandName?: string; logoUrl?: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);


  // Sync initialData if editing
  useEffect(() => {
    if (mode === "edit" && initialData) {
      setBrandName(initialData.brandName || "");
      setLogoUrl(initialData.logoUrl || "");
      setLogoPublicId(initialData.logoPublicId || "");
      setDescription(initialData.description || "");
      setIsActive(initialData.isActive !== false);
    }
  }, [mode, initialData]);

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError(null);

    try {
      const response = await uploadLogoImage(file);
      setLogoUrl(response.url);
      setLogoPublicId(response.publicId);
    } catch (err: any) {
      console.error("Failed to upload image:", err);
      setUploadError(err?.response?.data?.message || err?.message || "Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };


  const handleCancel = () => {
    navigate("/admin/brands");
  };

  const validate = () => {
    const tempErrors: { brandName?: string; logoUrl?: string } = {};
    if (!brandName.trim()) {
      tempErrors.brandName = "Brand Name is required";
    }
    if (!logoUrl.trim()) {
      tempErrors.logoUrl = "Logo URL is required";
    } else if (!logoUrl.startsWith("http://") && !logoUrl.startsWith("https://")) {
      tempErrors.logoUrl = "Provide a valid image URL starting with http:// or https://";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setSubmitError(null);

    const payload = {
      brandName: brandName.trim(),
      logoUrl: logoUrl.trim(),
      logoPublicId: logoPublicId.trim() || undefined,
      description: description.trim(),
      isActive: isActive,
    };

    try {
      if (mode === "add") {
        await createBrand(payload);
      } else if (mode === "edit" && brandId) {
        await updateBrand(Number(brandId), payload);
      }
      navigate("/admin/brands");
    } catch (err: any) {
      console.error("Failed to commit brand changes:", err);
      setSubmitError(err?.response?.data?.message || err?.message || "Failed to commit brand changes. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSave} sx={{ width: "100%" }}>
      {/* 1. Breadcrumbs path header */}
      <Box sx={{ color: "#71717a", fontSize: "0.85rem", fontWeight: 550, mb: 3 }}>
        <span style={{ cursor: "pointer" }} onClick={handleCancel}>Brands</span>
        {" > "}
        <span style={{ color: "#ffffff" }}>
          {mode === "add" ? "Add New Brand" : `Edit Brand : ${initialData?.brandName || ""}`}
        </span>
      </Box>

      {submitError && (
        <Box sx={{ mb: 3, p: 2, borderRadius: 2, backgroundColor: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.2)" }}>
          <Typography color="error" variant="body2" sx={{ fontWeight: 600 }}>
            {submitError}
          </Typography>
        </Box>
      )}

      {/* 2. Main Form Grid Layout */}
      <Grid container spacing={3.5}>
        {/* Left Side: Brand Details & Logo Preview */}
        <Grid size={{ xs: 12, lg: 8.5 }} sx={{ display: "flex", flexDirection: "column", gap: 3.5 }}>
          <SectionCard title="Brand Details">
            <Grid container spacing={2.5}>
              <Grid size={{ xs: 12 }}>
                <TextField
                  required
                  fullWidth
                  label="BRAND NAME"
                  placeholder="e.g. Electric Fan Co."
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  error={Boolean(errors.brandName)}
                  helperText={errors.brandName}
                  disabled={submitting}
                  sx={{
                    "& label": { color: "#71717a", fontWeight: 600, fontSize: "0.85rem" },
                    "& input": { fontSize: "0.95rem" },
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <TextField
                  multiline
                  rows={4}
                  fullWidth
                  label="BRAND DESCRIPTION"
                  placeholder="Provide a brief summary of the brand history, target audience, and specialization..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={submitting}
                  sx={{
                    "& label": { color: "#71717a", fontWeight: 600, fontSize: "0.85rem" },
                    "& .MuiInputBase-root": { fontSize: "0.95rem" },
                  }}
                />
              </Grid>
            </Grid>
          </SectionCard>

          {/* Logo Preview Section with Upload and Readonly URL */}
          <SectionCard title="Logo Preview">
            <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, alignItems: { xs: "center", sm: "flex-start" }, gap: 3, py: 1 }}>
              <Avatar
                variant="rounded"
                src={logoUrl.trim() || undefined}
                sx={{
                  width: 140,
                  height: 140,
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  backgroundColor: "#27272a",
                  fontSize: "2.5rem",
                  fontWeight: 600,
                  color: "#ff6b35",
                }}
              >
                {!logoUrl.trim() && (brandName ? brandName.charAt(0).toUpperCase() : "?")}
              </Avatar>
              <Box sx={{ flex: 1, width: "100%", display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField
                  required
                  fullWidth
                  label="LOGO IMAGE URL"
                  placeholder="No logo uploaded yet"
                  value={logoUrl}
                  error={Boolean(errors.logoUrl)}
                  helperText={errors.logoUrl}
                  slotProps={{
                    input: {
                      readOnly: true,
                    }
                  }}
                  InputProps={{
                    readOnly: true,
                  }}
                  sx={{
                    "& label": { color: "#71717a", fontWeight: 600, fontSize: "0.85rem" },
                    "& input": { fontSize: "0.95rem", color: "#a1a1aa" },
                  }}
                />
                <Box sx={{ display: "flex", gap: 2, alignItems: "center", flexWrap: "wrap" }}>
                  <Button
                    variant="outlined"
                    component="label"
                    disabled={submitting || uploading}
                    sx={{
                      borderColor: "#71717a",
                      color: "#ffffff",
                      fontWeight: 600,
                      "&:hover": {
                        borderColor: "#ff6b35",
                        backgroundColor: "rgba(255, 107, 53, 0.05)",
                      },
                    }}
                  >
                    {uploading ? "Uploading..." : "Upload Logo Image"}
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleLogoUpload}
                    />
                  </Button>
                  {uploadError && (
                    <Typography color="error" variant="caption" sx={{ fontWeight: 550 }}>
                      {uploadError}
                    </Typography>
                  )}
                </Box>
              </Box>
            </Box>
          </SectionCard>
        </Grid>

        {/* Right Side: Options Settings Card & Action Buttons */}
        <Grid size={{ xs: 12, lg: 3.5 }} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <SectionCard title="Status & Visibility">
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    disabled={submitting}
                    sx={{
                      "& .MuiSwitch-switchBase.Mui-checked": {
                        color: "#ff6b35",
                      },
                      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                        backgroundColor: "#ff6b35",
                      },
                    }}
                  />
                }
                label="Active Status"
                labelPlacement="start"
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mx: 0,
                  color: "#e4e4e7",
                  "& .MuiTypography-root": { fontSize: "0.9rem", fontWeight: 600 },
                }}
              />
            </Box>
          </SectionCard>

          {/* Action Row controller */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={submitting}
              sx={{
                py: 1.25,
                backgroundColor: "#ff6b35",
                color: "#ffffff",
                fontWeight: 700,
                borderRadius: 2,
                boxShadow: "0 4px 12px rgba(255, 107, 53, 0.15)",
                "&:hover": {
                  backgroundColor: "#e05a2b",
                },
              }}
            >
              {submitting ? "Saving..." : mode === "add" ? "Publish Brand" : "Save Changes"}
            </Button>

            <Button
              fullWidth
              disabled={submitting}
              onClick={handleCancel}
              sx={{
                py: 1.25,
                color: "#71717a",
                fontWeight: 600,
                borderRadius: 2,
                "&:hover": {
                  color: "#ef4444",
                  backgroundColor: "rgba(239, 68, 68, 0.05)",
                },
              }}
            >
              Cancel
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BrandForm;
