import { Select, MenuItem, FormControl, SelectChangeEvent, Button, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FilterBar from "../common/FilterBar";
import SearchBar from "../common/SearchBar";

interface CategoryFilterBarProps {
  search: string;
  onSearchChange: (val: string) => void;
  status: string;
  onStatusChange: (val: string) => void;
  onAddClick?: () => void;
}

const CategoryFilterBar = ({
  search,
  onSearchChange,
  status,
  onStatusChange,
  onAddClick,
}: CategoryFilterBarProps) => {
  return (
    <FilterBar>
      <SearchBar
        placeholder="Search categories..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        width={{ xs: "100%", md: 400 }}
      />

      <FormControl size="small" sx={{ minWidth: 140, width: { xs: "100%", sm: "auto" } }}>
        <Select
          value={status}
          onChange={(e: SelectChangeEvent) => onStatusChange(e.target.value)}
          displayEmpty
          inputProps={{ "aria-label": "Select Status" }}
          sx={{
            "& .MuiSelect-select": { py: 1.0, px: 2, fontSize: "0.875rem", fontWeight: 550 },
          }}
        >
          <MenuItem value="">All Statuses</MenuItem>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="inactive">Inactive</MenuItem>
        </Select>
      </FormControl>

      {onAddClick && (
        <Box sx={{ ml: { xs: 0, sm: "auto" }, width: { xs: "100%", sm: "auto" } }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={onAddClick}
            sx={{
              backgroundColor: "#ff6b35",
              color: "#ffffff",
              fontWeight: 600,
              px: 2.5,
              py: 1,
              borderRadius: 2,
              textTransform: "none",
              width: { xs: "100%", sm: "auto" },
              "&:hover": {
                backgroundColor: "#e05a2b",
              },
            }}
          >
            Add Category
          </Button>
        </Box>
      )}
    </FilterBar>
  );
};

export default CategoryFilterBar;
