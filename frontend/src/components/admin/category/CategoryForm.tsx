import React, { useState, useEffect } from "react";
import { Box, Grid, Button, Switch, FormControlLabel, TextField, Typography, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SectionCard from "../common/SectionCard";
import { Category } from "../../../types/category";
import { createCategory, updateCategory, uploadCategoryImage } from "../../../services/categoryService";

interface CategoryFormProps {
  mode: "add" | "edit";
  categoryId?: string;
  initialData?: Category | null;
}

const slugify = (text: string) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

const CategoryForm = ({ mode, categoryId, initialData }: CategoryFormProps) => {
  const navigate = useNavigate();

  const [categoryName, setCategoryName] = useState("");
  const [slug, setSlug] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);

  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);
  const [errors, setErrors] = useState<{ categoryName?: string; slug?: string; categoryImage?: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError(null);

    try {
      const response = await uploadCategoryImage(file);
      setCategoryImage(response.url);
    } catch (err: any) {
      console.error("Failed to upload image:", err);
      setUploadError(err?.response?.data?.message || err?.message || "Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  // Sync initialData if editing
  useEffect(() => {
    if (mode === "edit" && initialData) {
      setCategoryName(initialData.categoryName || "");
      setSlug(initialData.slug || "");
      setCategoryImage(initialData.categoryImage || "");
      setDescription(initialData.description || "");
      setIsActive(initialData.isActive !== false);
      setIsSlugManuallyEdited(true); // Don't overwrite existing slug
    }
  }, [mode, initialData]);

  const handleCancel = () => {
    navigate("/admin/categories");
  };

  const handleNameChange = (val: string) => {
    setCategoryName(val);
    if (!isSlugManuallyEdited) {
      setSlug(slugify(val));
    }
  };

  const handleSlugChange = (val: string) => {
    setSlug(val);
    setIsSlugManuallyEdited(true);
  };

  const validate = () => {
    const tempErrors: { categoryName?: string; slug?: string; categoryImage?: string } = {};
    if (!categoryName.trim()) {
      tempErrors.categoryName = "Category Name is required";
    }
    if (!slug.trim()) {
      tempErrors.slug = "Slug is required";
    }
    if (!categoryImage.trim()) {
      tempErrors.categoryImage = "Category Image URL is required";
    } else if (!categoryImage.startsWith("http://") && !categoryImage.startsWith("https://")) {
      tempErrors.categoryImage = "Provide a valid image URL starting with http:// or https://";
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
      categoryName: categoryName.trim(),
      slug: slug.trim(),
      categoryImage: categoryImage.trim(),
      description: description.trim(),
      isActive: isActive,
    };

    try {
      if (mode === "add") {
        await createCategory(payload);
      } else if (mode === "edit" && categoryId) {
        await updateCategory(Number(categoryId), payload);
      }
      navigate("/admin/categories");
    } catch (err: any) {
      console.error("Failed to commit category changes:", err);
      setSubmitError(err?.response?.data?.message || err?.message || "Failed to commit category changes. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSave} sx={{ width: "100%" }}>
      {/* 1. Breadcrumbs path header */}
      <Box sx={{ color: "#71717a", fontSize: "0.85rem", fontWeight: 550, mb: 3 }}>
        <span style={{ cursor: "pointer" }} onClick={handleCancel}>Categories</span>
        {" > "}
        <span style={{ color: "#ffffff" }}>
          {mode === "add" ? "Add New Category" : `Edit Category : ${initialData?.categoryName || ""}`}
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
        {/* Left Side: Category Details & Image Preview */}
        <Grid size={{ xs: 12, lg: 8.5 }} sx={{ display: "flex", flexDirection: "column", gap: 3.5 }}>
          <SectionCard title="Category Details">
            <Grid container spacing={2.5}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  required
                  fullWidth
                  label="CATEGORY NAME"
                  placeholder="e.g. Table Fans"
                  value={categoryName}
                  onChange={(e) => handleNameChange(e.target.value)}
                  error={Boolean(errors.categoryName)}
                  helperText={errors.categoryName}
                  disabled={submitting}
                  sx={{
                    "& label": { color: "#71717a", fontWeight: 600, fontSize: "0.85rem" },
                    "& input": { fontSize: "0.95rem" },
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  required
                  fullWidth
                  label="SLUG"
                  placeholder="e.g. table-fans"
                  value={slug}
                  onChange={(e) => handleSlugChange(e.target.value)}
                  error={Boolean(errors.slug)}
                  helperText={errors.slug || "Used in URL configuration"}
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
                  label="CATEGORY DESCRIPTION"
                  placeholder="Provide details about the range of items in this category..."
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

          {/* Image Preview Section with Upload and Readonly URL */}
          <SectionCard title="Image Preview">
            <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, alignItems: { xs: "center", sm: "flex-start" }, gap: 3, py: 1 }}>
              <Avatar
                variant="rounded"
                src={categoryImage.trim() || undefined}
                sx={{
                  width: 180,
                  height: 120,
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  backgroundColor: "#27272a",
                  fontSize: "3rem",
                  fontWeight: 600,
                  color: "#ff6b35",
                }}
              >
                {!categoryImage.trim() && (categoryName ? categoryName.charAt(0).toUpperCase() : "?")}
              </Avatar>
              <Box sx={{ flex: 1, width: "100%", display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField
                  required
                  fullWidth
                  label="CATEGORY IMAGE URL"
                  placeholder="No image uploaded yet"
                  value={categoryImage}
                  error={Boolean(errors.categoryImage)}
                  helperText={errors.categoryImage}
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
                    {uploading ? "Uploading..." : "Upload Category Image"}
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleImageUpload}
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

        {/* Right Side: Options & Actions */}
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
              {submitting ? "Saving..." : mode === "add" ? "Publish Category" : "Save Changes"}
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

export default CategoryForm;
