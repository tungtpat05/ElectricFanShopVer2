import React, { useState } from "react";
import { Box, Typography, Button, Avatar, TextField } from "@mui/material";
import SectionCard from "../common/SectionCard";
import { uploadProductImage } from "../../../services/productService";

interface MediaSectionProps {
  thumbnail: string;
  onChange: (url: string, publicId: string) => void;
  disabled?: boolean;
  error?: string;
  productName?: string;
}

const MediaSection = ({ thumbnail, onChange, disabled, error, productName }: MediaSectionProps) => {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError(null);

    try {
      const response = await uploadProductImage(file);
      onChange(response.url, response.publicId);
    } catch (err: any) {
      console.error("Failed to upload image:", err);
      setUploadError(err?.response?.data?.message || err?.message || "Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <SectionCard title="Product Thumbnail">
      <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, alignItems: { xs: "center", sm: "flex-start" }, gap: 3, py: 1 }}>
        <Avatar
          variant="rounded"
          src={thumbnail.trim() || undefined}
          sx={{
            width: 140,
            height: 140,
            border: "1px solid rgba(255, 255, 255, 0.08)",
            backgroundColor: "#27272a",
            fontSize: "2.5rem",
            fontWeight: 600,
            color: "#ff6b35",
          }}
        >
          {!thumbnail.trim() && (productName ? productName.charAt(0).toUpperCase() : "?")}
        </Avatar>
        <Box sx={{ flex: 1, width: "100%", display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            required
            fullWidth
            label="THUMBNAIL IMAGE URL"
            placeholder="No thumbnail uploaded yet"
            value={thumbnail}
            error={Boolean(error)}
            helperText={error}
            slotProps={{
              input: {
                readOnly: true,
              }
            }}
            InputProps={{
              readOnly: true,
            }}
            sx={{
              "& label": { color: "#71717a", fontWeight: 600, fontSize: "0.85rem" },
              "& input": { fontSize: "0.95rem", color: "#a1a1aa" },
            }}
          />
          <Box sx={{ display: "flex", gap: 2, alignItems: "center", flexWrap: "wrap" }}>
            <Button
              variant="outlined"
              component="label"
              disabled={disabled || uploading}
              sx={{
                borderColor: "#71717a",
                color: "#ffffff",
                fontWeight: 600,
                "&:hover": {
                  borderColor: "#ff6b35",
                  backgroundColor: "rgba(255, 107, 53, 0.05)",
                },
              }}
            >
              {uploading ? "Uploading..." : "Upload Thumbnail"}
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageUpload}
              />
            </Button>
            {uploadError && (
              <Typography color="error" variant="caption" sx={{ fontWeight: 550 }}>
                {uploadError}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </SectionCard>
  );
};

export default MediaSection;

