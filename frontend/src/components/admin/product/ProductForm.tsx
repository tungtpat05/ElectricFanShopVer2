import React, { useState } from "react";
import { Box, Tabs, Tab, Grid, Button, Switch, FormControlLabel, MenuItem, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

import BasicInfoSection from "./BasicInfoSection";
import PricingSection from "./PricingSection";
import InventorySection from "./InventorySection";
import SpecificationSection from "./SpecificationSection";
import MediaSection from "./MediaSection";
import SeoSection from "./SeoSection";
import SectionCard from "../common/SectionCard";

interface ProductFormProps {
  mode: "add" | "edit";
  productId?: string;
  initialData?: any;
}

const tabsList = ["Basic Info", "Pricing & Inventory", "Specifications", "Media & SEO"];

const ProductForm = ({ mode, productId: _productId, initialData }: ProductFormProps) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  
  // React forms state
  const [formData, setFormData] = useState(
    initialData || {
      name: "",
      brand: "",
      category: "",
      sku: "",
      year: "2024",
      variant: "",
      description: "",
      priceNum: "",
      originalPriceNum: "",
      stock: "",
      lowStockThreshold: "3",
      engine: "",
      horsepower: "",
      torque: "",
      transmission: "",
      seatHeight: "",
      curbWeight: "",
      metaTitle: "",
      metaDescription: "",
      metaKeywords: "",
      status: "draft",
      featured: false,
    }
  );

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleFieldChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleCancel = () => {
    navigate("/admin/products");
  };

  const handleSave = () => {
    console.log("Saving form data:", formData);
    navigate("/admin/products");
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* 1. Breadcrumbs path header tracker */}
      <Box sx={{ color: "#71717a", fontSize: "0.85rem", fontWeight: 550, mb: 3 }}>
        <span style={{ cursor: "pointer" }} onClick={handleCancel}>Products</span>
        {" > "}
        <span style={{ color: "#ffffff" }}>
          {mode === "add" ? "Add New Product" : `Edit Product : ${formData.sku || ""}`}
        </span>
      </Box>

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
            <BasicInfoSection formData={formData} onChange={handleFieldChange} />
          )}
          {activeTab === 1 && (
            <Box>
              <PricingSection formData={formData} onChange={handleFieldChange} />
              <InventorySection formData={formData} onChange={handleFieldChange} />
            </Box>
          )}
          {activeTab === 2 && (
            <SpecificationSection formData={formData} onChange={handleFieldChange} />
          )}
          {activeTab === 3 && (
            <Box>
              <MediaSection formData={formData} onChange={handleFieldChange} />
              <SeoSection formData={formData} onChange={handleFieldChange} />
            </Box>
          )}
        </Grid>

        {/* Right Side: Action Control cards */}
        <Grid size={{ xs: 12, lg: 3.5 }}>
          <Grid container spacing={3}>
            {/* Publishing Settings panel */}
            <Grid size={{ xs: 12 }}>
              <SectionCard title="Publishing">
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                  <TextField
                    select
                    fullWidth
                    label="STATUS"
                    value={formData.status || "draft"}
                    onChange={(e) => handleFieldChange("status", e.target.value)}
                    sx={{
                      "& label": { color: "#71717a", fontWeight: 600, fontSize: "0.85rem" },
                    }}
                  >
                    <MenuItem value="draft">Draft</MenuItem>
                    <MenuItem value="published">Published</MenuItem>
                  </TextField>

                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.featured || false}
                        onChange={(e) => handleFieldChange("featured", e.target.checked)}
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
            </Grid>

            {/* Actions button row panel */}
            <Grid size={{ xs: 12 }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleSave}
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
                  {mode === "add" ? "Publish Product" : "Save Changes"}
                </Button>
                
                {mode === "add" && (
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={handleSave}
                    sx={{
                      py: 1.25,
                      borderColor: "rgba(255,255,255,0.08)",
                      color: "#a1a1aa",
                      fontWeight: 600,
                      borderRadius: 2,
                      "&:hover": {
                        borderColor: "rgba(255,255,255,0.15)",
                        backgroundColor: "rgba(255,255,255,0.01)",
                        color: "#ffffff",
                      },
                    }}
                  >
                    Save as Draft
                  </Button>
                )}

                <Button
                  fullWidth
                  onClick={handleCancel}
                  sx={{
                    py: 1.25,
                    color: "#71717a",
                    fontWeight: 600,
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
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductForm;
