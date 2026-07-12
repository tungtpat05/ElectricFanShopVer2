import { Box, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SectionCard from "../common/SectionCard";

interface MediaSectionProps {
  formData: any;
  onChange: (field: string, value: any) => void;
}

const MediaSection = (_props: MediaSectionProps) => {
  return (
    <SectionCard title="Product Media">
      <Box
        sx={{
          border: "2px dashed rgba(255, 255, 255, 0.08)",
          borderRadius: 3,
          py: 6,
          px: 3,
          backgroundColor: "rgba(255, 255, 255, 0.01)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            borderColor: "#ff6b35",
            backgroundColor: "rgba(255, 107, 53, 0.01)",
          },
        }}
      >
        <CloudUploadIcon sx={{ fontSize: 44, color: "#71717a", mb: 2 }} />
        <Typography variant="body1" sx={{ fontWeight: 650, color: "#ffffff", mb: 0.5, textAlign: "center" }}>
          Drag and drop your images here, or{" "}
          <span style={{ color: "#ff6b35", cursor: "pointer" }}>browse</span>
        </Typography>
        <Typography variant="caption" sx={{ color: "#71717a", textAlign: "center" }}>
          Supports PNG, JPG, JPEG, WEBP. Max size 5MB.
        </Typography>
      </Box>
    </SectionCard>
  );
};

export default MediaSection;
