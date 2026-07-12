import { Grid, TextField } from "@mui/material";
import SectionCard from "../common/SectionCard";

interface SeoSectionProps {
  formData: any;
  onChange: (field: string, value: any) => void;
}

const SeoSection = ({ formData, onChange }: SeoSectionProps) => {
  return (
    <SectionCard title="Search Engine Optimization (SEO)" sx={{ mt: 3.5 }}>
      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="META TITLE"
            placeholder="e.g. Buy CB650R Neo Sports Café | TorqueX"
            value={formData.metaTitle || ""}
            onChange={(e) => onChange("metaTitle", e.target.value)}
            sx={{
              "& label": { color: "#71717a", fontWeight: 600, fontSize: "0.85rem" },
            }}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextField
            multiline
            rows={3}
            fullWidth
            label="META DESCRIPTION"
            placeholder="Search engine summary snippet description..."
            value={formData.metaDescription || ""}
            onChange={(e) => onChange("metaDescription", e.target.value)}
            sx={{
              "& label": { color: "#71717a", fontWeight: 600, fontSize: "0.85rem" },
            }}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="META KEYWORDS"
            placeholder="e.g. honda, cb650r, motorcycle, sports cafe, buy bike"
            value={formData.metaKeywords || ""}
            onChange={(e) => onChange("metaKeywords", e.target.value)}
            sx={{
              "& label": { color: "#71717a", fontWeight: 600, fontSize: "0.85rem" },
            }}
          />
        </Grid>
      </Grid>
    </SectionCard>
  );
};

export default SeoSection;
