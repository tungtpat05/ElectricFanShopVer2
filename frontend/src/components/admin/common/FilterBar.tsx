import { Box } from "@mui/material";
import { ReactNode } from "react";

interface FilterBarProps {
  children?: ReactNode;
}

const FilterBar = ({ children }: FilterBarProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        mt: 2,
        mb: 2.5,
        width: "100%",
        flexWrap: "wrap",
        "& .MuiInputBase-root": {
          backgroundColor: "#18181b",
          borderRadius: 2,
          color: "#ffffff",
          "& fieldset": {
            borderColor: "rgba(255, 255, 255, 0.05)",
          },
          "&:hover fieldset": {
            borderColor: "rgba(255, 255, 255, 0.15)",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#ff6b35",
          },
        },
      }}
    >
      {children}
    </Box>
  );
};

export default FilterBar;
