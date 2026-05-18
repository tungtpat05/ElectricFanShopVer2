import {CircularProgress, Typography, Box} from "@mui/material";
import {useCategories} from "@/hooks/useCategories";
import CategoryList from "./CategoryList";

const CategorySection = () => {
    const {categories, loading, error} = useCategories();

    if (loading) {
        return <CircularProgress/>;
    }

    if (error) {
        return <Typography>{error}</Typography>;
    }

    return (
        <Box
            sx={{
                py: {xs: 5, md: 8},
                px: {xs: 2, md: 4},
                overflow: "hidden",
            }}
        >
            <CategoryList categories={categories}/>
        </Box>
    );
};

export default CategorySection;
