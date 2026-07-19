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
  itemLabel?: string;
}

const getPaginationRange = (currentPage: number, totalPages: number) => {
  const siblings = 1; // Number of page buttons to show on either side of the current page

  // If total pages is small, show all pages
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(currentPage - siblings, 1);
  const rightSiblingIndex = Math.min(currentPage + siblings, totalPages);

  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftItemCount = 3 + 2 * siblings;
    const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
    return [...leftRange, "...", totalPages];
  }

  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightItemCount = 3 + 2 * siblings;
    const rightRange = Array.from({ length: rightItemCount }, (_, i) => totalPages - rightItemCount + i + 1);
    return [1, "...", ...rightRange];
  }

  if (shouldShowLeftDots && shouldShowRightDots) {
    const middleRange = Array.from({ length: rightSiblingIndex - leftSiblingIndex + 1 }, (_, i) => leftSiblingIndex + i);
    return [1, "...", ...middleRange, "...", totalPages];
  }

  return [];
};

const Pagination = ({
  currentPage,
  totalPages,
  totalItems,
  startIndex,
  endIndex,
  onPageChange,
  itemLabel = "items",
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
        Showing {startIndex}-{endIndex} of {totalItems} {itemLabel}
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

        {getPaginationRange(currentPage, totalPages).map((page, index) => {
          if (page === "...") {
            return (
              <Box
                key={`dots-${index}`}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minWidth: 32,
                  height: 32,
                  color: "#71717a",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                }}
              >
                ...
              </Box>
            );
          }

          const isSelected = page === currentPage;

          return (
            <Button
              key={page}
              onClick={() => onPageChange(page as number)}
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
