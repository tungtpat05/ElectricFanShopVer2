import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Product } from "@/types/product.ts";
import { getProducts } from "@/services/productService";
import ProductItem from "./ProductItem";

interface RelatedProductsProps {
  currentProductId: number;
}

const RelatedProducts = ({ currentProductId }: RelatedProductsProps) => {
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        
        // Filter out current active product and limit to 4 items
        const filtered = data
          .filter((p: Product) => p.id !== currentProductId)
          .slice(0, 4);
          
        setRelated(filtered);
      } catch (err) {
        console.error("RelatedProducts error:", err);
      } finally {
        setLoading(false);
      }
    };

    void fetchRelated();
  }, [currentProductId]);

  if (loading || related.length === 0) return null;

  return (
    <Box sx={{ width: "100%", mt: 10 }}>
      {/* Title & View All Row */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          mb: 4,
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
          pb: 2,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              color: "white",
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            You May Also Like
          </Typography>
          <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.4)", mt: 0.5 }}>
            Similar models worth exploring
          </Typography>
        </Box>
        <Link
          to="/products"
          style={{ textDecoration: "none" }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              color: "#e28a3a",
              fontWeight: 700,
              fontSize: "0.85rem",
              transition: "opacity 0.15s",
              "&:hover": { opacity: 0.8 },
            }}
          >
            View all
            <ArrowForwardIcon sx={{ fontSize: "0.95rem" }} />
          </Box>
        </Link>
      </Box>

      {/* Grid of Related Items */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
          },
          gap: 3,
        }}
      >
        {related.map((item) => (
          <ProductItem key={item.id} product={item} />
        ))}
      </Box>
    </Box>
  );
};

export default RelatedProducts;
