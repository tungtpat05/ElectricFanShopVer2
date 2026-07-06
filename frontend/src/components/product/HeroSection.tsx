import { Box, Typography, InputBase, Button, Chip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const QUICK_TAGS = [
  "Honda",
  "Yamaha",
  "Kawasaki",
  "BMW",
  "KTM",
  "Ducati",
  "Adventure",
  "Sport",
  "Electric",
];

const HeroSection = () => {
  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "500px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        px: 3,
        py: 8,
        backgroundImage: `linear-gradient(rgba(9, 9, 11, 0.75), rgba(9, 9, 11, 0.95)), url("https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1600&auto=format&fit=crop&q=80")`,
        backgroundSize: "cover",
        backgroundPosition: "center 30%",
        backgroundRepeat: "no-repeat",
        "&::before": {
          content: '""',
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "100px",
          background: "linear-gradient(transparent, #09090b)",
          pointerEvents: "none",
        },
      }}
    >
      {/* Count pill */}
      <Box
        sx={{
          border: "1px solid rgba(226, 138, 58, 0.3)",
          borderRadius: "50px",
          px: 2.5,
          py: 0.5,
          backgroundColor: "rgba(226, 138, 58, 0.1)",
          mb: 3,
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: "#e28a3a",
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          582 Motorcycles Available
        </Typography>
      </Box>

      {/* Main headings */}
      <Typography
        variant="h2"
        component="h1"
        sx={{
          color: "#ffffff",
          mb: 2.5,
          fontSize: { xs: "2.5rem", md: "4rem" },
          fontWeight: 900,
          lineHeight: 1.1,
        }}
      >
        Explore Our{" "}
        <Box component="span" sx={{ color: "#e28a3a" }}>
          Collection
        </Box>
      </Typography>

      <Typography
        variant="body1"
        sx={{
          color: "rgba(255, 255, 255, 0.7)",
          maxWidth: "680px",
          mb: 4.5,
          fontSize: { xs: "0.95rem", md: "1.1rem" },
          lineHeight: 1.6,
        }}
      >
        Discover motorcycles from the world's leading manufacturers. Superbikes,
        cruisers, adventure machines, and more.
      </Typography>

      {/* Search Input bar */}
      <Box
        sx={{
          width: "100%",
          maxWidth: "650px",
          backgroundColor: "#18181b",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "50px",
          pl: 3,
          pr: 1,
          py: 1,
          display: "flex",
          alignItems: "center",
          boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
          mb: 3,
          transition: "border-color 0.2s",
          "&:focus-within": {
            borderColor: "#e28a3a",
          },
        }}
      >
        <SearchIcon sx={{ color: "rgba(255,255,255,0.4)", mr: 1.5 }} />
        <InputBase
          placeholder="Search motorcycles, brands or categories..."
          sx={{
            flex: 1,
            color: "white",
            fontSize: "0.95rem",
            "& input::placeholder": {
              color: "rgba(255,255,255,0.4)",
              opacity: 1,
            },
          }}
        />
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#e28a3a",
            color: "#000000",
            fontWeight: 700,
            borderRadius: "40px",
            px: 4,
            py: 1,
            "&:hover": {
              backgroundColor: "#f0a256",
            },
          }}
        >
          Search
        </Button>
      </Box>

      {/* Quick brand tags */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 1.2,
          maxWidth: "800px",
        }}
      >
        {QUICK_TAGS.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            clickable
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              color: "rgba(255, 255, 255, 0.8)",
              fontWeight: 500,
              fontSize: "0.85rem",
              transition: "all 0.2s",
              "&:hover": {
                backgroundColor: "rgba(226, 138, 58, 0.15)",
                borderColor: "#e28a3a",
                color: "#e28a3a",
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default HeroSection;
