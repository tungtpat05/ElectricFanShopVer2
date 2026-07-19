import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material";
import ProductForm from "../../components/admin/product/ProductForm";
import { getProductById } from "../../services/productService";
import { Product } from "../../types/product";

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
  const [productData, setProductData] = useState<Product | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    if (mode === "edit" && id) {
      const fetchProduct = async () => {
        setLoading(true);
        setLoadError(null);
        try {
          const data = await getProductById(Number(id));
          setProductData(data);
        } catch (err: any) {
          console.error("Failed to load product data:", err);
          setLoadError(err?.message || "Failed to load product data. Please try again.");
        } finally {
          setLoading(false);
        }
      };

      void fetchProduct();
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

  if (loadError) {
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
        <Typography color="error" variant="body1" sx={{ fontWeight: 600 }}>
          {loadError}
        </Typography>
        <Typography variant="body2" sx={{ color: "#71717a" }}>
          Please make sure the Backend API is running and product ID {id} exists.
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
