import { useRef } from "react";
import { CircularProgress, Typography, Box, IconButton, Container } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import LanguageIcon from "@mui/icons-material/Language";
import PeopleIcon from "@mui/icons-material/People";
import { useBrands } from "@/hooks/useBrands";
import BrandList from "./BrandList";

const BrandSection = () => {
  const { brands, loading, error } = useBrands();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const cardWidth = 204; // 180 (card width) + 24 (gap)
      const scrollOffset = direction === "left" ? -cardWidth * 2 : cardWidth * 2;
      scrollContainerRef.current.scrollBy({
        left: scrollOffset,
        behavior: "smooth",
      });
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ py: 8, textAlign: "center" }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        py: { xs: 8, md: 10 },
        backgroundColor: "#050506",
        borderTop: "1px solid rgba(255, 255, 255, 0.03)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.03)",
        position: "relative",
      }}
    >
      <Container maxWidth={false} sx={{ px: { xs: 2.5, md: 6 } }}>
        {/* Section Header */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "flex-end" },
            gap: { xs: 3, sm: 0 },
            mb: 5,
          }}
        >
          <Box>
            <Typography
              variant="caption"
              sx={{
                color: "#e28a3a",
                fontWeight: 800,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                display: "block",
                mb: 1.5,
              }}
            >
              MANUFACTURERS
            </Typography>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                color: "#fff",
                fontSize: { xs: "2rem", md: "2.8rem" },
                fontFamily: "'Outfit', sans-serif",
                lineHeight: 1.15,
                mb: 1.5,
              }}
            >
              World's Greatest Brands
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "rgba(255, 255, 255, 0.4)",
                fontSize: "1rem",
                maxWidth: 420,
                lineHeight: 1.5,
              }}
            >
              Explore motorcycles from the most trusted brands around the world.
            </Typography>
          </Box>

          {/* Navigation Arrows */}
          <Box sx={{ display: "flex", gap: 1.5, alignSelf: { xs: "flex-end", sm: "auto" } }}>
            <IconButton
              onClick={() => handleScroll("left")}
              aria-label="Scroll left"
              sx={{
                border: "1px solid rgba(255, 255, 255, 0.15)",
                color: "#ffffff",
                width: 44,
                height: 44,
                transition: "all 0.2s",
                "&:hover": {
                  borderColor: "#e28a3a",
                  color: "#e28a3a",
                  backgroundColor: "rgba(226, 138, 58, 0.08)",
                },
              }}
            >
              <KeyboardArrowLeftIcon />
            </IconButton>
            <IconButton
              onClick={() => handleScroll("right")}
              aria-label="Scroll right"
              sx={{
                border: "1px solid rgba(255, 255, 255, 0.15)",
                color: "#ffffff",
                width: 44,
                height: 44,
                transition: "all 0.2s",
                "&:hover": {
                  borderColor: "#e28a3a",
                  color: "#e28a3a",
                  backgroundColor: "rgba(226, 138, 58, 0.08)",
                },
              }}
            >
              <KeyboardArrowRightIcon />
            </IconButton>
          </Box>
        </Box>

        {/* Brand Scroller Row */}
        <Box sx={{ mb: 5 }}>
          <BrandList ref={scrollContainerRef} brands={brands} />
        </Box>

        {/* Brand Summary Subtext Details Row */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            flexWrap: "wrap",
            opacity: 0.5,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <LanguageIcon sx={{ fontSize: "1.1rem", color: "#ffffff" }} />
            <Typography
              variant="body2"
              sx={{
                color: "#ffffff",
                fontWeight: 500,
                fontSize: "0.85rem",
              }}
            >
              {brands.length} brands available
            </Typography>
          </Box>

          <Box
            component="span"
            sx={{
              color: "#ffffff",
              fontSize: "0.85rem",
              mx: 0.5,
              display: { xs: "none", sm: "inline" },
            }}
          >
            •
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <PeopleIcon sx={{ fontSize: "1.1rem", color: "#ffffff" }} />
            <Typography
              variant="body2"
              sx={{
                color: "#ffffff",
                fontWeight: 500,
                fontSize: "0.85rem",
              }}
            >
              50+ global manufacturers
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default BrandSection;
