import {Card, CardMedia, Typography, Box} from "@mui/material";
import {Category} from "@/types/category";

interface CategoryItemProps {
    category: Category;
}

const CategoryItem = ({category}: CategoryItemProps) => {
    return (
        <Box
            sx={{
                position: "relative",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                pt: 10,
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 140,
                    height: 140,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 1,
                }}
            >
                <CardMedia
                    component="img"
                    image={category.categoryImage}
                    alt={category.categoryName}
                    sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                    }}
                />
            </Box>

            <Card
                sx={{
                    backgroundColor: "#DE6B30",
                    borderRadius: "28px",
                    overflow: "hidden",
                    width: 200,
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "center",
                    pb: 2,
                    pt: 5,
                    boxShadow: "none",
                    border: "1px solid rgba(255, 255, 255, 0.06)",
                    textAlign: "center",
                }}
            >
                <Typography
                    sx={{
                        color: "#fff",
                        fontWeight: 600,
                        fontSize: "1.1rem",
                    }}
                >
                    {category.categoryName}
                </Typography>
            </Card>
        </Box>
    );
};

export default CategoryItem;