import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Rating,
  LinearProgress,
  Avatar,
} from "@mui/material";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface ReviewItem {
  id: string;
  name: string;
  avatar: string; // initials
  isVerified: boolean;
  date: string;
  rating: number;
  title: string;
  body: string;
  helpfulCount: number;
}

const REVIEWS: ReviewItem[] = [
  {
    id: "rev1",
    name: "Marcus Chen",
    avatar: "MC",
    isVerified: true,
    date: "Nov 15, 2024",
    rating: 5,
    title: "The perfect urban companion with real touring capability",
    body: "Six months in and the CB650R still puts a grin on my face every single ride. The inline-4 is an absolute gem — smooth, linear, and utterly addictive as the revs climb. HSTC gives real confidence on wet mornings, and the brakes are exceptional. Build quality feels genuinely premium.",
    helpfulCount: 42,
  },
  {
    id: "rev2",
    name: "Sophie Müller",
    avatar: "SM",
    isVerified: true,
    date: "Oct 2, 2024",
    rating: 5,
    title: "Stunning to look at. Even better to ride.",
    body: "Coming from a Triumph Street Triple, I had high expectations. The CB650R exceeded them. TFT screen is crisp and functional. The riding position is perfect. It is years with a jewel-like precision that becomes additive.",
    helpfulCount: 29,
  },
  {
    id: "rev3",
    name: "James Nakamura",
    avatar: "JN",
    isVerified: false,
    date: "Aug 25, 2024",
    rating: 5,
    title: "My third Honda — the best one yet",
    body: "Had the original CB650F before this, and the evolution is remarkable in every dimension. Lighter, sharper electronics, superior brakes, better display. The Neo Sports Café design looks even more striking in Graphite Black in person than in any photo. An effortlessly special machine.",
    helpfulCount: 21,
  },
];

const ratingBars = [
  { stars: 5, count: 3, percentage: 75 },
  { stars: 4, count: 1, percentage: 25 },
  { stars: 3, count: 0, percentage: 0 },
  { stars: 2, count: 0, percentage: 0 },
  { stars: 1, count: 0, percentage: 0 },
];

const CustomerReviews = () => {
  const [helpfulRatings, setHelpfulRatings] = useState<Record<string, number>>({});

  const handleHelpfulClick = (id: string, currentHelpful: number) => {
    if (helpfulRatings[id]) return; // limit to 1 click
    setHelpfulRatings((prev) => ({
      ...prev,
      [id]: currentHelpful + 1,
    }));
  };

  return (
    <Box sx={{ width: "100%", mt: 8 }}>
      {/* Title Header Custom Row */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              color: "white",
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            Customer Reviews
          </Typography>
          <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.4)" }}>
            128 verified reviews
          </Typography>
        </Box>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#e28a3a",
            color: "#000000",
            px: 3.5,
            py: 1.5,
            borderRadius: "24px",
            fontWeight: 700,
            textTransform: "none",
            fontSize: "0.85rem",
            "&:hover": {
              backgroundColor: "#f0a256",
            },
          }}
        >
          Write a Review
        </Button>
      </Box>

      {/* Grid containing rating statistics card and reviews list */}
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4 }}>
        
        {/* Left Rating score card */}
        <Box
          sx={{
            width: { xs: "100%", md: "260px" },
            flexShrink: 0,
            backgroundColor: "#121214",
            border: "1px solid rgba(255, 255, 255, 0.05)",
            borderRadius: "16px",
            p: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "fit-content",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontWeight: 800,
              color: "white",
              fontFamily: "'Outfit', sans-serif",
              fontSize: "3.5rem",
              lineHeight: 1,
            }}
          >
            4.9
          </Typography>
          <Rating value={4.9} precision={0.1} readOnly sx={{ my: 1.5, color: "#e28a3a" }} />
          <Typography variant="caption" sx={{ color: "rgba(255, 255, 255, 0.3)", mb: 3 }}>
            out of 5 stars
          </Typography>

          {/* Progress Bars */}
          <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 1.5 }}>
            {ratingBars.map((bar) => (
              <Box key={bar.stars} sx={{ display: "flex", alignItems: "center", width: "100%" }}>
                <Typography
                  variant="caption"
                  sx={{ color: "white", width: "12px", textAlign: "right", mr: 1, fontWeight: 700 }}
                >
                  {bar.stars}
                </Typography>
                <Typography variant="caption" sx={{ color: "#e28a3a", mr: 1.5, fontSize: "0.7rem" }}>
                  ★
                </Typography>
                <Box sx={{ flexGrow: 1, mr: 1.5 }}>
                  <LinearProgress
                    variant="determinate"
                    value={bar.percentage}
                    sx={{
                      height: 4,
                      borderRadius: 2,
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: "#e28a3a",
                      },
                    }}
                  />
                </Box>
                <Typography
                  variant="caption"
                  sx={{ color: "rgba(255,255,255,0.4)", width: "10px", textAlign: "right" }}
                >
                  {bar.count}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Right Reviews list */}
        <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: 2.5 }}>
          {REVIEWS.map((rev) => (
            <Box
              key={rev.id}
              sx={{
                backgroundColor: "#121214",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                borderRadius: "16px",
                p: { xs: 3, md: 4 },
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              {/* Header profile row */}
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Avatar
                    sx={{
                      bgcolor: "rgba(226, 138, 58, 0.1)",
                      color: "#e28a3a",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      width: 40,
                      height: 40,
                      border: "1px solid rgba(226, 138, 58, 0.15)",
                    }}
                  >
                    {rev.avatar}
                  </Avatar>
                  <Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: "white" }}>
                        {rev.name}
                      </Typography>
                      {rev.isVerified && (
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.2, color: "#4caf50" }}>
                          <CheckCircleIcon sx={{ fontSize: "0.85rem" }} />
                          <Typography variant="caption" sx={{ fontWeight: 800, fontSize: "0.65rem", textTransform: "uppercase" }}>
                            Verified
                          </Typography>
                        </Box>
                      )}
                    </Box>
                    <Rating value={rev.rating} readOnly size="small" sx={{ mt: 0.2, color: "#e28a3a" }} />
                  </Box>
                </Box>
                <Typography variant="caption" sx={{ color: "rgba(255, 255, 255, 0.3)" }}>
                  {rev.date}
                </Typography>
              </Box>

              {/* Review content */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 700,
                    color: "white",
                    fontSize: "0.95rem",
                  }}
                >
                  {rev.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "rgba(255, 255, 255, 0.7)",
                    lineHeight: 1.6,
                    fontSize: "0.9rem",
                  }}
                >
                  {rev.body}
                </Typography>
              </Box>

              {/* Helpful footer */}
              <Button
                variant="text"
                onClick={() => handleHelpfulClick(rev.id, rev.helpfulCount)}
                startIcon={<ThumbUpOutlinedIcon sx={{ fontSize: "0.9rem" }} />}
                sx={{
                  alignSelf: "flex-start",
                  color: helpfulRatings[rev.id] ? "#e28a3a" : "rgba(255, 255, 255, 0.4)",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  textTransform: "none",
                  p: 0,
                  minWidth: 0,
                  "&:hover": {
                    backgroundColor: "transparent",
                    color: helpfulRatings[rev.id] ? "#e28a3a" : "white",
                  },
                }}
              >
                Helpful ({helpfulRatings[rev.id] || rev.helpfulCount})
              </Button>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default CustomerReviews;
