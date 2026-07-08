import Grid from "@mui/material/Grid";
import CategoryItem from "./CategoryItem";
import { Category } from "@/types/category";

interface CategoryListProps {
  categories: Category[];
}

const CategoryList = ({ categories }: CategoryListProps) => {
  return (
    <Grid container spacing={4} sx={{ justifyContent: "center" }}>
      {categories.map((category) => (
        <Grid key={category.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <CategoryItem category={category} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CategoryList;
