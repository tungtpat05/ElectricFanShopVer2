import { useState } from "react";
import { Box, IconButton } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

interface ProductGalleryProps {
  thumbnailUrl?: string;
  productName?: string;
}

const ProductGallery = ({ thumbnailUrl, productName }: ProductGalleryProps) => {
  const defaultImage = thumbnailUrl || "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800";
  
  // Custom gallery list to represent high-fidelity details of the bike
  const images = [
    defaultImage,
    "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800", // Engine details
    "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=800", // Side look
    "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800", // Rider action
    "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?w=800", // Speedometer close-up
    "https://images.unsplash.com/photo-1558981359-219d6364c9c8?w=800", // Rear tire look
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const prevImage = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

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
          src={images[activeIndex]}
          alt={productName || "Motorcycle View"}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "all 0.3s ease-in-out",
          }}
        />

        {/* Floating Indicator (e.g. 4 / 8) */}
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
          {activeIndex + 1} / {images.length}
        </Box>

        {/* Small Dot Carousel Indicators on Image Bottom Center */}
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
          {images.map((_, index) => (
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
      </Box>

      {/* Thumbnails Showcase & Control Bar */}
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
          {images.map((img, idx) => (
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
    </Box>
  );
};

export default ProductGallery;
