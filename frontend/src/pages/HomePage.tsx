import { Box } from "@mui/material";
import HomeHero from "@/components/home/HomeHero";
import HomeStats from "@/components/home/HomeStats";
import CategorySection from "@/components/category/CategorySection";
import BrandSection from "@/components/brand/BrandSection";
import FeaturedSection from "@/components/product/FeaturedSection";
import HomePromise from "@/components/home/HomePromise";
import NewArrivalsSection from "@/components/home/NewArrivalsSection";
import HomeCommunity from "@/components/home/HomeCommunity";
import HomeReviews from "@/components/home/HomeReviews";
import HomeNewsletter from "@/components/home/HomeNewsletter";

const HomePage = () => {
  return (
    <Box sx={{ width: "100%", backgroundColor: "#09090b", minHeight: "100vh" }}>
      {/* 1. Hero / Search section */}
      <HomeHero />

      {/* 2. Stat summary banner */}
      <HomeStats />

      {/* 3. Browse by Category */}
      <CategorySection />

      {/* 4. World's Greatest Brands */}
      <BrandSection />

      {/* 5. Featured Motorcycles */}
      <FeaturedSection />

      {/* 6. Why Choose MotoVault Promise */}
      <HomePromise />

      {/* 7. New Arrivals and Trust checklist */}
      <NewArrivalsSection />

      {/* 8. More than a Marketplace Banner */}
      <HomeCommunity />

      {/* 9. Trusted by Riders Reviews */}
      <HomeReviews />

      {/* 10. Stay Connected newsletter signup */}
      <HomeNewsletter />
    </Box>
  );
};

export default HomePage;