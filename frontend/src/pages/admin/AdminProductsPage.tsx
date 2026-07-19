import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material";
import SectionCard from "../../components/admin/common/SectionCard";
import ProductFilterBar from "../../components/admin/product/ProductFilterBar";
import ProductsTable from "../../components/admin/product/ProductsTable";
import { useProducts } from "../../hooks/useProducts";
import { useBrands } from "../../hooks/useBrands";
import { useCategories } from "../../hooks/useCategories";

const AdminProductsPage = () => {
  const navigate = useNavigate();
  const { products, loading: productsLoading, error: productsError } = useProducts();
  const { brands, loading: brandsLoading, error: brandsError } = useBrands();
  const { categories, loading: categoriesLoading, error: categoriesError } = useCategories();

  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const productName = product.productName || "";
      const brandName = product.brand?.brandName || "";
      const categoryName = product.category?.categoryName || "";

      const matchSearch =
        productName.toLowerCase().includes(search.toLowerCase()) ||
        brandName.toLowerCase().includes(search.toLowerCase());

      const matchBrand = brand === "" || brandName === brand;

      const matchCategory = category === "" || categoryName === category;

      const matchStatus =
        status === "" ||
        (status === "active" && product.isActive) ||
        (status === "inactive" && !product.isActive);

      return matchSearch && matchBrand && matchCategory && matchStatus;
    });
  }, [products, search, brand, category, status]);

  const loading = productsLoading || brandsLoading || categoriesLoading;
  const error = productsError || brandsError || categoriesError;

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
      {/* Search and Filters Layout */}
      <ProductFilterBar
        search={search}
        onSearchChange={setSearch}
        brand={brand}
        onBrandChange={setBrand}
        category={category}
        onCategoryChange={setCategory}
        status={status}
        onStatusChange={setStatus}
        brands={brands}
        categories={categories}
        onAddClick={() => navigate("/admin/products/add")}
      />

      {/* Main Table card list */}
      <SectionCard>
        <ProductsTable products={filteredProducts} />
      </SectionCard>
    </Box>
  );
};

export default AdminProductsPage;
