import {CircularProgress, Typography, Box, Grid} from "@mui/material";
import {useBrands} from "@/hooks/useBrands";
import BrandList from "./BrandList";

const BrandSection = () => {
    const {brands, loading, error} = useBrands();

    if (loading) {
        return <CircularProgress/>;
    }

    if (error) {
        return <Typography>{error}</Typography>;
    }

    return (
        <Box
            sx={{
                py: 8,
                my: 4,
                borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                overflow: "hidden",
            }}
        >
            <Grid container spacing={6} sx={{alignItems: "flex-start", px: {xs: 2, md: 4}}}>
                {/* Left Section - Text */}
                <Grid size={{xs: 12, md: 4}}>
                    <Box sx={{pr: {md: 4}}}>
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 700,
                                mb: 2,
                                color: "#fff",
                                fontSize: {xs: "1.8rem", md: "2.2rem"},
                            }}
                        >
                            Premium Brands
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: "#b0b0b0",
                                lineHeight: 1.8,
                                fontSize: "1.05rem",
                            }}
                        >
                            Explore premium motorcycles from the industry’s leading brands.
                            Trusted by customers worldwide to deliver superior performance,
                            innovation, and style.
                        </Typography>
                        <Box sx={{mt: 3, display: "flex", gap: 2}}>
                            <Box>
                                <Typography sx={{color: "#c3e04d", fontWeight: 700, fontSize: "1.2rem"}}>
                                    100+
                                </Typography>
                                <Typography sx={{color: "#b0b0b0", fontSize: "0.9rem"}}>
                                    Premium Brands
                                </Typography>
                            </Box>
                            <Box>
                                <Typography sx={{color: "#c3e04d", fontWeight: 700, fontSize: "1.2rem"}}>
                                    4.8★
                                </Typography>
                                <Typography sx={{color: "#b0b0b0", fontSize: "0.9rem"}}>
                                    Customer Rating
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Grid>

                {/* Right Section - Brand Grid */}
                <Grid size={{xs: 12, md: 8}}>
                    <BrandList brands={brands}/>
                </Grid>
            </Grid>
        </Box>
    );
};

export default BrandSection;


