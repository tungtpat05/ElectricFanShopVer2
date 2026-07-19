import { Grid, TextField, MenuItem } from "@mui/material";
import SectionCard from "../common/SectionCard";
import { Brand } from "../../../types/brand";
import { Category } from "../../../types/category";

interface BasicInfoSectionProps {
  formData: any;
  brands: Brand[];
  categories: Category[];
  onChange: (field: string, value: any) => void;
  errors?: Record<string, string>;
}

const BasicInfoSection = ({ formData, brands, categories, onChange, errors }: BasicInfoSectionProps) => {
  return (
    <Grid container spacing={3.5}>
      {/* Product Identity Card */}
      <Grid size={{ xs: 12 }}>
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
      </Grid>

      {/* Description Card */}
      <Grid size={{ xs: 12 }}>
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
      </Grid>
    </Grid>
  );
};

export default BasicInfoSection;
