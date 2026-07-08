import { Box, Typography, Grid, Container } from "@mui/material";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import StarsOutlinedIcon from "@mui/icons-material/StarsOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import HeadsetMicOutlinedIcon from "@mui/icons-material/HeadsetMicOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";

const PROMISES = [
  {
    icon: <ShieldOutlinedIcon sx={{ fontSize: "2rem", color: "#e28a3a" }} />,
    title: "3-Year Warranty",
    description: "Every motorcycle comes with comprehensive manufacturer-backed coverage, verified and guaranteed.",
  },
  {
    icon: <StarsOutlinedIcon sx={{ fontSize: "2rem", color: "#e28a3a" }} />,
    title: "Certified Dealers",
    description: "Over 250 authorised dealerships nationwide, vetted and rated by our community of riders.",
  },
  {
    icon: <LocalShippingOutlinedIcon sx={{ fontSize: "2rem", color: "#e28a3a" }} />,
    title: "Nationwide Delivery",
    description: "White-glove delivery to your door. Fully insured transit with real-time tracking.",
  },
  {
    icon: <CreditCardOutlinedIcon sx={{ fontSize: "2rem", color: "#e28a3a" }} />,
    title: "Flexible Financing",
    description: "Competitive rates from 0% APR. Instant approval, tailored to your budget and timeline.",
  },
  {
    icon: <HeadsetMicOutlinedIcon sx={{ fontSize: "2rem", color: "#e28a3a" }} />,
    title: "Expert Support",
    description: "Our team of experienced riders and technicians is available 7 days a week, ready to help.",
  },
  {
    icon: <GroupsOutlinedIcon sx={{ fontSize: "2rem", color: "#e28a3a" }} />,
    title: "Rider Community",
    description: "Join 50,000+ passionate riders. Events, group rides, and exclusive member benefits.",
  },
];

const HomePromise = () => {
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
            OUR PROMISE
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
            Why Choose{" "}
            <Box component="span" sx={{ color: "#e28a3a" }}>
              MotoVault
            </Box>
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "rgba(255, 255, 255, 0.4)",
              maxWidth: "600px",
              mx: "auto",
              fontSize: { xs: "0.95rem", md: "1.05rem" },
            }}
          >
            More than a marketplace — a complete ownership experience designed around you.
          </Typography>
        </Box>

        {/* 6-Grid Cards */}
        <Grid container spacing={4}>
          {PROMISES.map((item) => (
            <Grid key={item.title} size={{ xs: 12, sm: 6, md: 4 }}>
              <Box
                sx={{
                  backgroundColor: "#121214",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                  borderRadius: "24px",
                  p: { xs: 4, md: 5 },
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    borderColor: "rgba(226, 138, 58, 0.25)",
                    boxShadow: "0 15px 30px rgba(0, 0, 0, 0.4)",
                  },
                }}
              >
                {/* Icon wrapper */}
                <Box
                  sx={{
                    backgroundColor: "rgba(226, 138, 58, 0.08)",
                    border: "1px solid rgba(226, 138, 58, 0.15)",
                    borderRadius: "16px",
                    p: 1.5,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 3.5,
                  }}
                >
                  {item.icon}
                </Box>

                {/* Title */}
                <Typography
                  variant="h5"
                  sx={{
                    color: "#ffffff",
                    fontWeight: 800,
                    fontSize: "1.25rem",
                    mb: 1.5,
                    fontFamily: "'Outfit', sans-serif",
                  }}
                >
                  {item.title}
                </Typography>

                {/* Description */}
                <Typography
                  variant="body2"
                  sx={{
                    color: "rgba(255, 255, 255, 0.45)",
                    lineHeight: 1.6,
                    fontSize: "0.92rem",
                  }}
                >
                  {item.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePromise;
