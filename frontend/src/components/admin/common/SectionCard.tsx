import { Paper, Box, Typography } from "@mui/material";
import { ReactNode } from "react";

interface SectionCardProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  headerAction?: ReactNode;
  sx?: object;
}

const SectionCard = ({ title, subtitle, children, headerAction, sx = {} }: SectionCardProps) => {
  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: "#18181b", // zinc 900 Background in MUI darkTheme palette config
        border: "1px solid rgba(255, 255, 255, 0.05)",
        borderRadius: 3,
        p: { xs: 2, md: 3 },
        overflow: "hidden",
        position: "relative",
        ...sx,
      }}
    >
      {(title || headerAction) && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2.5,
            flexWrap: "wrap",
            gap: 1.5,
          }}
        >
          <Box>
            {title && (
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  fontSize: "1.05rem",
                  color: "#ffffff",
                }}
              >
                {title}
              </Typography>
            )}
            {subtitle && (
              <Typography
                variant="body2"
                sx={{
                  color: "#71717a",
                  fontSize: "0.85rem",
                  mt: 0.25,
                }}
              >
                {subtitle}
              </Typography>
            )}
          </Box>
          {headerAction && <Box>{headerAction}</Box>}
        </Box>
      )}
      <Box sx={{ width: "100%" }}>{children}</Box>
    </Paper>
  );
};

export default SectionCard;
