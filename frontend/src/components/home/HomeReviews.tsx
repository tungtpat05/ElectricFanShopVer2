import { Box, Typography, Grid, Rating, Avatar, Container } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

const TESTIMONIALS = [
  {
    rating: 5,
    text: '"Found my dream Ducati Panigale here at the best price I could find anywhere. The verification process gave me real confidence and delivery was flawless."',
    name: "James R.",
    location: "Los Angeles, CA",
    initials: "JR",
  },
  {
    rating: 5,
    text: '"MotoVault made my first motorcycle purchase completely stress-free. The financing options were excellent and the dealer they connected me with was outstanding."',
    name: "Priya S.",
    location: "Austin, TX",
    initials: "PS",
  },
  {
    rating: 5,
    text: '"Upgraded from my old CB500 to the MT-09 using MotoVault. The trade-in value was fair and the whole process took less than a week. Highly recommended."',
    name: "Marcus L.",
    location: "Chicago, IL",
    initials: "ML",
  },
];

const HomeReviews = () => {
  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: "#09090b",
      }}
    >
      <Container maxWidth={false} sx={{ px: { xs: 2, md: 6 } }}>
        {/* Headings */}
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography
            variant="caption"
            sx={{
              color: "#e28a3a",
              fontWeight: 800,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              display: "block",
              mb: 1.5,
            }}
          >
            SOCIAL PROOF
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              color: "#fff",
              fontSize: { xs: "2rem", md: "2.8rem" },
              mb: 2,
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            Trusted by Riders
          </Typography>
        </Box>

        {/* Reviews Grid */}
        <Grid container spacing={4}>
          {TESTIMONIALS.map((item, idx) => (
            <Grid key={idx} size={{ xs: 12, md: 4 }}>
              <Box
                sx={{
                  backgroundColor: "#121214",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                  borderRadius: "24px",
                  p: { xs: 4, md: 5 },
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    borderColor: "rgba(226, 138, 58, 0.25)",
                    boxShadow: "0 15px 30px rgba(0, 0, 0, 0.4)",
                  },
                }}
              >
                <Box>
                  {/* Rating */}
                  <Rating
                    value={item.rating}
                    readOnly
                    size="small"
                    sx={{
                      color: "#e28a3a",
                      mb: 3,
                      "& .MuiRating-iconEmpty": { color: "rgba(255, 255, 255, 0.15)" },
                    }}
                  />

                  {/* Text */}
                  <Typography
                    variant="body1"
                    sx={{
                      color: "rgba(255, 255, 255, 0.85)",
                      fontSize: "1rem",
                      lineHeight: 1.65,
                      fontStyle: "italic",
                      mb: 4,
                    }}
                  >
                    {item.text}
                  </Typography>
                </Box>

                {/* Profile Footer */}
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar
                      sx={{
                        bgcolor: "rgba(226, 138, 58, 0.1)",
                        color: "#e28a3a",
                        fontWeight: 700,
                        fontSize: "0.9rem",
                        width: 44,
                        height: 44,
                        border: "1px solid rgba(226, 138, 58, 0.15)",
                      }}
                    >
                      {item.initials}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" sx={{ color: "#ffffff", fontWeight: 700, fontSize: "0.95rem" }}>
                        {item.name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "rgba(255, 255, 255, 0.4)" }}>
                        {item.location}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Verified Checkmark */}
                  <Box
                    sx={{
                      backgroundColor: "rgba(34, 197, 94, 0.1)",
                      color: "#22c55e",
                      borderRadius: "50%",
                      width: 24,
                      height: 24,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CheckIcon sx={{ fontSize: "0.95rem" }} />
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default HomeReviews;
