import { Box, Typography, Avatar, IconButton } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SectionCard from "../common/SectionCard";

const topProducts = [
  {
    name: "CB650R Neo Sports Café",
    sold: 47,
    price: "$9,499",
    image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=80&auto=format&fit=crop&q=60",
  },
  {
    name: "MT-09 SP",
    sold: 38,
    price: "$10,299",
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=80&auto=format&fit=crop&q=60",
  },
  {
    name: "Africa Twin Adventure Sports",
    sold: 28,
    price: "$16,499",
    image: "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?w=80&auto=format&fit=crop&q=60",
  },
  {
    name: "Ninja ZX-10R",
    sold: 22,
    price: "$17,499",
    image: "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=80&auto=format&fit=crop&q=60",
  },
  {
    name: "R1250 GS Adventure",
    sold: 19,
    price: "$23,495",
    image: "https://images.unsplash.com/photo-1558981033-0f0309284409?w=80&auto=format&fit=crop&q=60",
  },
  {
    name: "Speed Triple 1200 RS",
    sold: 14,
    price: "$19,495",
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=80&auto=format&fit=crop&q=60",
  },
];

const TopProductsList = () => {
  return (
    <SectionCard
      title="Top Products"
      headerAction={
        <Typography variant="caption" sx={{ color: "#a1a1aa", fontWeight: 650, display: "flex", alignItems: "center", gap: 0.5, cursor: "pointer", "&:hover": { color: "#ffffff" } }}>
          Manage <ArrowForwardIcon sx={{ fontSize: 13 }} />
        </Typography>
      }
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2.25, maxHeight: 350, overflowY: "auto" }}>
        {topProducts.map((product) => (
          <Box
            key={product.name}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              py: 0.25,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar
                variant="rounded"
                src={product.image}
                sx={{
                  width: 48,
                  height: 48,
                  backgroundColor: "#27272a",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                }}
              />
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 700, color: "#ffffff", fontSize: "0.875rem" }}>
                  {product.name}
                </Typography>
                <Typography variant="caption" sx={{ color: "#71717a", display: "block", mt: 0.25 }}>
                  {product.sold} sold &middot; {product.price}
                </Typography>
              </Box>
            </Box>
            
            <IconButton size="small" sx={{ color: "#71717a", "&:hover": { color: "#ffffff" } }}>
              <ArrowForwardIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </Box>
        ))}
      </Box>
    </SectionCard>
  );
};

export default TopProductsList;
