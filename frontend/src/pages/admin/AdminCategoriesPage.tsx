import { useState, useMemo } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SectionCard from "../../components/admin/common/SectionCard";
import CategoryFilterBar from "../../components/admin/category/CategoryFilterBar";
import CategoriesTable from "../../components/admin/category/CategoriesTable";
import { useCategories } from "../../hooks/useCategories";

const AdminCategoriesPage = () => {
  const { categories, loading, error } = useCategories();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const filteredCategories = useMemo(() => {
    return categories.filter((cat) => {
      const matchSearch =
        (cat.categoryName || "").toLowerCase().includes(search.toLowerCase()) ||
        (cat.description || "").toLowerCase().includes(search.toLowerCase());
      const matchesStatus =
        status === "" ||
        (status === "active" && cat.isActive) ||
        (status === "inactive" && !cat.isActive);

      return matchSearch && matchesStatus;
    });
  }, [categories, search, status]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "400px" }}>
        <CircularProgress sx={{ color: "#ff6b35" }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: "flex", gap: 2, flexDirection: "column", justifyContent: "center", alignItems: "center", minHeight: "400px" }}>
        <Typography color="error" variant="h6">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <CategoryFilterBar
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
        onAddClick={() => navigate("/admin/categories/add")}
      />
      <SectionCard>
        <CategoriesTable categories={filteredCategories} />
      </SectionCard>
    </Box>
  );
};

export default AdminCategoriesPage;
