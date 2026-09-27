import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  MenuItem,
  InputAdornment,
  Box,
  Typography,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
  Alert,
  FormHelperText,
  Avatar,
  Button,
} from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import SectionCard from "../common/SectionCard";
import { Brand } from "../../../types/brand";
import { Category } from "../../../types/category";
import { SpecDefinition, ProductSpecification } from "../../../types/specDefinition";
import { getSpecDefinitionsByCategory } from "../../../services/specDefinitionService";
import { getProductSpecifications, uploadProductImage } from "../../../services/productService";

export interface SpecValueState {
  value: string;
  valueNumber: string;
  optionId: string;
  specId?: number;
}

interface BasicInfoSectionProps {
  formData: any;
  brands: Brand[];
  categories: Category[];
  onChange: (field: string, value: any) => void;
  specValues: Record<number, SpecValueState>;
  onSpecValuesChange: React.Dispatch<React.SetStateAction<Record<number, SpecValueState>>>;
  onSpecDefsLoaded?: (defs: SpecDefinition[]) => void;
  productId?: number;
  disabled?: boolean;
  errors?: Record<string, string>;
}

const BasicInfoSection = ({
  formData,
  brands,
  categories,
  onChange,
  specValues,
  onSpecValuesChange,
  onSpecDefsLoaded,
  productId,
  disabled,
  errors,
}: BasicInfoSectionProps) => {
  // Thumbnail Upload State
  const [uploadingThumbnail, setUploadingThumbnail] = useState(false);
  const [thumbnailError, setThumbnailError] = useState<string | null>(null);

  // Category Specifications State
  const [specDefs, setSpecDefs] = useState<SpecDefinition[]>([]);
  const [loadingSpecs, setLoadingSpecs] = useState(false);
  const [specsError, setSpecsError] = useState<string | null>(null);

  const categoryId = formData.categoryId ? Number(formData.categoryId) : undefined;

  // Load category specification fields & initial product specification values
  useEffect(() => {
    const loadData = async () => {
      if (!categoryId) {
        setSpecDefs([]);
        onSpecDefsLoaded?.([]);
        onSpecValuesChange({});
        return;
      }
      setLoadingSpecs(true);
      setSpecsError(null);
      try {
        const defs = await getSpecDefinitionsByCategory(categoryId, true);
        setSpecDefs(defs);
        onSpecDefsLoaded?.(defs);

        let currentSpecs: ProductSpecification[] = [];
        if (productId) {
          currentSpecs = await getProductSpecifications(productId);
        }

        // Initialize spec values state
        const initialMap: Record<number, SpecValueState> = {};
        defs.forEach((def) => {
          const found = currentSpecs.find((s) => s.specDefinitionId === def.id);
          initialMap[def.id] = {
            value: found?.value || "",
            valueNumber:
              found?.valueNumber !== undefined && found?.valueNumber !== null
                ? String(found.valueNumber)
                : "",
            optionId: found?.optionId ? String(found.optionId) : "",
            specId: found?.id,
          };
        });

        onSpecValuesChange(initialMap);
      } catch (err: any) {
        console.error("Failed to load specifications data:", err);
        setSpecsError("Failed to load category specification fields.");
      } finally {
        setLoadingSpecs(false);
      }
    };

    void loadData();
  }, [categoryId, productId]);

  // Thumbnail Upload Handler
  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingThumbnail(true);
    setThumbnailError(null);

    try {
      const response = await uploadProductImage(file);
      onChange("thumbnail", response.url);
      onChange("thumbnailPublicId", response.publicId);
    } catch (err: any) {
      console.error("Failed to upload thumbnail:", err);
      setThumbnailError(
        err?.response?.data?.message || err?.message || "Failed to upload thumbnail."
      );
    } finally {
      setUploadingThumbnail(false);
    }
  };

  const handleSpecFieldChange = (
    specDefId: number,
    field: "value" | "valueNumber" | "optionId",
    val: string
  ) => {
    onSpecValuesChange((prev) => ({
      ...prev,
      [specDefId]: {
        ...(prev[specDefId] || { value: "", valueNumber: "", optionId: "" }),
        [field]: val,
      },
    }));
  };

  const thumbnailVal = formData.thumbnail || "";

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3.5 }}>
      {/* 1. PRODUCT THUMBNAIL CARD */}
      <SectionCard title="Product Thumbnail">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "center", sm: "flex-start" },
            gap: 3,
            py: 1,
          }}
        >
          <Avatar
            variant="rounded"
            src={thumbnailVal.trim() || undefined}
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
            {!thumbnailVal.trim() && (formData.productName ? formData.productName.charAt(0).toUpperCase() : "?")}
          </Avatar>
          <Box sx={{ flex: 1, width: "100%", display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              required
              fullWidth
              label="THUMBNAIL IMAGE URL"
              placeholder="No thumbnail uploaded yet"
              value={thumbnailVal}
              error={Boolean(errors?.thumbnail)}
              helperText={errors?.thumbnail}
              slotProps={{
                input: {
                  readOnly: true,
                },
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
                disabled={disabled || uploadingThumbnail}
                startIcon={uploadingThumbnail ? <CircularProgress size={18} color="inherit" /> : <CloudUpload />}
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
                {uploadingThumbnail ? "Uploading..." : "Upload Thumbnail"}
                <input type="file" hidden accept="image/*" onChange={handleThumbnailUpload} />
              </Button>
              {thumbnailError && (
                <Typography color="error" variant="caption" sx={{ fontWeight: 550 }}>
                  {thumbnailError}
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
      </SectionCard>

      {/* 2. PRODUCT IDENTITY CARD */}
      <SectionCard title="Product Identity">
        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12 }}>
            <TextField
              required
              fullWidth
              label="PRODUCT NAME"
              placeholder="e.g. Stand Fan Super 100"
              value={formData.productName || ""}
              onChange={(e) => onChange("productName", e.target.value)}
              error={Boolean(errors?.productName)}
              helperText={errors?.productName}
              sx={{
                "& label": { color: "#71717a", fontWeight: 600, fontSize: "0.85rem" },
                "& input": { fontSize: "0.95rem" },
              }}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              required
              fullWidth
              label="SLUG"
              placeholder="e.g. stand-fan-super-100"
              value={formData.slug || ""}
              onChange={(e) => onChange("slug", e.target.value)}
              error={Boolean(errors?.slug)}
              helperText={errors?.slug}
              sx={{
                "& label": { color: "#71717a", fontWeight: 600, fontSize: "0.85rem" },
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              select
              required
              fullWidth
              label="BRAND"
              value={formData.brandId || ""}
              onChange={(e) => onChange("brandId", e.target.value)}
              error={Boolean(errors?.brandId)}
              helperText={errors?.brandId}
              sx={{
                "& label": { color: "#71717a", fontWeight: 600, fontSize: "0.85rem" },
              }}
            >
              {brands.map((b) => (
                <MenuItem key={b.id} value={b.id}>
                  {b.brandName}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              select
              required
              fullWidth
              label="CATEGORY"
              value={formData.categoryId || ""}
              onChange={(e) => onChange("categoryId", e.target.value)}
              error={Boolean(errors?.categoryId)}
              helperText={errors?.categoryId}
              sx={{
                "& label": { color: "#71717a", fontWeight: 600, fontSize: "0.85rem" },
              }}
            >
              {categories.map((c) => (
                <MenuItem key={c.id} value={c.id}>
                  {c.categoryName}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              required
              multiline
              rows={2}
              fullWidth
              label="PRODUCT SUMMARY"
              placeholder="Provide a brief summary of the product..."
              value={formData.summary || ""}
              onChange={(e) => onChange("summary", e.target.value)}
              error={Boolean(errors?.summary)}
              helperText={errors?.summary}
              sx={{
                "& label": { color: "#71717a", fontWeight: 600, fontSize: "0.85rem" },
              }}
            />
          </Grid>
        </Grid>
      </SectionCard>

      {/* 3. PRICING DETAILS CARD */}
      <SectionCard title="Pricing Details">
        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              required
              fullWidth
              type="number"
              label="BASE PRICE"
              placeholder="e.g. 99"
              value={formData.basePrice || ""}
              onChange={(e) => onChange("basePrice", e.target.value)}
              error={Boolean(errors?.basePrice)}
              helperText={errors?.basePrice}
              slotProps={{
                input: {
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                },
              }}
              sx={{
                "& label": { color: "#71717a", fontWeight: 600, fontSize: "0.85rem" },
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              type="number"
              label="DISCOUNT PRICE"
              placeholder="e.g. 89"
              value={formData.discountPrice || ""}
              onChange={(e) => onChange("discountPrice", e.target.value)}
              error={Boolean(errors?.discountPrice)}
              helperText={errors?.discountPrice}
              slotProps={{
                input: {
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                },
              }}
              sx={{
                "& label": { color: "#71717a", fontWeight: 600, fontSize: "0.85rem" },
              }}
            />
          </Grid>
        </Grid>
      </SectionCard>

      {/* 4. DESCRIPTION CARD */}
      <SectionCard title="Description">
        <TextField
          required
          multiline
          rows={5}
          fullWidth
          label="PRODUCT DESCRIPTION"
          placeholder="Describe the product's key features, specifications, and details..."
          value={formData.description || ""}
          onChange={(e) => onChange("description", e.target.value)}
          error={Boolean(errors?.description)}
          helperText={errors?.description}
          sx={{
            "& label": { color: "#71717a", fontWeight: 600, fontSize: "0.85rem" },
            "& .MuiInputBase-root": { fontSize: "0.95rem" },
          }}
        />
      </SectionCard>

      {/* 5. CATEGORY SPECIFICATIONS CARD */}
      <SectionCard title="Category Specifications">
        {!categoryId ? (
          <Alert severity="warning" sx={{ backgroundColor: "rgba(234, 179, 8, 0.1)", color: "#facc15" }}>
            Please select a category in <strong>Product Identity</strong> above to load specification fields.
          </Alert>
        ) : loadingSpecs ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress color="warning" />
          </Box>
        ) : specsError ? (
          <Alert severity="error">{specsError}</Alert>
        ) : specDefs.length === 0 ? (
          <Typography variant="body2" sx={{ color: "#71717a", fontStyle: "italic", py: 1 }}>
            No custom specification fields configured for this category yet. You can configure them in Category Management.
          </Typography>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            <Grid container spacing={2.5}>
              {specDefs.map((def) => {
                const curVal = specValues[def.id] || { value: "", valueNumber: "", optionId: "" };
                const specErr = errors?.[`spec_${def.id}`];

                return (
                  <Grid key={def.id} size={{ xs: 12, sm: 6 }}>
                    {def.dataType === "select" ? (
                      <FormControl fullWidth size="small" error={Boolean(specErr)}>
                        <InputLabel sx={{ color: "#71717a", fontWeight: 600, fontSize: "0.85rem" }}>
                          {def.displayName.toUpperCase()}{def.isRequired ? " *" : ""}
                        </InputLabel>
                        <Select
                          value={curVal.optionId}
                          label={`${def.displayName.toUpperCase()}${def.isRequired ? " *" : ""}`}
                          onChange={(e) => handleSpecFieldChange(def.id, "optionId", e.target.value)}
                          sx={{ color: "#ffffff", fontSize: "0.95rem" }}
                        >
                          <MenuItem value="">
                            <em>-- Select {def.displayName} --</em>
                          </MenuItem>
                          {def.options?.map((opt) => (
                            <MenuItem key={opt.id} value={String(opt.id)}>
                              {opt.optionValue}
                            </MenuItem>
                          ))}
                        </Select>
                        {specErr && <FormHelperText color="error">{specErr}</FormHelperText>}
                      </FormControl>
                    ) : def.dataType === "number" ? (
                      <TextField
                        fullWidth
                        type="number"
                        label={`${def.displayName.toUpperCase()}${def.isRequired ? " *" : ""}`}
                        placeholder="e.g. 649"
                        value={curVal.valueNumber}
                        onChange={(e) => handleSpecFieldChange(def.id, "valueNumber", e.target.value)}
                        error={Boolean(specErr)}
                        helperText={specErr}
                        InputProps={{
                          endAdornment: def.unit ? (
                            <InputAdornment position="end" sx={{ "& p": { color: "#a1a1aa", fontWeight: 600 } }}>
                              {def.unit}
                            </InputAdornment>
                          ) : undefined,
                        }}
                        sx={{
                          "& label": { color: "#71717a", fontWeight: 600, fontSize: "0.85rem" },
                        }}
                      />
                    ) : (
                      <TextField
                        fullWidth
                        label={`${def.displayName.toUpperCase()}${def.isRequired ? " *" : ""}`}
                        placeholder="e.g. High Performance"
                        value={curVal.value}
                        onChange={(e) => handleSpecFieldChange(def.id, "value", e.target.value)}
                        error={Boolean(specErr)}
                        helperText={specErr}
                        sx={{
                          "& label": { color: "#71717a", fontWeight: 600, fontSize: "0.85rem" },
                        }}
                      />
                    )}
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        )}
      </SectionCard>

      {/* 6. SHIPPING DIMENSIONS & WEIGHT CARD */}
      <SectionCard title="Shipping Dimensions & Weight">
        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              type="number"
              label="WEIGHT (GRAMS)"
              placeholder="e.g. 2000"
              value={formData.weightGram || ""}
              onChange={(e) => onChange("weightGram", e.target.value)}
              sx={{
                "& label": { color: "#71717a", fontWeight: 600, fontSize: "0.85rem" },
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              type="number"
              label="LENGTH (CM)"
              placeholder="e.g. 50"
              value={formData.lengthCm || ""}
              onChange={(e) => onChange("lengthCm", e.target.value)}
              sx={{
                "& label": { color: "#71717a", fontWeight: 600, fontSize: "0.85rem" },
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              type="number"
              label="WIDTH (CM)"
              placeholder="e.g. 40"
              value={formData.widthCm || ""}
              onChange={(e) => onChange("widthCm", e.target.value)}
              sx={{
                "& label": { color: "#71717a", fontWeight: 600, fontSize: "0.85rem" },
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              type="number"
              label="HEIGHT (CM)"
              placeholder="e.g. 80"
              value={formData.heightCm || ""}
              onChange={(e) => onChange("heightCm", e.target.value)}
              sx={{
                "& label": { color: "#71717a", fontWeight: 600, fontSize: "0.85rem" },
              }}
            />
          </Grid>
        </Grid>
      </SectionCard>
    </Box>
  );
};

export default BasicInfoSection;
