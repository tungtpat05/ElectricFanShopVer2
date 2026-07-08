import { Box, Typography, Button, Grid, Container } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";

const HomeCommunity = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ py: { xs: 8, md: 10 }, backgroundColor: "#09090b" }}>
      <Container maxWidth={false} sx={{ px: { xs: 2, md: 6 } }}>
        <Box
          sx={{
            position: "relative",
            borderRadius: "28px",
            overflow: "hidden",
            backgroundImage: `linear-gradient(to right, rgba(9, 9, 11, 0.95) 0%, rgba(9, 9, 11, 0.75) 50%, rgba(9, 9, 11, 0.25) 100%), url("https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=1200&auto=format&fit=crop&q=80")`,
            backgroundSize: "cover",
            backgroundPosition: "center 40%",
            py: { xs: 8, md: 10 },
            px: { xs: 4, md: 8 },
            border: "1px solid rgba(255, 255, 255, 0.05)",
          }}
        >
          <Box sx={{ maxWidth: { xs: "100%", md: "600px" }, relative: "zIndex: 2" }}>
            {/* Small Tag */}
            <Typography
              variant="caption"
              sx={{
                color: "#e28a3a",
                fontWeight: 800,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                display: "block",
                mb: 2,
              }}
            >
              THE MOTOVAULT EXPERIENCE
            </Typography>

            {/* Title */}
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                color: "#fff",
                fontSize: { xs: "2.2rem", md: "3.2rem" },
                lineHeight: 1.15,
                mb: 3,
                fontFamily: "'Outfit', sans-serif",
              }}
            >
              More Than a Marketplace.{" "}
              <Box component="span" sx={{ color: "#e28a3a" }}>
                A Community.
              </Box>
            </Typography>

            {/* Paragraph */}
            <Typography
              variant="body1"
              sx={{
                color: "rgba(255, 255, 255, 0.7)",
                mb: 5,
                fontSize: { xs: "0.95rem", md: "1.05rem" },
                lineHeight: 1.65,
              }}
            >
              Join 50,000+ riders who found their machine through MotoVault. From
              first-time buyers to seasoned collectors — we're here for every chapter
              of your riding life.
            </Typography>

            {/* Stats row */}
            <Grid container spacing={2} sx={{ mb: 6, maxWidth: "520px" }}>
              {[
                { val: "50K+", label: "Active Riders" },
                { val: "4.9★", label: "Avg. Rating" },
                { val: "15+", label: "Years Trusted" },
              ].map((stat) => (
                <Grid key={stat.label} size={{ xs: 4 }}>
                  <Box
                    sx={{
                      backgroundColor: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      borderRadius: "14px",
                      p: 1.5,
                      textAlign: "center",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        color: "#ffffff",
                        fontWeight: 800,
                        fontSize: { xs: "1.1rem", md: "1.3rem" },
                        mb: 0.5,
                        fontFamily: "'Outfit', sans-serif",
                      }}
                    >
                      {stat.val}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: "rgba(255, 255, 255, 0.4)",
                        fontSize: "0.65rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {stat.label}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>

            {/* Buttons */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 3, flexWrap: "wrap" }}>
              <Button
                variant="contained"
                onClick={() => navigate("/products")}
                endIcon={<ArrowForwardIcon />}
                sx={{
                  backgroundColor: "#e28a3a",
                  color: "#000000",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  borderRadius: "100px",
                  px: 4,
                  py: 1.5,
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#f0a256",
                  },
                }}
              >
                Start Exploring
              </Button>

              <Button
                variant="text"
                sx={{
                  color: "#ffffff",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  textTransform: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  p: 0,
                  "&:hover": {
                    backgroundColor: "transparent",
                    color: "#e28a3a",
                  },
                }}
              >
                Read stories <ArrowForwardIcon sx={{ fontSize: "1.1rem" }} />
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HomeCommunity;
