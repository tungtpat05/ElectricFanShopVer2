import { Grid, TextField, InputAdornment } from "@mui/material";
import SectionCard from "../common/SectionCard";

interface PricingSectionProps {
  formData: any;
  onChange: (field: string, value: any) => void;
  errors?: Record<string, string>;
}

const PricingSection = ({ formData, onChange, errors }: PricingSectionProps) => {
  return (
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
  );
};

export default PricingSection;
