import { Grid, TextField, InputAdornment } from "@mui/material";
import SectionCard from "../common/SectionCard";

interface PricingSectionProps {
  formData: any;
  onChange: (field: string, value: any) => void;
}

const PricingSection = ({ formData, onChange }: PricingSectionProps) => {
  return (
    <SectionCard title="Pricing Details">
      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            required
            fullWidth
            type="number"
            label="PRICE"
            placeholder="e.g. 9499"
            value={formData.priceNum || ""}
            onChange={(e) => onChange("priceNum", e.target.value)}
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
            label="ORIGINAL PRICE (BEFORE DISCOUNT)"
            placeholder="e.g. 10299"
            value={formData.originalPriceNum || ""}
            onChange={(e) => onChange("originalPriceNum", e.target.value)}
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
  );
};

export default PricingSection;
