import { Grid, TextField } from "@mui/material";
import SectionCard from "../common/SectionCard";

interface InventorySectionProps {
  formData: any;
  onChange: (field: string, value: any) => void;
}

const InventorySection = ({ formData, onChange }: InventorySectionProps) => {
  return (
    <SectionCard title="Inventory Management" sx={{ mt: 3.5 }}>
      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            required
            fullWidth
            type="number"
            label="CURRENT STOCK"
            placeholder="e.g. 12"
            value={formData.stock || ""}
            onChange={(e) => onChange("stock", e.target.value)}
            sx={{
              "& label": { color: "#71717a", fontWeight: 600, fontSize: "0.85rem" },
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            type="number"
            label="LOW STOCK ALERT THRESHOLD"
            placeholder="e.g. 3"
            value={formData.lowStockThreshold || ""}
            onChange={(e) => onChange("lowStockThreshold", e.target.value)}
            sx={{
              "& label": { color: "#71717a", fontWeight: 600, fontSize: "0.85rem" },
            }}
          />
        </Grid>
      </Grid>
    </SectionCard>
  );
};

export default InventorySection;
