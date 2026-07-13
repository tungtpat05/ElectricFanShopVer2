import { useState, useMemo } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import SectionCard from "../../components/admin/common/SectionCard";
import BrandFilterBar from "../../components/admin/brand/BrandFilterBar";
import BrandsTable from "../../components/admin/brand/BrandsTable";
import { useBrands } from "../../hooks/useBrands";

const AdminBrandsPage = () => {
  const { brands, loading, error } = useBrands();
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
        onAddClick={() => console.log("Add Brand clicked")}
      />
      <SectionCard>
        <BrandsTable brands={filteredBrands} />
      </SectionCard>
    </Box>
  );
};

export default AdminBrandsPage;
