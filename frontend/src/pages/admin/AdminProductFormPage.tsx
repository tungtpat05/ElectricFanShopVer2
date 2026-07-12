import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material";
import ProductForm from "../../components/admin/product/ProductForm";

const mockProductsData: Record<string, any> = {
  "1": {
    name: "Africa Twin Adventure Sports",
    brand: "Honda",
    sku: "HON-AFTS-2024",
    priceNum: "16499",
    stock: 9,
    lowStockThreshold: 3,
    status: "published",
    year: "2024",
    variant: "Grand Prix Red",
    description: "The ultimate adventure motorcycle built for crossing continents. Features a powerful twin engine, long-travel suspension, and dual-clutch transmission.",
    engine: "1084 cc liquid-cooled Parallel Twin",
    horsepower: "101 HP @ 7,500 RPM",
    torque: "104 Nm @ 6,250 RPM",
    transmission: "6-speed DCT manual override",
    seatHeight: "850 mm",
    curbWeight: "248 kg",
    metaTitle: "Buy Honda Africa Twin Adventure Sports | TorqueX",
    metaDescription: "Cross continents with the high performance Honda Africa Twin.",
    metaKeywords: "honda, africa twin, adventure, dual sport",
    featured: true,
  },
  "2": {
    name: "CB650R Neo Sports Café",
    brand: "Honda",
    sku: "HON-CB650R-2024",
    priceNum: "9499",
    originalPriceNum: "10299",
    stock: 12,
    lowStockThreshold: 4,
    status: "published",
    year: "2024",
    variant: "Matte Gunpowder Black Metallic",
    description: "Bare-boned naked sports bike with raw power. Retro styling meets ultra-modern performance metrics.",
    engine: "649 cc inline-4, liquid cooled",
    horsepower: "94 HP @ 12,000 RPM",
    torque: "64 Nm @ 8,500 RPM",
    transmission: "6-speed manual with slipper clutch",
    seatHeight: "810 mm",
    curbWeight: "202.5 kg",
    metaTitle: "Honda CB650R Neo Sports Café | TorqueX",
    metaDescription: "Get the raw inline-four cafe styling of the CB650R Neo Sports.",
    metaKeywords: "honda, cb650r, neo sports, cafe racer",
    featured: true,
  },
};

interface AdminProductFormPageProps {
  mode?: "add" | "edit";
}

const AdminProductFormPage = ({ mode: propMode }: AdminProductFormPageProps) => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  
  // Resolve mode from path if not provided as prop
  const isEditPath = location.pathname.includes("/edit") || id !== undefined;
  const mode = propMode || (isEditPath ? "edit" : "add");

  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState<any>(null);

  useEffect(() => {
    if (mode === "edit" && id) {
      setLoading(true);
      // Simulate API load
      const timer = setTimeout(() => {
        const data = mockProductsData[id];
        if (data) {
          setProductData(data);
        } else {
          // Fallback static
          setProductData({
            name: "Mock Bike Out of range",
            brand: "Suzuki",
            sku: "SUZ-MOCK-2024",
            priceNum: "12000",
            stock: 2,
            status: "draft",
          });
        }
        setLoading(false);
      }, 450);

      return () => clearTimeout(timer);
    }
  }, [mode, id]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 280,
          gap: 2,
        }}
      >
        <CircularProgress color="warning" />
        <Typography variant="body2" sx={{ color: "#71717a", fontWeight: 550 }}>
          Loading product specifications...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 1 }}>
      <ProductForm mode={mode} productId={id} initialData={productData} />
    </Box>
  );
};

export default AdminProductFormPage;
