import { useState, useMemo } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SectionCard from "../../components/admin/common/SectionCard";
import BrandFilterBar from "../../components/admin/brand/BrandFilterBar";
import BrandsTable from "../../components/admin/brand/BrandsTable";
import { useBrands } from "../../hooks/useBrands";

const AdminBrandsPage = () => {
  const { brands, loading, error } = useBrands();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filteredBrands = useMemo(() => {
    return brands.filter((brand) =>
      (brand.brandName || "").toLowerCase().includes(search.toLowerCase())
    );
  }, [brands, search]);

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
      <BrandFilterBar
        search={search}
        onSearchChange={setSearch}
        onAddClick={() => navigate("/admin/brands/add")}
      />
      <SectionCard>
        <BrandsTable brands={filteredBrands} />
      </SectionCard>
    </Box>
  );
};

export default AdminBrandsPage;
