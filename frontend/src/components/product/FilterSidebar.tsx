import {
  Box,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  Slider,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import FlashOnIcon from "@mui/icons-material/FlashOn";

const BRANDS = [
  "Honda",
  "Yamaha",
  "Kawasaki",
  "Ducati",
  "BMW",
  "KTM",
  "Triumph",
  "Harley-Davidson",
];

const CATEGORIES = [
  "Naked",
  "Sport",
  "Adventure",
  "Touring",
  "Cruiser",
  "Scooter",
  "Electric",
];

const ENGINES = ["125cc", "300cc", "500cc", "650cc", "900cc+"];
const TRANSMISSIONS = ["Manual", "Automatic", "DCT"];
const CONDITIONS = ["New", "Used"];
const FEATURES = ["ABS", "Quick Shifter", "Traction Control"];

const FilterSidebar = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#121214",
        border: "1px solid rgba(255, 255, 255, 0.05)",
        borderRadius: "16px",
        p: 3,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      {/* Header Reset Row */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
          pb: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <FilterListIcon sx={{ color: "#e28a3a" }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "white" }}>
            Filters
          </Typography>
        </Box>
        <Button
          variant="text"
          sx={{
            color: "#e28a3a",
            p: 0,
            minWidth: 0,
            fontSize: "0.85rem",
            fontWeight: 600,
            textTransform: "none",
            "&:hover": { backgroundColor: "transparent", color: "#f0a256" },
          }}
        >
          Reset All
        </Button>
      </Box>

      {/* Brand Checkboxes */}
      <Box>
        <Typography
          variant="caption"
          sx={{
            fontWeight: 800,
            color: "rgba(255,255,255,0.4)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            display: "block",
            mb: 1.5,
          }}
        >
          Brand
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          {BRANDS.map((brand) => (
            <FormControlLabel
              key={brand}
              control={
                <Checkbox
                  size="small"
                  sx={{
                    color: "rgba(255,255,255,0.2)",
                    "&.Mui-checked": { color: "#e28a3a" },
                  }}
                />
              }
              label={brand}
              sx={{
                "& .MuiFormControlLabel-label": {
                  fontSize: "0.9rem",
                  color: "rgba(255,255,255,0.7)",
                },
                ml: -0.5,
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Category Grid */}
      <Box>
        <Typography
          variant="caption"
          sx={{
            fontWeight: 800,
            color: "rgba(255,255,255,0.4)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            display: "block",
            mb: 1.5,
          }}
        >
          Category
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {CATEGORIES.map((category) => (
            <Box
              key={category}
              sx={{
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "20px",
                px: 2,
                py: 0.6,
                backgroundColor: "transparent",
                color: "rgba(255,255,255,0.6)",
                fontSize: "0.8rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.15s",
                "&:hover": {
                  borderColor: "#e28a3a",
                  color: "#e28a3a",
                  backgroundColor: "rgba(226, 138, 58, 0.05)",
                },
              }}
            >
              {category}
            </Box>
          ))}
        </Box>
      </Box>

      {/* Max Price Slider */}
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            mb: 1,
          }}
        >
          <Typography
            variant="caption"
            sx={{
              fontWeight: 800,
              color: "rgba(255,255,255,0.4)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Max Price
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 700, color: "#e28a3a" }}>
            $40,000
          </Typography>
        </Box>
        <Slider
          defaultValue={40000}
          min={1000}
          max={50000}
          step={1000}
          sx={{
            color: "#e28a3a",
            height: 4,
            "& .MuiSlider-thumb": {
              width: 14,
              height: 14,
              backgroundColor: "#e28a3a",
              "&:before": { boxShadow: "none" },
              "&:hover, &.Mui-focusVisible": {
                boxShadow: "0px 0px 0px 8px rgba(226, 138, 58, 0.16)",
              },
            },
            "& .MuiSlider-rail": {
              backgroundColor: "rgba(255,255,255,0.1)",
              opacity: 1,
            },
          }}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 0.5 }}>
          <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.3)" }}>
            $1,000
          </Typography>
          <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.3)" }}>
            $50,000
          </Typography>
        </Box>
      </Box>

      {/* Engine size List */}
      <Box>
        <Typography
          variant="caption"
          sx={{
            fontWeight: 800,
            color: "rgba(255,255,255,0.4)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            display: "block",
            mb: 1.5,
          }}
        >
          Engine
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {ENGINES.map((eng) => (
            <Box
              key={eng}
              sx={{
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "20px",
                px: 2,
                py: 0.6,
                color: "rgba(255,255,255,0.6)",
                fontSize: "0.8rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.15s",
                "&:hover": {
                  borderColor: "#e28a3a",
                  color: "#e28a3a",
                },
              }}
            >
              {eng}
            </Box>
          ))}
        </Box>
      </Box>

      {/* Transmission tags */}
      <Box>
        <Typography
          variant="caption"
          sx={{
            fontWeight: 800,
            color: "rgba(255,255,255,0.4)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            display: "block",
            mb: 1.5,
          }}
        >
          Transmission
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {TRANSMISSIONS.map((tx) => (
            <Box
              key={tx}
              sx={{
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "20px",
                px: 2.5,
                py: 0.6,
                color: "rgba(255,255,255,0.6)",
                fontSize: "0.8rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.15s",
                "&:hover": {
                  borderColor: "#e28a3a",
                  color: "#e28a3a",
                },
              }}
            >
              {tx}
            </Box>
          ))}
        </Box>
      </Box>

      {/* Fuel Type */}
      <Box>
        <Typography
          variant="caption"
          sx={{
            fontWeight: 800,
            color: "rgba(255,255,255,0.4)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            display: "block",
            mb: 1.5,
          }}
        >
          Fuel Type
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          <Box
            sx={{
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "20px",
              px: 2.5,
              py: 0.6,
              color: "rgba(255,255,255,0.6)",
              fontSize: "0.8rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.15s",
              "&:hover": { borderColor: "#e28a3a", color: "#e28a3a" },
            }}
          >
            Gasoline
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "20px",
              px: 2.5,
              py: 0.6,
              color: "rgba(255,255,255,0.6)",
              fontSize: "0.8rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.15s",
              "&:hover": { borderColor: "#e28a3a", color: "#e28a3a5" },
            }}
          >
            <FlashOnIcon sx={{ fontSize: "0.95rem", color: "#e28a3a" }} />
            Electric
          </Box>
        </Box>
      </Box>

      {/* Condition tags */}
      <Box>
        <Typography
          variant="caption"
          sx={{
            fontWeight: 800,
            color: "rgba(255,255,255,0.4)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            display: "block",
            mb: 1.5,
          }}
        >
          Condition
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {CONDITIONS.map((cond) => (
            <Box
              key={cond}
              sx={{
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "20px",
                px: 3,
                py: 0.6,
                color: "rgba(255,255,255,0.6)",
                fontSize: "0.8rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.15s",
                "&:hover": {
                  borderColor: "#e28a3a",
                  color: "#e28a3a",
                },
              }}
            >
              {cond}
            </Box>
          ))}
        </Box>
      </Box>

      {/* Features checkboxes */}
      <Box>
        <Typography
          variant="caption"
          sx={{
            fontWeight: 800,
            color: "rgba(255,255,255,0.4)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            display: "block",
            mb: 1.5,
          }}
        >
          Features
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          {FEATURES.map((feat) => (
            <FormControlLabel
              key={feat}
              control={
                <Checkbox
                  size="small"
                  sx={{
                    color: "rgba(255,255,255,0.2)",
                    "&.Mui-checked": { color: "#e28a3a" },
                  }}
                />
              }
              label={feat}
              sx={{
                "& .MuiFormControlLabel-label": {
                  fontSize: "0.9rem",
                  color: "rgba(255,255,255,0.7)",
                },
                ml: -0.5,
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Apply button */}
      <Button
        variant="contained"
        fullWidth
        sx={{
          backgroundColor: "#e28a3a",
          color: "#000000",
          py: 1.8,
          borderRadius: "8px",
          fontWeight: 700,
          fontSize: "0.9rem",
          "&:hover": { backgroundColor: "#f0a256" },
        }}
      >
        Apply Filters
      </Button>
    </Box>
  );
};

export default FilterSidebar;
