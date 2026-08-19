import React, { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  Typography,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  CircularProgress,
  InputAdornment,
  Alert,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import SectionCard from "../common/SectionCard";
import { SpecDefinition, ProductSpecification } from "../../../types/specDefinition";
import { getSpecDefinitionsByCategory } from "../../../services/specDefinitionService";
import {
  getProductSpecifications,
  createProductSpecification,
  updateProductSpecification,
} from "../../../services/productService";

interface SpecificationSectionProps {
  categoryId?: number;
  productId?: number;
  formData: any;
  onChange: (field: string, value: any) => void;
}

const SpecificationSection: React.FC<SpecificationSectionProps> = ({
  categoryId,
  productId,
  formData,
  onChange,
}) => {
  const [specDefs, setSpecDefs] = useState<SpecDefinition[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form values state for spec definitions: specDefId -> { value, valueNumber, optionId, specId? }
  const [specValues, setSpecValues] = useState<
    Record<
      number,
      {
        value: string;
        valueNumber: string;
        optionId: string;
        specId?: number;
      }
    >
  >({});

  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      if (!categoryId) {
        setSpecDefs([]);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const defs = await getSpecDefinitionsByCategory(categoryId, true);
        setSpecDefs(defs);

        let currentSpecs: ProductSpecification[] = [];
        if (productId) {
          currentSpecs = await getProductSpecifications(productId);
        }

        // Initialize form values state
        const initialMap: Record<
          number,
          { value: string; valueNumber: string; optionId: string; specId?: number }
        > = {};

        defs.forEach((def) => {
          const found = currentSpecs.find((s) => s.specDefinitionId === def.id);
          initialMap[def.id] = {
            value: found?.value || "",
            valueNumber: found?.valueNumber !== undefined && found?.valueNumber !== null ? String(found.valueNumber) : "",
            optionId: found?.optionId ? String(found.optionId) : "",
            specId: found?.id,
          };
        });

        setSpecValues(initialMap);
      } catch (err: any) {
        console.error("Failed to load specifications data:", err);
        setError("Failed to load category specification fields.");
      } finally {
        setLoading(false);
      }
    };

    void loadData();
  }, [categoryId, productId]);

  const handleSpecFieldChange = (
    specDefId: number,
    field: "value" | "valueNumber" | "optionId",
    val: string
  ) => {
    setSpecValues((prev) => ({
      ...prev,
      [specDefId]: {
        ...(prev[specDefId] || { value: "", valueNumber: "", optionId: "" }),
        [field]: val,
      },
    }));
  };

  const handleSaveSpecs = async () => {
    if (!productId) {
      alert("Please save the basic product information first before saving detailed specifications.");
      return;
    }

    setSaving(true);
    setSaveSuccess(null);
    setSaveError(null);

    try {
      for (const def of specDefs) {
        const valState = specValues[def.id];
        if (!valState) continue;

        const hasTextValue = valState.value.trim().length > 0;
        const hasNumberValue = valState.valueNumber.trim().length > 0;
        const hasOptionValue = valState.optionId !== "";

        const hasAnyValue = hasTextValue || hasNumberValue || hasOptionValue;

        if (valState.specId) {
          // Update existing
          if (hasAnyValue) {
            await updateProductSpecification(productId, valState.specId, {
              specDefinitionId: def.id,
              value: hasTextValue ? valState.value.trim() : undefined,
              valueNumber: hasNumberValue ? Number(valState.valueNumber) : undefined,
              optionId: hasOptionValue ? Number(valState.optionId) : undefined,
            });
          }
        } else if (hasAnyValue) {
          // Create new
          const created = await createProductSpecification(productId, {
            specDefinitionId: def.id,
            value: hasTextValue ? valState.value.trim() : undefined,
            valueNumber: hasNumberValue ? Number(valState.valueNumber) : undefined,
            optionId: hasOptionValue ? Number(valState.optionId) : undefined,
          });

          // update local specId
          setSpecValues((prev) => ({
            ...prev,
            [def.id]: {
              ...prev[def.id],
              specId: created.id,
            },
          }));
        }
      }

      setSaveSuccess("Specifications saved successfully!");
    } catch (err: any) {
      console.error("Failed to save product specifications:", err);
      setSaveError(err?.response?.data?.message || err?.message || "Failed to save specifications.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {/* 1. Category Specifications Section */}
      <SectionCard title="Category Specifications">
        {!categoryId ? (
          <Alert severity="warning" sx={{ backgroundColor: "rgba(234, 179, 8, 0.1)", color: "#facc15" }}>
            Please select a category in the <strong>Basic Info</strong> tab first to load specification fields.
          </Alert>
        ) : loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress color="warning" />
          </Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : specDefs.length === 0 ? (
          <Typography variant="body2" sx={{ color: "#71717a", fontStyle: "italic", py: 1 }}>
            No custom specification fields configured for this category yet. You can configure them in Category Management.
          </Typography>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            {saveSuccess && <Alert severity="success">{saveSuccess}</Alert>}
            {saveError && <Alert severity="error">{saveError}</Alert>}

            {!productId && (
              <Alert severity="info" sx={{ backgroundColor: "rgba(59, 130, 246, 0.1)", color: "#60a5fa" }}>
                Fill out the values below. After publishing the product, click <strong>"Save Specifications"</strong> to commit these fields.
              </Alert>
            )}

            <Grid container spacing={2.5}>
              {specDefs.map((def) => {
                const curVal = specValues[def.id] || { value: "", valueNumber: "", optionId: "" };
                return (
                  <Grid key={def.id} size={{ xs: 12, sm: 6 }}>
                    {def.dataType === "select" ? (
                      <FormControl fullWidth size="small">
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
                      </FormControl>
                    ) : def.dataType === "number" ? (
                      <TextField
                        fullWidth
                        type="number"
                        label={`${def.displayName.toUpperCase()}${def.isRequired ? " *" : ""}`}
                        placeholder={`e.g. 649`}
                        value={curVal.valueNumber}
                        onChange={(e) => handleSpecFieldChange(def.id, "valueNumber", e.target.value)}
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
                        placeholder={`e.g. 95 HP @ 12,000 rpm`}
                        value={curVal.value}
                        onChange={(e) => handleSpecFieldChange(def.id, "value", e.target.value)}
                        sx={{
                          "& label": { color: "#71717a", fontWeight: 600, fontSize: "0.85rem" },
                        }}
                      />
                    )}
                  </Grid>
                );
              })}
            </Grid>

            {productId && (
              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<SaveIcon />}
                  onClick={handleSaveSpecs}
                  disabled={saving}
                  sx={{
                    backgroundColor: "#ff6b35",
                    color: "#ffffff",
                    fontWeight: 700,
                    "&:hover": { backgroundColor: "#e05a2b" },
                  }}
                >
                  {saving ? "Saving Specs..." : "Save Specifications"}
                </Button>
              </Box>
            )}
          </Box>
        )}
      </SectionCard>

      {/* 2. Physical Dimensions Section */}
      <SectionCard title="Shipping Dimensions & Weight">
        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              type="number"
              label="WEIGHT (GRAMS)"
              placeholder="e.g. 202000"
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
              placeholder="e.g. 213"
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
              placeholder="e.g. 78"
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
              placeholder="e.g. 107"
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

export default SpecificationSection;
