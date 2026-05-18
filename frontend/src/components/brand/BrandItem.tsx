import {Card, CardMedia} from "@mui/material";
import {Brand} from "@/types/brand.ts";

interface BrandItemProps {
    brand: Brand;
}

const BrandItem = ({brand}: BrandItemProps) => {

    return (
        <Card
            sx={{
                backgroundImage: 'black',
                borderRadius: "20px",
                overflow: "hidden",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                cursor: "pointer",
                "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 12px 24px rgba(0, 0, 0, 0.3)",
                },
                height: "100%",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <CardMedia
                component="img"
                image={brand.logoUrl}
                alt={brand.brandName}
                sx={{
                    height: 100,
                    objectFit: "contain",
                    backgroundColor: '#0E0E0E',
                    p: 2,
                }}
            />
        </Card>
    );
};

export default BrandItem;




