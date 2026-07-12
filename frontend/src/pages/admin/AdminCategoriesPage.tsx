import { useState, useMemo } from "react";
import { Box } from "@mui/material";
import SectionCard from "../../components/admin/common/SectionCard";
import CategoryFilterBar from "../../components/admin/category/CategoryFilterBar";
import CategoriesTable from "../../components/admin/category/CategoriesTable";
import { Category } from "../../types/category";

const initialCategories: Category[] = [
  {
    id: 1,
    categoryName: "Sport",
    slug: "sport",
    description: "High-performance motorcycles engineered for speed, acceleration, braking, and cornering.",
    isActive: true,
    categoryImage: "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=100&auto=format&fit=crop&q=60",
  },
  {
    id: 2,
    categoryName: "Naked / Streetfighter",
    slug: "naked",
    description: "Versatile, versatile bikes featuring upright riding positions and minimal body panels.",
    isActive: true,
    categoryImage: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=100&auto=format&fit=crop&q=60",
  },
  {
    id: 3,
    categoryName: "Adventure",
    slug: "adventure",
    description: "Dual-sport motorcycles optimized for long-distance touring on and off paved surfaces.",
    isActive: true,
    categoryImage: "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?w=100&auto=format&fit=crop&q=60",
  },
  {
    id: 4,
    categoryName: "Cruiser",
    slug: "cruiser",
    description: "Styled after classic American machines with relaxed riding postures.",
    isActive: true,
    categoryImage: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=100&auto=format&fit=crop&q=60",
  },
  {
    id: 5,
    categoryName: "Touring",
    slug: "touring",
    description: "Heavy bikes equipped for comfortable cross-country journeys with luggage capacity.",
    isActive: false,
    categoryImage: "https://images.unsplash.com/photo-1558981033-0f0309284409?w=100&auto=format&fit=crop&q=60",
  },
];

const AdminCategoriesPage = () => {
  const [search, setSearch] = useState("");

  const filteredCategories = useMemo(() => {
    return initialCategories.filter((cat) => {
      const matchSearch =
        cat.categoryName.toLowerCase().includes(search.toLowerCase()) ||
        cat.description.toLowerCase().includes(search.toLowerCase());

      return matchSearch;
    });
  }, [search]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <CategoryFilterBar
        search={search}
        onSearchChange={setSearch}
        onAddClick={() => console.log("Add Category clicked")}
      />
      <SectionCard>
        <CategoriesTable categories={filteredCategories} />
      </SectionCard>
    </Box>
  );
};

export default AdminCategoriesPage;
