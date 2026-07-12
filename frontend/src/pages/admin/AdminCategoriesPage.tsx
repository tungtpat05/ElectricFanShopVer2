import { useState, useMemo } from "react";
import { Box } from "@mui/material";
import SectionCard from "../../components/admin/common/SectionCard";
import CategoryFilterBar from "../../components/admin/category/CategoryFilterBar";
import CategoriesTable, { CategoryItemType } from "../../components/admin/category/CategoriesTable";

const initialCategories: CategoryItemType[] = [
  {
    id: 1,
    name: "Sport",
    code: "sport",
    count: 4,
    description: "High-performance motorcycles engineered for speed, acceleration, braking, and cornering.",
    status: "published",
    image: "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=100&auto=format&fit=crop&q=60",
  },
  {
    id: 2,
    name: "Naked / Streetfighter",
    code: "naked",
    count: 2,
    description: "Versatile, versatile bikes featuring upright riding positions and minimal body panels.",
    status: "published",
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=100&auto=format&fit=crop&q=60",
  },
  {
    id: 3,
    name: "Adventure",
    code: "adventure",
    count: 2,
    description: "Dual-sport motorcycles optimized for long-distance touring on and off paved surfaces.",
    status: "published",
    image: "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?w=100&auto=format&fit=crop&q=60",
  },
  {
    id: 4,
    name: "Cruiser",
    code: "cruiser",
    count: 1,
    description: "Styled after classic American machines with relaxed riding postures.",
    status: "published",
    image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=100&auto=format&fit=crop&q=60",
  },
  {
    id: 5,
    name: "Touring",
    code: "touring",
    count: 1,
    description: "Heavy bikes equipped for comfortable cross-country journeys with luggage capacity.",
    status: "draft",
    image: "https://images.unsplash.com/photo-1558981033-0f0309284409?w=100&auto=format&fit=crop&q=60",
  },
];

const AdminCategoriesPage = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const filteredCategories = useMemo(() => {
    return initialCategories.filter((cat) => {
      const matchSearch =
        cat.name.toLowerCase().includes(search.toLowerCase()) ||
        cat.code.toLowerCase().includes(search.toLowerCase()) ||
        cat.description.toLowerCase().includes(search.toLowerCase());

      const matchStatus = status === "" || cat.status === status;

      return matchSearch && matchStatus;
    });
  }, [search, status]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <CategoryFilterBar
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
      />
      <SectionCard>
        <CategoriesTable categories={filteredCategories} />
      </SectionCard>
    </Box>
  );
};

export default AdminCategoriesPage;
