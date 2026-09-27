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
  CircularProgress,
  InputAdornment,
  Alert,
  FormHelperText,
} from "@mui/material";
import SectionCard from "../common/SectionCard";
import { SpecDefinition, ProductSpecification } from "../../../types/specDefinition";
import { getSpecDefinitionsByCategory } from "../../../services/specDefinitionService";
import { getProductSpecifications } from "../../../services/productService";

export interface SpecValueState {
  value: string;
  valueNumber: string;
  optionId: string;
  specId?: number;
}

interface SpecificationSectionProps {
  categoryId?: number;
  productId?: number;
  formData: any;
  onChange: (field: string, value: any) => void;
  specValues: Record<number, SpecValueState>;
  onSpecValuesChange: React.Dispatch<React.SetStateAction<Record<number, SpecValueState>>>;
  onSpecDefsLoaded?: (defs: SpecDefinition[]) => void;
  errors?: Record<string, string>;
}

const SpecificationSection: React.FC<SpecificationSectionProps> = ({
  categoryId,
  productId,
  formData,
  onChange,
  specValues,
  onSpecValuesChange,
  onSpecDefsLoaded,
  errors,
}) => {
  const [specDefs, setSpecDefs] = useState<SpecDefinition[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      if (!categoryId) {
        setSpecDefs([]);
        onSpecDefsLoaded?.([]);
        onSpecValuesChange({});
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const defs = await getSpecDefinitionsByCategory(categoryId, true);
        setSpecDefs(defs);
        onSpecDefsLoaded?.(defs);

        let currentSpecs: ProductSpecification[] = [];
        if (productId) {
          currentSpecs = await getProductSpecifications(productId);
        }

        // Initialize form values state
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
    onSpecValuesChange((prev) => ({
      ...prev,
      [specDefId]: {
        ...(prev[specDefId] || { value: "", valueNumber: "", optionId: "" }),
        [field]: val,
      },
    }));
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {/* 1. Category Specifications Section */}
      <SectionCard title="Category Specifications">
        {!categoryId ? (
          <Alert severity="warning" sx={{ backgroundColor: "rgba(234, 179, 8, 0.1)", color: "#facc15" }}>
            Please select a category in <strong>Product Identity</strong> above to load specification fields.
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
                        placeholder={`e.g. 649`}
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
                        placeholder={`e.g. 95 HP @ 12,000 rpm`}
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

