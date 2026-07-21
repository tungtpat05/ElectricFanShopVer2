import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Avatar,
  TextField,
  CircularProgress,
  IconButton,
  Tooltip,
  Paper,
  Chip
} from "@mui/material";
import {
  ArrowUpward,
  ArrowDownward,
  Delete,
  CloudUpload,
  DragIndicator,
  AddPhotoAlternate,
  Refresh
} from "@mui/icons-material";
import SectionCard from "../common/SectionCard";
import {
  uploadProductImage,
  getProductImages,
  addProductImage,
  updateProductImage,
  deleteProductImage,
  reorderProductImages
} from "../../../services/productService";
import { ProductImage } from "../../../types/product";

interface MediaSectionProps {
  productId?: number;
  thumbnail: string;
  onChange: (url: string, publicId: string) => void;
  disabled?: boolean;
  error?: string;
  productName?: string;
}

const MediaSection = ({
  productId,
  thumbnail,
  onChange,
  disabled,
  error,
  productName
}: MediaSectionProps) => {
  // Thumbnail State
  const [uploadingThumbnail, setUploadingThumbnail] = useState(false);
  const [thumbnailError, setThumbnailError] = useState<string | null>(null);

  // Gallery Images State
  const [images, setImages] = useState<ProductImage[]>([]);
  const [loadingImages, setLoadingImages] = useState(false);
  const [addingImage, setAddingImage] = useState(false);
  const [replacingImageId, setReplacingImageId] = useState<number | null>(null);
  const [deletingImageId, setDeletingImageId] = useState<number | null>(null);
  const [galleryError, setGalleryError] = useState<string | null>(null);

  // Drag and drop state
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  // Fetch gallery images when productId is available
  useEffect(() => {
    if (!productId) return;
    const fetchImages = async () => {
      setLoadingImages(true);
      setGalleryError(null);
      try {
        const data = await getProductImages(productId);
        // Sort by display order
        setImages(data.sort((a, b) => a.displayOrder - b.displayOrder));
      } catch (err: any) {
        console.error("Failed to fetch product images:", err);
        setGalleryError("Failed to load product gallery images.");
      } finally {
        setLoadingImages(false);
      }
    };
    void fetchImages();
  }, [productId]);

  // Thumbnail Upload Handler
  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingThumbnail(true);
    setThumbnailError(null);

    try {
      const response = await uploadProductImage(file);
      onChange(response.url, response.publicId);
    } catch (err: any) {
      console.error("Failed to upload thumbnail:", err);
      setThumbnailError(
        err?.response?.data?.message || err?.message || "Failed to upload thumbnail."
      );
    } finally {
      setUploadingThumbnail(false);
    }
  };

  // Add New Gallery Image Handler
  const handleAddGalleryImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !productId) return;

    setAddingImage(true);
    setGalleryError(null);

    try {
      const uploadRes = await uploadProductImage(file);
      const newImage = await addProductImage(productId, uploadRes.url, uploadRes.publicId);
      setImages((prev) => [...prev, newImage].sort((a, b) => a.displayOrder - b.displayOrder));
    } catch (err: any) {
      console.error("Failed to add image:", err);
      setGalleryError(
        err?.response?.data?.message || err?.message || "Failed to add image. Please try again."
      );
    } finally {
      setAddingImage(false);
      e.target.value = "";
    }
  };

  // Replace Gallery Image Handler
  const handleReplaceGalleryImage = async (
    imageId: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file || !productId) return;

    setReplacingImageId(imageId);
    setGalleryError(null);

    try {
      const uploadRes = await uploadProductImage(file);
      const updated = await updateProductImage(productId, imageId, {
        imageUrl: uploadRes.url,
        imagePublicId: uploadRes.publicId
      });
      setImages((prev) =>
        prev.map((img) => (img.id === imageId ? updated : img))
      );
    } catch (err: any) {
      console.error("Failed to replace image:", err);
      setGalleryError(
        err?.response?.data?.message || err?.message || "Failed to replace image."
      );
    } finally {
      setReplacingImageId(null);
      e.target.value = "";
    }
  };

  // Delete Gallery Image Handler
  const handleDeleteGalleryImage = async (imageId: number) => {
    if (!productId) return;
    if (!window.confirm("Are you sure you want to delete this product image?")) return;

    setDeletingImageId(imageId);
    setGalleryError(null);

    try {
      await deleteProductImage(productId, imageId);
      const updatedList = images.filter((img) => img.id !== imageId);
      setImages(updatedList);
      if (updatedList.length > 0) {
        const reordered = await reorderProductImages(
          productId,
          updatedList.map((img) => img.id)
        );
        setImages(reordered.sort((a, b) => a.displayOrder - b.displayOrder));
      }
    } catch (err: any) {
      console.error("Failed to delete image:", err);
      setGalleryError(
        err?.response?.data?.message || err?.message || "Failed to delete image."
      );
    } finally {
      setDeletingImageId(null);
    }
  };

  // Move image up/down manually
  const handleMoveImage = async (index: number, direction: "up" | "down") => {
    if (!productId) return;
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= images.length) return;

    const newImages = [...images];
    const temp = newImages[index];
    newImages[index] = newImages[targetIndex];
    newImages[targetIndex] = temp;

    setImages(newImages);

    try {
      const reordered = await reorderProductImages(
        productId,
        newImages.map((img) => img.id)
      );
      setImages(reordered.sort((a, b) => a.displayOrder - b.displayOrder));
    } catch (err: any) {
      console.error("Failed to reorder images:", err);
      setGalleryError("Failed to update image display order.");
    }
  };

  // Drag and Drop Handlers
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (dragOverIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>, dropIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === dropIndex || !productId) return;

    const newImages = [...images];
    const [draggedItem] = newImages.splice(draggedIndex, 1);
    newImages.splice(dropIndex, 0, draggedItem);

    setImages(newImages);
    setDraggedIndex(null);
    setDragOverIndex(null);

    try {
      const reordered = await reorderProductImages(
        productId,
        newImages.map((img) => img.id)
      );
      setImages(reordered.sort((a, b) => a.displayOrder - b.displayOrder));
    } catch (err: any) {
      console.error("Failed to reorder images on drop:", err);
      setGalleryError("Failed to update image display order.");
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3.5 }}>
      {/* SECTION 1: THUMBNAIL IMAGE */}
      <SectionCard title="Product Thumbnail">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "center", sm: "flex-start" },
            gap: 3,
            py: 1
          }}
        >
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
              color: "#ff6b35"
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
                  readOnly: true
                }
              }}
              InputProps={{
                readOnly: true
              }}
              sx={{
                "& label": { color: "#71717a", fontWeight: 600, fontSize: "0.85rem" },
                "& input": { fontSize: "0.95rem", color: "#a1a1aa" }
              }}
            />
            <Box sx={{ display: "flex", gap: 2, alignItems: "center", flexWrap: "wrap" }}>
              <Button
                variant="outlined"
                component="label"
                disabled={disabled || uploadingThumbnail}
                startIcon={uploadingThumbnail ? <CircularProgress size={18} color="inherit" /> : <CloudUpload />}
                sx={{
                  borderColor: "#71717a",
                  color: "#ffffff",
                  fontWeight: 600,
                  "&:hover": {
                    borderColor: "#ff6b35",
                    backgroundColor: "rgba(255, 107, 53, 0.05)"
                  }
                }}
              >
                {uploadingThumbnail ? "Uploading..." : "Upload Thumbnail"}
                <input type="file" hidden accept="image/*" onChange={handleThumbnailUpload} />
              </Button>
              {thumbnailError && (
                <Typography color="error" variant="caption" sx={{ fontWeight: 550 }}>
                  {thumbnailError}
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
      </SectionCard>

      {/* SECTION 2: PRODUCT GALLERY IMAGES (ORDERING & MANAGEMENT) */}
      <SectionCard title="Product Gallery Images & Display Order">
        <Typography variant="body2" sx={{ color: "#71717a", mb: 2.5, fontWeight: 500 }}>
          Manage additional product images below. Drag and drop cards or use the Up/Down buttons to adjust display order.
        </Typography>

        {galleryError && (
          <Box
            sx={{
              mb: 2.5,
              p: 1.5,
              borderRadius: 2,
              backgroundColor: "rgba(239, 68, 68, 0.1)",
              border: "1px solid rgba(239, 68, 68, 0.2)"
            }}
          >
            <Typography color="error" variant="caption" sx={{ fontWeight: 600 }}>
              {galleryError}
            </Typography>
          </Box>
        )}

        {!productId ? (
          <Box
            sx={{
              p: 3,
              borderRadius: 2,
              border: "1px dashed rgba(255, 255, 255, 0.15)",
              backgroundColor: "#18181b",
              textAlign: "center"
            }}
          >
            <Typography variant="body2" sx={{ color: "#a1a1aa", fontWeight: 500 }}>
              Please save the product first to enable adding and reordering gallery images.
            </Typography>
          </Box>
        ) : loadingImages ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress color="warning" size={32} />
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2
            }}
          >
            {images.map((img, index) => {
              const isDragging = draggedIndex === index;
              const isDragOver = dragOverIndex === index;

              return (
                <Paper
                  key={img.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragEnd={handleDragEnd}
                  onDrop={(e) => handleDrop(e, index)}
                  elevation={0}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: isDragging ? "rgba(255, 107, 53, 0.08)" : "#18181b",
                    border: isDragOver
                      ? "2px dashed #ff6b35"
                      : isDragging
                      ? "1px dashed rgba(255, 107, 53, 0.5)"
                      : "1px solid rgba(255, 255, 255, 0.08)",
                    opacity: isDragging ? 0.6 : 1,
                    transition: "all 0.2s ease",
                    cursor: "grab",
                    "&:hover": {
                      borderColor: "rgba(255, 107, 53, 0.4)",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
                    }
                  }}
                >
                  {/* Drag Handle & Order Badge */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <DragIndicator sx={{ color: "#71717a", cursor: "grab" }} />
                    <Chip
                      label={`#${index + 1}`}
                      size="small"
                      sx={{
                        backgroundColor: "rgba(255, 107, 53, 0.15)",
                        color: "#ff6b35",
                        fontWeight: 700,
                        fontSize: "0.75rem",
                        height: 24
                      }}
                    />
                  </Box>

                  {/* Image Preview */}
                  <Box
                    component="img"
                    src={img.imageUrl}
                    alt={`Product image ${index + 1}`}
                    sx={{
                      width: 64,
                      height: 64,
                      objectFit: "cover",
                      borderRadius: 1.5,
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      backgroundColor: "#27272a"
                    }}
                  />

                  {/* Image URL info */}
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                      variant="body2"
                      noWrap
                      sx={{ color: "#e4e4e7", fontWeight: 500, fontSize: "0.85rem" }}
                    >
                      {img.imageUrl}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#71717a" }}>
                      Display Order Priority: {index + 1}
                    </Typography>
                  </Box>

                  {/* Action Controls */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    {/* Up Button */}
                    <Tooltip title="Move Up (Increase Priority)">
                      <span>
                        <IconButton
                          size="small"
                          disabled={index === 0}
                          onClick={() => handleMoveImage(index, "up")}
                          sx={{
                            color: index === 0 ? "#3f3f46" : "#a1a1aa",
                            "&:hover": { color: "#ff6b35", backgroundColor: "rgba(255, 107, 53, 0.1)" }
                          }}
                        >
                          <ArrowUpward fontSize="small" />
                        </IconButton>
                      </span>
                    </Tooltip>

                    {/* Down Button */}
                    <Tooltip title="Move Down (Lower Priority)">
                      <span>
                        <IconButton
                          size="small"
                          disabled={index === images.length - 1}
                          onClick={() => handleMoveImage(index, "down")}
                          sx={{
                            color: index === images.length - 1 ? "#3f3f46" : "#a1a1aa",
                            "&:hover": { color: "#ff6b35", backgroundColor: "rgba(255, 107, 53, 0.1)" }
                          }}
                        >
                          <ArrowDownward fontSize="small" />
                        </IconButton>
                      </span>
                    </Tooltip>

                    {/* Replace / Upload Button */}
                    <Tooltip title="Replace this Image">
                      <Button
                        variant="outlined"
                        component="label"
                        size="small"
                        disabled={replacingImageId === img.id}
                        startIcon={
                          replacingImageId === img.id ? (
                            <CircularProgress size={14} color="inherit" />
                          ) : (
                            <Refresh fontSize="small" />
                          )
                        }
                        sx={{
                          borderColor: "rgba(255, 255, 255, 0.15)",
                          color: "#e4e4e7",
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          px: 1.5,
                          "&:hover": {
                            borderColor: "#ff6b35",
                            color: "#ff6b35",
                            backgroundColor: "rgba(255, 107, 53, 0.05)"
                          }
                        }}
                      >
                        {replacingImageId === img.id ? "Replacing..." : "Replace"}
                        <input
                          type="file"
                          hidden
                          accept="image/*"
                          onChange={(e) => handleReplaceGalleryImage(img.id, e)}
                        />
                      </Button>
                    </Tooltip>

                    {/* Delete Button */}
                    <Tooltip title="Delete Image">
                      <IconButton
                        size="small"
                        disabled={deletingImageId === img.id}
                        onClick={() => handleDeleteGalleryImage(img.id)}
                        sx={{
                          color: "#ef4444",
                          "&:hover": { backgroundColor: "rgba(239, 68, 68, 0.1)" }
                        }}
                      >
                        {deletingImageId === img.id ? (
                          <CircularProgress size={16} color="error" />
                        ) : (
                          <Delete fontSize="small" />
                        )}
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Paper>
              );
            })}

            {/* Upload New Image Button Card */}
            <Box
              sx={{
                p: 2.5,
                borderRadius: 2,
                border: "2px dashed rgba(255, 255, 255, 0.15)",
                backgroundColor: "rgba(24, 24, 27, 0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1.5,
                transition: "all 0.2s ease",
                "&:hover": {
                  borderColor: "#ff6b35",
                  backgroundColor: "rgba(255, 107, 53, 0.03)"
                }
              }}
            >
              <Button
                component="label"
                disabled={disabled || addingImage}
                startIcon={
                  addingImage ? (
                    <CircularProgress size={18} color="inherit" />
                  ) : (
                    <AddPhotoAlternate sx={{ color: "#ff6b35" }} />
                  )
                }
                sx={{
                  color: "#ffffff",
                  fontWeight: 650,
                  fontSize: "0.9rem",
                  textTransform: "none"
                }}
              >
                {addingImage ? "Uploading new image..." : "+ Add New Product Image"}
                <input type="file" hidden accept="image/*" onChange={handleAddGalleryImage} />
              </Button>
            </Box>
          </Box>
        )}
      </SectionCard>
    </Box>
  );
};

export default MediaSection;
