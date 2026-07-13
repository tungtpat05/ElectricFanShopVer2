import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material";
import CategoryForm from "../../components/admin/category/CategoryForm";
import { getCategoryById } from "../../services/categoryService";
import { Category } from "../../types/category";

interface AdminCategoryFormPageProps {
  mode?: "add" | "edit";
}

const AdminCategoryFormPage = ({ mode: propMode }: AdminCategoryFormPageProps) => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();

  // Resolve mode from path if not provided as prop
  const isEditPath = location.pathname.includes("/edit") || id !== undefined;
  const mode = propMode || (isEditPath ? "edit" : "add");

  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState<Category | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    if (mode === "edit" && id) {
      const fetchCategory = async () => {
        setLoading(true);
        setLoadError(null);
        try {
          const data = await getCategoryById(Number(id));
          setCategoryData(data);
        } catch (err: any) {
          console.error("Failed to load category data:", err);
          setLoadError(err?.message || "Failed to load category data. Please try again.");
        } finally {
          setLoading(false);
        }
      };

      void fetchCategory();
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
          Loading category specifications...
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
          Please make sure the Backend API is running and category ID {id} exists.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 1 }}>
      <CategoryForm mode={mode} categoryId={id} initialData={categoryData} />
    </Box>
  );
};

export default AdminCategoryFormPage;
