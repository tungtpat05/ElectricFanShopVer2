import { useState, useMemo } from "react";
import { Box } from "@mui/material";
import SectionCard from "../../components/admin/common/SectionCard";
import BrandFilterBar from "../../components/admin/brand/BrandFilterBar";
import BrandsTable, { BrandItemType } from "../../components/admin/brand/BrandsTable";

const initialBrands: BrandItemType[] = [
  {
    id: 1,
    name: "Honda",
    country: "Japan",
    count: 6,
    status: "published",
    image: "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?w=100&auto=format&fit=crop&q=60",
  },
  {
    id: 2,
    name: "Yamaha",
    country: "Japan",
    count: 4,
    status: "published",
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=100&auto=format&fit=crop&q=60",
  },
  {
    id: 3,
    name: "Kawasaki",
    country: "Japan",
    count: 3,
    status: "published",
    image: "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=100&auto=format&fit=crop&q=60",
  },
  {
    id: 4,
    name: "Ducati",
    country: "Italy",
    count: 2,
    status: "published",
    image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=100&auto=format&fit=crop&q=60",
  },
  {
    id: 5,
    name: "BMW Motorrad",
    country: "Germany",
    count: 2,
    status: "published",
    image: "https://images.unsplash.com/photo-1558981033-0f0309284409?w=100&auto=format&fit=crop&q=60",
  },
  {
    id: 6,
    name: "Suzuki",
    country: "Japan",
    count: 1,
    status: "draft",
    image: "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=100&auto=format&fit=crop&q=60",
  },
];

const AdminBrandsPage = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const filteredBrands = useMemo(() => {
    return initialBrands.filter((brand) => {
      const matchSearch =
        brand.name.toLowerCase().includes(search.toLowerCase()) ||
        brand.country.toLowerCase().includes(search.toLowerCase());

      const matchStatus = status === "" || brand.status === status;

      return matchSearch && matchStatus;
    });
  }, [search, status]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <BrandFilterBar
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
      />
      <SectionCard>
        <BrandsTable brands={filteredBrands} />
      </SectionCard>
    </Box>
  );
};

export default AdminBrandsPage;
