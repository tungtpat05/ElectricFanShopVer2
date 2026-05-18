import {
    Box,
    Button,
    Container,
    Typography,
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import BrandSection from "@/components/brand/BrandSection.tsx";
import CategorySection from "@/components/category/CategorySection";

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{width: "100%"}}>
            {/* Hero Section */}
            <Container maxWidth={false} sx={{width: "80%"}}>
                <Box
                    sx={{
                        minHeight: "60vh",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        py: 2,
                    }}
                >
                    <Typography
                        variant="h2"
                        sx={{
                            fontWeight: 700,
                            mb: 3,
                            fontSize: {xs: "3.5rem", md: "5rem"},
                            color: "#fff",
                        }}
                    >
                        Experience the Art of Speed and Freedom
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            mb: 10,
                            maxWidth: "40vw",
                            color: "#b0b0b0",
                            fontSize: {xs: "1rem", md: "1.2rem"},
                            lineHeight: 1.6,
                        }}
                    >
                        Explore a curated world of premium motorcycles from the most iconic brands. Unmatched
                        performance, cutting-edge technology, and bold design—crafted for the next generation of riders.
                    </Typography>
                    <Button
                        variant="contained"
                        endIcon={<ArrowForwardIcon/>}
                        onClick={() => navigate("/products")}
                        sx={{
                            backgroundColor: "#DF7036",
                            color: "#000",
                            fontWeight: 600,
                            fontSize: "1.3rem",
                            px: 4,
                            py: 1.5,
                            borderRadius: "50px",
                            textTransform: "none",
                            "&:hover": {
                                backgroundColor: "#E9A222",
                            },
                        }}
                    >
                        Explore Now
                    </Button>
                </Box>
            </Container>

            {/* Brand Showcase Section */}
            <Container maxWidth={false} sx={{width: "80%"}}>
                <CategorySection />
                <BrandSection />
            </Container>
        </Box>
    );
};

export default HomePage;