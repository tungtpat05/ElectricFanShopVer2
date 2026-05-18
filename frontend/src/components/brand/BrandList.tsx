import Grid from "@mui/material/Grid";
import BrandItem from "./BrandItem.tsx";
import {Brand} from "@/types/brand";

interface BrandListProps {
    brands: Brand[];
}

const BrandList = ({brands}: BrandListProps) => {
    return (
        <Grid container spacing={3}>
            {brands.map((brand) => (
                <Grid key={brand.id} size={{xs: 12, sm: 6, md: 4, lg: 3}}>
                    <BrandItem brand={brand}/>
                </Grid>
            ))}
        </Grid>
    );
};

export default BrandList;
