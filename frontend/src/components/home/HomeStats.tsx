import { Box, Grid, Typography, Container } from "@mui/material";

const STATS_DATA = [
  { value: "10,000+", label: "Motorcycles Listed" },
  { value: "50+", label: "Global Brands" },
  { value: "250+", label: "Verified Dealers" },
  { value: "98%", label: "Customer Satisfaction" },
];

const HomeStats = () => {
  return (
    <Box
      sx={{
        py: { xs: 4, md: 6 },
      }}
    >
      <Container maxWidth={false} sx={{ px: { xs: 2, md: 6 } }}>
        <Box
          sx={{
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "24px",
            py: { xs: 4, md: 5 },
            px: { xs: 2, md: 4 },
          }}
        >
          <Grid container spacing={0}>
            {STATS_DATA.map((stat, index) => (
              <Grid
                key={stat.label}
                size={{ xs: 12, sm: 6, md: 3 }}
                sx={{
                  textAlign: "center",
                  py: { xs: 3, md: 1 },
                  borderRight: {
                    xs: "none",
                    sm: index % 2 === 0 ? "1px solid rgba(255, 255, 255, 0.08)" : "none",
                    md: index < 3 ? "1px solid rgba(255, 255, 255, 0.08)" : "none",
                  },
                  borderBottom: {
                    xs: index < 3 ? "1px solid rgba(255, 255, 255, 0.08)" : "none",
                    sm: index < 2 ? "1px solid rgba(255, 255, 255, 0.08)" : "none",
                    md: "none",
                  },
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 800,
                    color: "#e28a3a",
                    fontSize: { xs: "2.2rem", md: "2.8rem" },
                    mb: 1,
                    fontFamily: "'Outfit', sans-serif",
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: "rgba(255, 255, 255, 0.5)",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    fontSize: "0.75rem",
                  }}
                >
                  {stat.label}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default HomeStats;
