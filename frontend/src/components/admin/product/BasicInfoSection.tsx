import { Grid, TextField, MenuItem } from "@mui/material";
import SectionCard from "../common/SectionCard";

interface BasicInfoSectionProps {
  formData: any;
  onChange: (field: string, value: any) => void;
}

const brandsList = ["Honda", "Yamaha", "Kawasaki", "Ducati", "BMW Motorrad", "Suzuki", "Triumph", "Harley-Davidson"];
const categoriesList = ["Sport", "Naked / Streetfighter", "Adventure", "Cruiser", "Touring", "Scooter", "Off-Road"];
const modelYears = ["2026", "2025", "2024", "2023", "2022", "2021"];

const BasicInfoSection = ({ formData, onChange }: BasicInfoSectionProps) => {
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
                placeholder="e.g. CB650R Neo Sports Café"
                value={formData.name || ""}
                onChange={(e) => onChange("name", e.target.value)}
                sx={{
                  "& label": { color: "#71717a", fontWeight: 600, fontSize: "0.85rem" },
                  "& input": { fontSize: "0.95rem" },
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                select
                required
                fullWidth
                label="BRAND"
                value={formData.brand || ""}
                onChange={(e) => onChange("brand", e.target.value)}
                sx={{
                  "& label": { color: "#71717a", fontWeight: 600, fontSize: "0.85rem" },
                  "& select": { fontSize: "0.95rem" },
                }}
              >
                {brandsList.map((brand) => (
                  <MenuItem key={brand} value={brand}>
                    {brand}
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
                value={formData.category || ""}
                onChange={(e) => onChange("category", e.target.value)}
                sx={{
                  "& label": { color: "#71717a", fontWeight: 600, fontSize: "0.85rem" },
                }}
              >
                {categoriesList.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                required
                fullWidth
                label="SKU"
                placeholder="e.g. HON-CB650R-2024"
                value={formData.sku || ""}
                onChange={(e) => onChange("sku", e.target.value)}
                sx={{
                  "& label": { color: "#71717a", fontWeight: 600, fontSize: "0.85rem" },
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                select
                fullWidth
                label="MODEL YEAR"
                value={formData.year || "2024"}
                onChange={(e) => onChange("year", e.target.value)}
                sx={{
                  "& label": { color: "#71717a", fontWeight: 600, fontSize: "0.85rem" },
                }}
              >
                {modelYears.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="COLOR / VARIANT"
                placeholder="e.g. Graphite Black"
                value={formData.variant || ""}
                onChange={(e) => onChange("variant", e.target.value)}
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
            multiline
            rows={5}
            fullWidth
            label="PRODUCT DESCRIPTION"
            placeholder="Describe the motorcycle's key features, riding character, and appeal..."
            value={formData.description || ""}
            onChange={(e) => onChange("description", e.target.value)}
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
