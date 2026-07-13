import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material";
import BrandForm from "../../components/admin/brand/BrandForm";
import { getBrandById } from "../../services/brandService";
import { Brand } from "../../types/brand";

interface AdminBrandFormPageProps {
  mode?: "add" | "edit";
}

const AdminBrandFormPage = ({ mode: propMode }: AdminBrandFormPageProps) => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();

  // Resolve mode from path if not provided as prop
  const isEditPath = location.pathname.includes("/edit") || id !== undefined;
  const mode = propMode || (isEditPath ? "edit" : "add");

  const [loading, setLoading] = useState(false);
  const [brandData, setBrandData] = useState<Brand | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    if (mode === "edit" && id) {
      const fetchBrand = async () => {
        setLoading(true);
        setLoadError(null);
        try {
          const data = await getBrandById(Number(id));
          setBrandData(data);
        } catch (err: any) {
          console.error("Failed to load brand data:", err);
          setLoadError(err?.message || "Failed to load brand data. Please try again.");
        } finally {
          setLoading(false);
        }
      };

      void fetchBrand();
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
          Loading brand specifications...
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
          Please make sure the Backend API is running and brand ID {id} exists.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 1 }}>
      <BrandForm mode={mode} brandId={id} initialData={brandData} />
    </Box>
  );
};

export default AdminBrandFormPage;
