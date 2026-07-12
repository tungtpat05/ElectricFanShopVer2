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
            label="ENGINE DISPLACEMENT"
            placeholder="e.g. 649 cc Inline-4"
            value={formData.engine || ""}
            onChange={(e) => onChange("engine", e.target.value)}
            sx={{
              "& label": { color: "#71717a", fontWeight: 600, fontSize: "0.85rem" },
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="HORSEPOWER"
            placeholder="e.g. 94 HP @ 12,000 RPM"
            value={formData.horsepower || ""}
            onChange={(e) => onChange("horsepower", e.target.value)}
            sx={{
              "& label": { color: "#71717a", fontWeight: 600, fontSize: "0.85rem" },
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="MAX TORQUE"
            placeholder="e.g. 64 Nm @ 8,500 RPM"
            value={formData.torque || ""}
            onChange={(e) => onChange("torque", e.target.value)}
            sx={{
              "& label": { color: "#71717a", fontWeight: 600, fontSize: "0.85rem" },
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="TRANSMISSION"
            placeholder="e.g. 6-speed manual with slipper clutch"
            value={formData.transmission || ""}
            onChange={(e) => onChange("transmission", e.target.value)}
            sx={{
              "& label": { color: "#71717a", fontWeight: 600, fontSize: "0.85rem" },
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="SEAT HEIGHT"
            placeholder="e.g. 810 mm"
            value={formData.seatHeight || ""}
            onChange={(e) => onChange("seatHeight", e.target.value)}
            sx={{
              "& label": { color: "#71717a", fontWeight: 600, fontSize: "0.85rem" },
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="CURB WEIGHT"
            placeholder="e.g. 202.5 kg"
            value={formData.curbWeight || ""}
            onChange={(e) => onChange("curbWeight", e.target.value)}
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
