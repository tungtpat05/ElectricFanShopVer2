import { Box, Typography, Button, InputBase, Container } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import CheckIcon from "@mui/icons-material/Check";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import BoltIcon from "@mui/icons-material/Bolt";
import { useNavigate } from "react-router-dom";

const HomeNewsletter = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        py: { xs: 8, md: 10 },
        backgroundColor: "#09090b",
      }}
    >
      <Container maxWidth={false} sx={{ px: { xs: 2, md: 6 } }}>
        {/* Main Box Container */}
        <Box
          sx={{
            position: "relative",
            backgroundColor: "#121214",
            border: "1px solid rgba(255, 255, 255, 0.05)",
            borderRadius: "28px",
            p: { xs: 4, md: 8 },
            overflow: "hidden",
          }}
        >
          {/* Faint background bolt emblem on the right */}
          <BoltIcon
            sx={{
              position: "absolute",
              right: { xs: "-40px", md: "40px" },
              top: "35%",
              transform: "translateY(-50%)",
              fontSize: { xs: "200px", md: "320px" },
              color: "rgba(226, 138, 58, 0.02)",
              pointerEvents: "none",
              zIndex: 1,
            }}
          />

          <Box sx={{ maxWidth: "600px", position: "relative", zIndex: 2, mb: 6 }}>
            {/* Small subtitle */}
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
              STAY CONNECTED
            </Typography>

            {/* Title */}
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                color: "#fff",
                fontSize: { xs: "2rem", md: "2.8rem" },
                lineHeight: 1.2,
                mb: 2.5,
                fontFamily: "'Outfit', sans-serif",
              }}
            >
              Get the Latest Bikes Straight to Your Inbox
            </Typography>

            {/* Subtext */}
            <Typography
              variant="body1"
              sx={{
                color: "rgba(255, 255, 255, 0.6)",
                mb: 5,
                fontSize: { xs: "0.95rem", md: "1.05rem" },
                lineHeight: 1.6,
              }}
            >
              New arrivals, exclusive deals, and riding inspiration — delivered weekly. No spam, unsubscribe anytime.
            </Typography>

            {/* Form */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
                backgroundColor: { xs: "transparent", sm: "rgba(255, 255, 255, 0.02)" },
                border: { xs: "none", sm: "1px solid rgba(255, 255, 255, 0.08)" },
                borderRadius: "100px",
                p: { xs: 0, sm: 0.8 },
                mb: 4.5,
                alignItems: "stretch",
                width: "100%",
                maxWidth: "520px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  px: 3,
                  py: { xs: 1.5, sm: 0 },
                  flex: 1,
                  backgroundColor: { xs: "rgba(255, 255, 255, 0.02)", sm: "transparent" },
                  border: { xs: "1px solid rgba(255, 255, 255, 0.08)", sm: "none" },
                  borderRadius: { xs: "100px", sm: 0 },
                }}
              >
                <MailOutlineIcon sx={{ color: "rgba(255, 255, 255, 0.3)" }} />
                <InputBase
                  placeholder="Enter your email address"
                  sx={{
                    color: "#ffffff",
                    fontSize: "0.95rem",
                    width: "100%",
                    "& input::placeholder": {
                      color: "rgba(255, 255, 255, 0.3)",
                      opacity: 1,
                    },
                  }}
                />
              </Box>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#e28a3a",
                  color: "#000000",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  borderRadius: "100px",
                  px: 4.5,
                  py: { xs: 1.8, sm: 1.4 },
                  textTransform: "none",
                  boxShadow: "0 10px 20px rgba(226, 138, 58, 0.2)",
                  "&:hover": {
                    backgroundColor: "#f0a256",
                  },
                }}
              >
                Subscribe Free
              </Button>
            </Box>

            {/* Checkmark sub-labels */}
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: { xs: 2, sm: 4 },
                alignItems: "center",
              }}
            >
              {[
                "Weekly new arrivals",
                "Exclusive member pricing",
                "Zero spam guarantee",
              ].map((text) => (
                <Box key={text} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <CheckIcon sx={{ color: "#22c55e", fontSize: "1rem" }} />
                  <Typography variant="caption" sx={{ color: "rgba(255, 255, 255, 0.5)", fontSize: "0.8rem", fontWeight: 600 }}>
                    {text}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Separation Divider Line inside the card */}
          <Box
            sx={{
              height: "1px",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              mx: { xs: -4, md: -8 },
              mb: 5,
            }}
          />

          {/* Bottom CTA panel inside the card */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: { xs: "column", sm: "row" },
              gap: 3,
              textAlign: { xs: "center", sm: "left" },
              position: "relative",
              zIndex: 2,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: "#ffffff",
                fontWeight: 700,
                fontSize: { xs: "1.1rem", md: "1.25rem" },
                fontFamily: "'Outfit', sans-serif",
              }}
            >
              Ready to find your motorcycle now?
            </Typography>

            <Button
              variant="contained"
              onClick={() => navigate("/products")}
              endIcon={<ArrowForwardIcon />}
              sx={{
                backgroundColor: "#ffffff",
                color: "#000000",
                fontWeight: 800,
                fontSize: "0.95rem",
                borderRadius: "100px",
                px: 4.5,
                py: 1.8,
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#e4e4e7",
                },
              }}
            >
              Browse 10,000+ Motorcycles
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HomeNewsletter;
