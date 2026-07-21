import React, { useState, useEffect } from "react";
import { Box, Tabs, Tab, Grid, Button, Switch, FormControlLabel, CircularProgress, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import BasicInfoSection from "./BasicInfoSection";
import PricingSection from "./PricingSection";
import SpecificationSection from "./SpecificationSection";
import MediaSection from "./MediaSection";
import VariantSection from "./VariantSection";
import SectionCard from "../common/SectionCard";

import { Brand } from "../../../types/brand";
import { Category } from "../../../types/category";
import { Product } from "../../../types/product";
import { getBrands } from "../../../services/brandService";
import { getCategories } from "../../../services/categoryService";
import { createProduct, updateProduct } from "../../../services/productService";

interface ProductFormProps {
  mode: "add" | "edit";
  productId?: string;
  initialData?: Product | null;
}

const tabsList = ["Basic Info", "Pricing", "Specifications", "Product Images", "Variants"];

const slugify = (text: string) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

const ProductForm = ({ mode, productId, initialData }: ProductFormProps) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  // Form fields state
  const [formData, setFormData] = useState({
    productName: "",
    slug: "",
    brandId: "",
    categoryId: "",
    summary: "",
    description: "",
    basePrice: "",
    discountPrice: "",
    thumbnail: "",
    thumbnailPublicId: "",
    engineCapacity: "",
    weightGram: "",
    lengthCm: "",
    widthCm: "",
    heightCm: "",
    isFeatured: false,
    isActive: true,
  });

  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  
  const [loadingOptions, setLoadingOptions] = useState(false);
  const [optionsError, setOptionsError] = useState<string | null>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Fetch Brands and Categories options
  useEffect(() => {
    const fetchOptions = async () => {
      setLoadingOptions(true);
      setOptionsError(null);
      try {
        const [brandsData, categoriesData] = await Promise.all([
          getBrands(),
          getCategories(),
        ]);
        setBrands(brandsData);
        setCategories(categoriesData);
      } catch (err: any) {
        console.error("Failed to load options:", err);
        setOptionsError("Failed to load brands or categories options. Make sure Backend is running.");
      } finally {
        setLoadingOptions(false);
      }
    };
    void fetchOptions();
  }, []);

  // Sync initialData if editing
  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData({
        productName: initialData.productName || "",
        slug: initialData.slug || "",
        brandId: initialData.brand?.id ? String(initialData.brand.id) : "",
        categoryId: initialData.category?.id ? String(initialData.category.id) : "",
        summary: initialData.summary || "",
        description: initialData.description || "",
        basePrice: initialData.basePrice !== undefined && initialData.basePrice !== null ? String(initialData.basePrice) : "",
        discountPrice: initialData.discountPrice !== undefined && initialData.discountPrice !== null ? String(initialData.discountPrice) : "",
        thumbnail: initialData.thumbnail || "",
        thumbnailPublicId: initialData.thumbnailPublicId || "",
        engineCapacity: initialData.engineCapacity !== undefined && initialData.engineCapacity !== null ? String(initialData.engineCapacity) : "",
        weightGram: initialData.weightGram !== undefined && initialData.weightGram !== null ? String(initialData.weightGram) : "",
        lengthCm: initialData.lengthCm !== undefined && initialData.lengthCm !== null ? String(initialData.lengthCm) : "",
        widthCm: initialData.widthCm !== undefined && initialData.widthCm !== null ? String(initialData.widthCm) : "",
        heightCm: initialData.heightCm !== undefined && initialData.heightCm !== null ? String(initialData.heightCm) : "",
        isFeatured: initialData.isFeatured !== false,
        isActive: initialData.isActive !== false,
      });
      setIsSlugManuallyEdited(true); // Keep existing slug
    }
  }, [mode, initialData]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleFieldChange = (field: string, value: any) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === "productName" && !isSlugManuallyEdited) {
        updated.slug = slugify(value);
      }
      return updated;
    });
  };

  const handleCancel = () => {
    navigate("/admin/products");
  };

  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.productName.trim()) {
      tempErrors.productName = "Product Name is required";
    }
    if (!formData.slug.trim()) {
      tempErrors.slug = "Slug is required";
    }
    if (!formData.brandId) {
      tempErrors.brandId = "Brand is required";
    }
    if (!formData.categoryId) {
      tempErrors.categoryId = "Category is required";
    }
    if (!formData.summary.trim()) {
      tempErrors.summary = "Summary is required";
    }
    if (!formData.description.trim()) {
      tempErrors.description = "Description is required";
    }
    if (!formData.basePrice) {
      tempErrors.basePrice = "Base Price is required";
    }
    if (!formData.thumbnail.trim()) {
      tempErrors.thumbnail = "Thumbnail is required";
    }
    setErrors(tempErrors);

    if (Object.keys(tempErrors).length > 0) {
      // Auto-switch to the first tab that has an error
      if (
        tempErrors.productName ||
        tempErrors.slug ||
        tempErrors.brandId ||
        tempErrors.categoryId ||
        tempErrors.summary ||
        tempErrors.description
      ) {
        setActiveTab(0);
      } else if (tempErrors.basePrice) {
        setActiveTab(1);
      } else if (tempErrors.thumbnail) {
        setActiveTab(3);
      }
      return false;
    }
    return true;
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setSubmitError(null);

    const payload = {
      productName: formData.productName.trim(),
      slug: formData.slug.trim(),
      brandId: Number(formData.brandId),
      categoryId: Number(formData.categoryId),
      summary: formData.summary.trim(),
      description: formData.description.trim(),
      basePrice: Number(formData.basePrice),
      discountPrice: formData.discountPrice ? Number(formData.discountPrice) : 0,
      thumbnail: formData.thumbnail.trim(),
      thumbnailPublicId: formData.thumbnailPublicId.trim(),
      engineCapacity: formData.engineCapacity ? Number(formData.engineCapacity) : undefined,
      weightGram: formData.weightGram ? Number(formData.weightGram) : undefined,
      lengthCm: formData.lengthCm ? Number(formData.lengthCm) : undefined,
      widthCm: formData.widthCm ? Number(formData.widthCm) : undefined,
      heightCm: formData.heightCm ? Number(formData.heightCm) : undefined,
      isFeatured: formData.isFeatured,
      isActive: formData.isActive,
    };

    try {
      if (mode === "add") {
        await createProduct(payload);
      } else if (mode === "edit" && productId) {
        await updateProduct(Number(productId), payload);
      }
      navigate("/admin/products");
    } catch (err: any) {
      console.error("Failed to commit product changes:", err);
      setSubmitError(err?.response?.data?.message || err?.message || "Failed to commit product changes. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingOptions) {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 200, gap: 2 }}>
        <CircularProgress color="warning" />
        <Typography variant="body2" sx={{ color: "#71717a", fontWeight: 550 }}>
          Loading form options...
        </Typography>
      </Box>
    );
  }

  return (
    <Box component="form" onSubmit={handleSave} sx={{ width: "100%" }}>
      {/* 1. Breadcrumbs path header tracker */}
      <Box sx={{ color: "#71717a", fontSize: "0.85rem", fontWeight: 550, mb: 3 }}>
        <span style={{ cursor: "pointer" }} onClick={handleCancel}>Products</span>
        {" > "}
        <span style={{ color: "#ffffff" }}>
          {mode === "add" ? "Add New Product" : `Edit Product : ${formData.slug || ""}`}
        </span>
      </Box>

      {submitError && (
        <Box sx={{ mb: 3, p: 2, borderRadius: 2, backgroundColor: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.2)" }}>
          <Typography color="error" variant="body2" sx={{ fontWeight: 600 }}>
            {submitError}
          </Typography>
        </Box>
      )}

      {optionsError && (
        <Box sx={{ mb: 3, p: 2, borderRadius: 2, backgroundColor: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.2)" }}>
          <Typography color="error" variant="body2" sx={{ fontWeight: 600 }}>
            {optionsError}
          </Typography>
        </Box>
      )}

      {/* 2. Tabs Selector Navigation */}
      <Box
        sx={{
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
          mb: 3.5,
          "& .MuiTabs-indicator": {
            backgroundColor: "#ff6b35",
          },
        }}
      >
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            "& .MuiTab-root": {
              textTransform: "none",
              fontWeight: 650,
              fontSize: "0.9rem",
              color: "#71717a",
              "&.Mui-selected": {
                color: "#ff6b35",
              },
            },
          }}
        >
          {tabsList.map((tabLabel, idx) => (
            <Tab key={tabLabel} label={tabLabel} id={`product-form-tab-${idx}`} />
          ))}
        </Tabs>
      </Box>

      {/* 3. Main Form Grid Layout */}
      <Grid container spacing={3.5}>
        {/* Left Side: Active Tab content details */}
        <Grid size={{ xs: 12, lg: 8.5 }}>
          {activeTab === 0 && (
            <BasicInfoSection
              formData={formData}
              brands={brands}
              categories={categories}
              onChange={handleFieldChange}
              errors={errors}
            />
          )}
          {activeTab === 1 && (
            <PricingSection formData={formData} onChange={handleFieldChange} errors={errors} />
          )}
          {activeTab === 2 && (
            <SpecificationSection formData={formData} onChange={handleFieldChange} />
          )}
          {activeTab === 3 && (
            <MediaSection
              productId={productId ? Number(productId) : undefined}
              thumbnail={formData.thumbnail}
              onChange={(url, publicId) => {
                handleFieldChange("thumbnail", url);
                handleFieldChange("thumbnailPublicId", publicId);
              }}
              disabled={submitting}
              error={errors.thumbnail}
              productName={formData.productName}
            />
          )}
          {activeTab === 4 && (
            <VariantSection
              productId={productId ? Number(productId) : undefined}
              productName={formData.productName}
              disabled={submitting}
            />
          )}
        </Grid>

        {/* Right Side: Options & Actions */}
        <Grid size={{ xs: 12, lg: 3.5 }} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <SectionCard title="Status & Visibility">
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.isActive}
                    onChange={(e) => handleFieldChange("isActive", e.target.checked)}
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

              <FormControlLabel
                control={
                  <Switch
                    checked={formData.isFeatured}
                    onChange={(e) => handleFieldChange("isFeatured", e.target.checked)}
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
                label="Featured Product"
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
              fullWidth
              type="submit"
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
              {submitting ? "Saving..." : mode === "add" ? "Publish Product" : "Save Changes"}
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

export default ProductForm;
