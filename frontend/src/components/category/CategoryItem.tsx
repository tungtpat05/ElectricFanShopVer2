import { Card, Typography, Box } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import { Category } from "@/types/category";

interface CategoryItemProps {
  category: Category;
}

const CATEGORY_IMAGES: Record<string, string> = {
  sport: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600&auto=format&fit=crop&q=80",
  naked: "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?w=600&auto=format&fit=crop&q=80",
  adventure: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&auto=format&fit=crop&q=80",
  enduro: "https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?w=600&auto=format&fit=crop&q=80",
  cruiser: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6?w=600&auto=format&fit=crop&q=80",
  electric: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600&auto=format&fit=crop&q=80",
};

const CATEGORY_MODEL_COUNTS: Record<string, string> = {
  sport: "124 Models",
  naked: "92 Models",
  adventure: "115 Models",
  enduro: "64 Models",
  cruiser: "80 Models",
  electric: "38 Models",
};

const CategoryItem = ({ category }: CategoryItemProps) => {
  const navigate = useNavigate();
  const nameKey = category.categoryName.toLowerCase();

  const bgImage = CATEGORY_IMAGES[nameKey] || CATEGORY_IMAGES.adventure;
  const modelCount = CATEGORY_MODEL_COUNTS[nameKey] || "45 Models";

  return (
    <Card
      onClick={() => navigate(`/products?categoryId=${category.id}`)}
      sx={{
        height: "380px",
        position: "relative",
        borderRadius: "24px",
        overflow: "hidden",
        backgroundImage: `linear-gradient(to top, rgba(9, 9, 11, 0.95) 0%, rgba(9, 9, 11, 0.3) 50%, rgba(9, 9, 11, 0) 100%), url("${bgImage}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        cursor: "pointer",
        border: "1px solid rgba(255, 255, 255, 0.05)",
        transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s ease, border-color 0.4s ease",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.6)",
          borderColor: "rgba(226, 138, 58, 0.3)",
          "& .explore-btn": {
            color: "#f0a256",
            transform: "translateX(4px)",
          },
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          p: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          zIndex: 2,
        }}
      >
        {/* Model Count Badge */}
        <Typography
          variant="caption"
          sx={{
            color: "#e28a3a",
            fontWeight: 800,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            fontSize: "0.75rem",
            mb: 0.8,
          }}
        >
          {modelCount}
        </Typography>

        {/* Category Title */}
        <Typography
          variant="h5"
          sx={{
            color: "#ffffff",
            fontWeight: 800,
            mb: 1.5,
            fontSize: "1.45rem",
            fontFamily: "'Outfit', sans-serif",
          }}
        >
          {category.categoryName}
        </Typography>

        {/* Explore Link */}
        <Box
          className="explore-btn"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            color: "#e28a3a",
            fontWeight: 700,
            fontSize: "0.85rem",
            transition: "all 0.3s ease",
          }}
        >
          Explore {category.categoryName} <ArrowForwardIcon sx={{ fontSize: "1rem" }} />
        </Box>
      </Box>
    </Card>
  );
};

export default CategoryItem;