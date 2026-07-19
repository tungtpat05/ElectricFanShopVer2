import { Grid, TextField } from "@mui/material";
import SectionCard from "../common/SectionCard";

interface SpecificationSectionProps {
  formData: any;
  onChange: (field: string, value: any) => void;
}

const SpecificationSection = ({ formData, onChange }: SpecificationSectionProps) => {
  return (
    <SectionCard title="Technical Specifications">
      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            type="number"
            label="MOTOR CAPACITY (W / cc)"
            placeholder="e.g. 55"
            value={formData.engineCapacity || ""}
            onChange={(e) => onChange("engineCapacity", e.target.value)}
            sx={{
              "& label": { color: "#71717a", fontWeight: 600, fontSize: "0.85rem" },
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            type="number"
            label="WEIGHT (GRAMS)"
            placeholder="e.g. 3500"
            value={formData.weightGram || ""}
            onChange={(e) => onChange("weightGram", e.target.value)}
            sx={{
              "& label": { color: "#71717a", fontWeight: 600, fontSize: "0.85rem" },
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <TextField
            fullWidth
            type="number"
            label="LENGTH (CM)"
            placeholder="e.g. 40"
            value={formData.lengthCm || ""}
            onChange={(e) => onChange("lengthCm", e.target.value)}
            sx={{
              "& label": { color: "#71717a", fontWeight: 600, fontSize: "0.85rem" },
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
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
        <Grid size={{ xs: 12, sm: 4 }}>
          <TextField
            fullWidth
            type="number"
            label="HEIGHT (CM)"
            placeholder="e.g. 120"
            value={formData.heightCm || ""}
            onChange={(e) => onChange("heightCm", e.target.value)}
            sx={{
              "& label": { color: "#71717a", fontWeight: 600, fontSize: "0.85rem" },
            }}
          />
        </Grid>
      </Grid>
    </SectionCard>
  );
};

export default SpecificationSection;
