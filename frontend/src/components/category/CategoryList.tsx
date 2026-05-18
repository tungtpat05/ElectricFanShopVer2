import Grid from "@mui/material/Grid";
import CategoryItem from "./CategoryItem";
import {Category} from "@/types/category";

interface CategoryListProps {
    categories: Category[];
}

const CategoryList = ({categories}: CategoryListProps) => {
    return (
        <Grid container spacing={{xs: 3, md: 4}} sx={{justifyContent: "center"}}>
            {categories.map((category) => (
                <Grid key={category.id} size={{xs: 6, sm: 4, md: 3, lg: 2}}>
                    <CategoryItem category={category}/>
                </Grid>
            ))}
        </Grid>
    );
};

export default CategoryList;
