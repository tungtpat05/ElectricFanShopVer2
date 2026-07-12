import { Box, IconButton, Typography, Button } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  startIndex: number;
  endIndex: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  totalItems,
  startIndex,
  endIndex,
  onPageChange,
}: PaginationProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        pt: 2.5,
        mt: 1.5,
        borderTop: "1px solid rgba(255, 255, 255, 0.05)",
      }}
    >
      {/* Description text */}
      <Typography variant="body2" sx={{ color: "#71717a", fontSize: "0.85rem" }}>
        Showing {startIndex}-{endIndex} of {totalItems} products
      </Typography>

      {/* Pages Navigation */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <IconButton
          size="small"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          sx={{
            color: "#a1a1aa",
            border: "1px solid rgba(255, 255, 255, 0.05)",
            borderRadius: 1.5,
            p: 0.75,
            "&.Mui-disabled": {
              color: "#3f3f46",
              borderColor: "rgba(255, 255, 255, 0.02)",
            },
          }}
        >
          <ChevronLeftIcon fontSize="small" />
        </IconButton>

        {Array.from({ length: totalPages }).map((_, i) => {
          const page = i + 1;
          const isSelected = page === currentPage;

          return (
            <Button
              key={page}
              onClick={() => onPageChange(page)}
              sx={{
                minWidth: 32,
                height: 32,
                p: 0,
                borderRadius: 1.5,
                fontWeight: 600,
                fontSize: "0.85rem",
                backgroundColor: isSelected ? "#ff6b35" : "transparent",
                color: isSelected ? "#ffffff" : "#a1a1aa",
                border: "1px solid",
                borderColor: isSelected ? "#ff6b35" : "rgba(255, 255, 255, 0.05)",
                "&:hover": {
                  backgroundColor: isSelected ? "#e05a2b" : "rgba(255, 255, 255, 0.03)",
                  color: isSelected ? "#ffffff" : "#ffffff",
                },
              }}
            >
              {page}
            </Button>
          );
        })}

        <IconButton
          size="small"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          sx={{
            color: "#a1a1aa",
            border: "1px solid rgba(255, 255, 255, 0.05)",
            borderRadius: 1.5,
            p: 0.75,
            "&.Mui-disabled": {
              color: "#3f3f46",
              borderColor: "rgba(255, 255, 255, 0.02)",
            },
          }}
        >
          <ChevronRightIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Pagination;
