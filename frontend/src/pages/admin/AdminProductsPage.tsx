import { useState, useMemo } from "react";
import { Box } from "@mui/material";
import SectionCard from "../../components/admin/common/SectionCard";
import ProductFilterBar from "../../components/admin/product/ProductFilterBar";
import ProductsTable, { ProductItemType } from "../../components/admin/product/ProductsTable";

const initialProducts: ProductItemType[] = [
  {
    id: 1,
    name: "Africa Twin Adventure Sports",
    brand: "Honda",
    sku: "HON-AFTS-2024",
    price: "$16,499",
    stock: 9,
    sales: 28,
    status: "published",
    image: "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?w=100&auto=format&fit=crop&q=60",
  },
  {
    id: 2,
    name: "CB650R Neo Sports Café",
    brand: "Honda",
    sku: "HON-CB650R-2024",
    price: "$9,499",
    originalPrice: "$10,299",
    stock: 12,
    sales: 47,
    status: "published",
    image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=100&auto=format&fit=crop&q=60",
  },
  {
    id: 3,
    name: "GSX-R1000R",
    brand: "Suzuki",
    sku: "SUZ-GSXR1000R-2024",
    price: "$18,999",
    stock: 0,
    sales: 0,
    status: "draft",
    image: "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=100&auto=format&fit=crop&q=60",
  },
  {
    id: 4,
    name: "MT-09 SP",
    brand: "Yamaha",
    sku: "YAM-MT09SP-2024",
    price: "$10,299",
    stock: 8,
    sales: 38,
    status: "published",
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=100&auto=format&fit=crop&q=60",
  },
  {
    id: 5,
    name: "Ninja ZX-10R",
    brand: "Kawasaki",
    sku: "KAW-ZX10R-2024",
    price: "$17,499",
    originalPrice: "$18,500",
    stock: 5,
    sales: 22,
    status: "published",
    image: "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=100&auto=format&fit=crop&q=60",
  },
  {
    id: 6,
    name: "Panigale V4 S",
    brand: "Ducati",
    sku: "DUC-V4S-2024",
    price: "$32,995",
    stock: 3,
    sales: 11,
    status: "published",
    image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=100&auto=format&fit=crop&q=60",
  },
  {
    id: 7,
    name: "R1250 GS Adventure",
    brand: "BMW Motorrad",
    sku: "BMW-R1250GSA-2024",
    price: "$23,495",
    stock: 7,
    sales: 19,
    status: "published",
    image: "https://images.unsplash.com/photo-1558981033-0f0309284409?w=100&auto=format&fit=crop&q=60",
  },
  {
    id: 8,
    name: "S 1000 RR",
    brand: "BMW Motorrad",
    sku: "BMW-S1000RR-2024",
    price: "$28,995",
    stock: 4,
    sales: 9,
    status: "published",
    image: "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=100&auto=format&fit=crop&q=60",
  },
];

const AdminProductsPage = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");

  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      const matchSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.sku.toLowerCase().includes(search.toLowerCase()) ||
        product.brand.toLowerCase().includes(search.toLowerCase());

      const matchStatus = status === "" || product.status === status;
      const matchBrand = brand === "" || product.brand === brand;
      
      // Category matches are mocked based on model names since we have UI only
      let matchCategory = true;
      if (category !== "") {
        if (category === "Sport") {
          matchCategory = ["Panigale V4 S", "Ninja ZX-10R", "S 1000 RR", "GSX-R1000R"].includes(product.name);
        } else if (category === "Naked / Streetfighter") {
          matchCategory = ["MT-09 SP", "CB650R Neo Sports Café"].includes(product.name);
        } else if (category === "Adventure") {
          matchCategory = ["Africa Twin Adventure Sports", "R1250 GS Adventure"].includes(product.name);
        } else {
          matchCategory = false; // Mock other categories empty
        }
      }

      return matchSearch && matchStatus && matchBrand && matchCategory;
    });
  }, [search, status, brand, category]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {/* Search and Filters Layout */}
      <ProductFilterBar
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
        brand={brand}
        onBrandChange={setBrand}
        category={category}
        onCategoryChange={setCategory}
      />

      {/* Main Table card list */}
      <SectionCard>
        <ProductsTable products={filteredProducts} />
      </SectionCard>
    </Box>
  );
};

export default AdminProductsPage;
