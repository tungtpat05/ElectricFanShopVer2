import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Stack,
  Divider,
  IconButton,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: 8,
        pt: { xs: 6, md: 10 },
        pb: { xs: 4, md: 6 },
        backgroundColor: "background.default",
        borderTop: "1px solid rgba(255, 255, 255, 0.08)",
      }}
    >
      <Container maxWidth={false} sx={{ px: { xs: 2, md: 6 } }}>
        <Grid container spacing={{ xs: 4, md: 6 }}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography
              variant="h5"
              sx={{ color: "#fff", fontWeight: 700, mb: 2 }}
            >
              TORQUEX
            </Typography>
            <Typography
              sx={{ color: "text.secondary", maxWidth: 360, mb: 3 }}
            >
              Modern electric fan shop with curated products, trusted brands, and
              fast delivery. Upgrade your comfort with style and performance.
            </Typography>
            <Stack direction="row" spacing={1.5}>
              <IconButton color="inherit" aria-label="facebook" size="small">
                <FacebookIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="instagram" size="small">
                <InstagramIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="youtube" size="small">
                <YouTubeIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="linkedin" size="small">
                <LinkedInIcon />
              </IconButton>
            </Stack>
          </Grid>

          <Grid size={{ xs: 6, sm: 4, md: 2 }}>
            <Typography sx={{ color: "#fff", fontWeight: 600, mb: 2 }}>
              Products
            </Typography>
            <Stack spacing={1}>
              <Link
                href="/products"
                color="text.secondary"
                underline="hover"
              >
                All Motorbikes
              </Link>
              <Link
                href="/products"
                color="text.secondary"
                underline="hover"
              >
                Best Sellers
              </Link>
              <Link
                href="/products"
                color="text.secondary"
                underline="hover"
              >
                New Arrivals
              </Link>
              <Link
                href="/products"
                color="text.secondary"
                underline="hover"
              >
                Accessories
              </Link>
            </Stack>
          </Grid>

          <Grid size={{ xs: 6, sm: 4, md: 2 }}>
            <Typography sx={{ color: "#fff", fontWeight: 600, mb: 2 }}>
              Company
            </Typography>
            <Stack spacing={1}>
              <Link href="/about" color="text.secondary" underline="hover">
                About Us
              </Link>
              <Link href="/support" color="text.secondary" underline="hover">
                Support
              </Link>
              <Link href="/" color="text.secondary" underline="hover">
                Careers
              </Link>
              <Link href="/" color="text.secondary" underline="hover">
                Contact
              </Link>
            </Stack>
          </Grid>

          <Grid size={{ xs: 6, sm: 4, md: 2 }}>
            <Typography sx={{ color: "#fff", fontWeight: 600, mb: 2 }}>
              Resources
            </Typography>
            <Stack spacing={1}>
              <Link href="/" color="text.secondary" underline="hover">
                Shipping
              </Link>
              <Link href="/" color="text.secondary" underline="hover">
                Returns
              </Link>
              <Link href="/" color="text.secondary" underline="hover">
                Warranty
              </Link>
              <Link href="/" color="text.secondary" underline="hover">
                FAQ
              </Link>
            </Stack>
          </Grid>

          <Grid size={{ xs: 6, sm: 4, md: 2 }}>
            <Typography sx={{ color: "#fff", fontWeight: 600, mb: 2 }}>
              Legal
            </Typography>
            <Stack spacing={1}>
              <Link href="/" color="text.secondary" underline="hover">
                Privacy Policy
              </Link>
              <Link href="/" color="text.secondary" underline="hover">
                Terms of Service
              </Link>
              <Link href="/" color="text.secondary" underline="hover">
                Cookies
              </Link>
            </Stack>
          </Grid>
        </Grid>

        <Divider
          sx={{
            my: { xs: 4, md: 6 },
            borderColor: "rgba(255, 255, 255, 0.08)",
          }}
        />

        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          sx={{
            alignItems: { xs: "flex-start", md: "center" },
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ color: "text.secondary" }}>
            © {new Date().getFullYear()} TORQUEX. All rights reserved.
          </Typography>
          <Stack direction="row" spacing={2}>
            <Link href="/" color="text.secondary" underline="hover">
              Status
            </Link>
            <Link href="/" color="text.secondary" underline="hover">
              Sitemap
            </Link>
            <Link href="/" color="text.secondary" underline="hover">
              Accessibility
            </Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
