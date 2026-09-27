import { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { ProductImage, ProductVariant } from "@/types/product";

interface ProductGalleryProps {
  thumbnailUrl?: string;
  productName?: string;
  images?: ProductImage[];
  variants?: ProductVariant[];
}

const ProductGallery = ({ thumbnailUrl, productName, images: apiImages, variants: apiVariants }: ProductGalleryProps) => {
  // Construct gallery list in order: 1. Thumbnail, 2. Product images, 3. Variant images
  const galleryList: string[] = [];

  // 1. Thumbnail product image
  if (thumbnailUrl && thumbnailUrl.trim()) {
    galleryList.push(thumbnailUrl.trim());
  }

  // 2. List of product images
  if (apiImages && apiImages.length > 0) {
    apiImages.forEach((img) => {
      if (img.imageUrl && img.imageUrl.trim() && !galleryList.includes(img.imageUrl.trim())) {
        galleryList.push(img.imageUrl.trim());
      }
    });
  }

  // 3. List of variant images
  if (apiVariants && apiVariants.length > 0) {
    apiVariants.forEach((v) => {
      if (v.variantImage && v.variantImage.trim() && !galleryList.includes(v.variantImage.trim())) {
        galleryList.push(v.variantImage.trim());
      }
    });
  }

  const [activeIndex, setActiveIndex] = useState(0);

  if (galleryList.length === 0) {
    return (
      <Box
        sx={{
          width: "100%",
          height: { xs: "300px", md: "520px" },
          backgroundColor: "#0d0d0f",
          border: "1px dashed rgba(255, 255, 255, 0.15)",
          borderRadius: "24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
        }}
      >
        <Typography variant="h6" sx={{ color: "rgba(255, 255, 255, 0.4)", fontWeight: 700 }}>
          No data
        </Typography>
        <Typography variant="caption" sx={{ color: "rgba(255, 255, 255, 0.25)" }}>
          No image available for this product
        </Typography>
      </Box>
    );
  }

  const prevImage = () => {
    setActiveIndex((prev) => (prev === 0 ? galleryList.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setActiveIndex((prev) => (prev === galleryList.length - 1 ? 0 : prev + 1));
  };

  const currentImage = galleryList[activeIndex] || galleryList[0];

  return (
    <Box sx={{ width: "100%" }}>
      {/* Large Main Image Display */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: { xs: "300px", md: "520px" },
          backgroundColor: "#0d0d0f",
          border: "1px solid rgba(255, 255, 255, 0.05)",
          borderRadius: "24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          mb: 3,
        }}
      >
        <Box
          component="img"
          src={currentImage}
          alt={productName || "Motorcycle View"}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "all 0.3s ease-in-out",
          }}
        />

        {/* Floating Indicator (e.g. 1 / 4) */}
        {galleryList.length > 1 && (
          <Box
            sx={{
              position: "absolute",
              bottom: "20px",
              left: "20px",
              backgroundColor: "rgba(0, 0, 0, 0.65)",
              backdropFilter: "blur(4px)",
              borderRadius: "20px",
              px: 2,
              py: 0.6,
              color: "white",
              fontSize: "0.8rem",
              fontWeight: 800,
              letterSpacing: "0.1em",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              zIndex: 3,
            }}
          >
            {activeIndex + 1} / {galleryList.length}
          </Box>
        )}

        {/* Small Dot Carousel Indicators on Image Bottom Center */}
        {galleryList.length > 1 && (
          <Box
            sx={{
              position: "absolute",
              bottom: "24px",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: 1,
              zIndex: 3,
            }}
          >
            {galleryList.map((_, index) => (
              <Box
                key={index}
                sx={{
                  width: index === activeIndex ? "20px" : "6px",
                  height: "6px",
                  borderRadius: "3px",
                  backgroundColor: index === activeIndex ? "#e28a3a" : "rgba(255,255,255,0.4)",
                  transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              />
            ))}
          </Box>
        )}
      </Box>

      {/* Thumbnails Showcase & Control Bar */}
      {galleryList.length > 1 && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, justifyContent: "center" }}>
          {/* Left Toggle Button */}
          <IconButton
            onClick={prevImage}
            sx={{
              border: "1px solid rgba(255, 255, 255, 0.1)",
              color: "rgba(255, 255, 255, 0.6)",
              width: "36px",
              height: "36px",
              "&:hover": {
                borderColor: "#e28a3a",
                color: "#e28a3a",
                backgroundColor: "rgba(226, 138, 58, 0.05)",
              },
            }}
          >
            <KeyboardArrowLeftIcon fontSize="small" />
          </IconButton>

          {/* Grid of Thumbnails */}
          <Box sx={{ display: "flex", gap: 1.5, overflowX: "auto", py: 0.5 }}>
            {galleryList.map((img, idx) => (
              <Box
                key={idx}
                onClick={() => setActiveIndex(idx)}
                sx={{
                  width: { xs: "50px", sm: "75px", md: "85px" },
                  height: { xs: "38px", sm: "56px", md: "64px" },
                  borderRadius: "12px",
                  border: "2px solid",
                  borderColor: idx === activeIndex ? "#e28a3a" : "transparent",
                  overflow: "hidden",
                  cursor: "pointer",
                  backgroundColor: "#18181b",
                  transition: "all 0.2s",
                  opacity: idx === activeIndex ? 1 : 0.45,
                  "&:hover": {
                    opacity: 0.95,
                    borderColor: idx === activeIndex ? "#e28a3a" : "rgba(255, 255, 255, 0.25)",
                  },
                }}
              >
                <Box
                  component="img"
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
            ))}
          </Box>

          {/* Right Toggle Button */}
          <IconButton
            onClick={nextImage}
            sx={{
              border: "1px solid rgba(255, 255, 255, 0.1)",
              color: "rgba(255, 255, 255, 0.6)",
              width: "36px",
              height: "36px",
              "&:hover": {
                borderColor: "#e28a3a",
                color: "#e28a3a",
                backgroundColor: "rgba(226, 138, 58, 0.05)",
              },
            }}
          >
            <KeyboardArrowRightIcon fontSize="small" />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default ProductGallery;

