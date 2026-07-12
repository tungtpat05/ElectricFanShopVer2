import { useState, useMemo } from "react";
import { Box } from "@mui/material";
import SectionCard from "../../components/admin/common/SectionCard";
import BrandFilterBar from "../../components/admin/brand/BrandFilterBar";
import BrandsTable from "../../components/admin/brand/BrandsTable";
import { Brand } from "../../types/brand";

const initialBrands: Brand[] = [
  {
    id: 1,
    brandName: "Honda",
    description: "Honda motorcycles brand",
    isActive: true,
    logoUrl: "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?w=100&auto=format&fit=crop&q=60",
  },
  {
    id: 2,
    brandName: "Yamaha",
    description: "Yamaha motor corp",
    isActive: true,
    logoUrl: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=100&auto=format&fit=crop&q=60",
  },
  {
    id: 3,
    brandName: "Kawasaki",
    description: "Kawasaki heavy industries",
    isActive: true,
    logoUrl: "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=100&auto=format&fit=crop&q=60",
  },
  {
    id: 4,
    brandName: "Ducati",
    description: "Ducati motor holding",
    isActive: true,
    logoUrl: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=100&auto=format&fit=crop&q=60",
  },
  {
    id: 5,
    brandName: "BMW Motorrad",
    description: "BMW motorcycles",
    isActive: true,
    logoUrl: "https://images.unsplash.com/photo-1558981033-0f0309284409?w=100&auto=format&fit=crop&q=60",
  },
  {
    id: 6,
    brandName: "Suzuki",
    description: "Suzuki motor corporation",
    isActive: false,
    logoUrl: "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=100&auto=format&fit=crop&q=60",
  },
];

const AdminBrandsPage = () => {
  const [search, setSearch] = useState("");

  const filteredBrands = useMemo(() => {
    return initialBrands.filter((brand) =>
      brand.brandName.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

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
