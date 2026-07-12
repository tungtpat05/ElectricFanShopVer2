import { Select, MenuItem, FormControl, SelectChangeEvent, Button, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FilterBar from "../common/FilterBar";
import SearchBar from "../common/SearchBar";
import { Brand } from "../../../types/brand";
import { Category } from "../../../types/category";

interface ProductFilterBarProps {
  search: string;
  onSearchChange: (val: string) => void;
  brand: string;
  onBrandChange: (val: string) => void;
  category: string;
  onCategoryChange: (val: string) => void;
  brands: Brand[];
  categories: Category[];
  onAddClick?: () => void;
}

const ProductFilterBar = ({
  search,
  onSearchChange,
  brand,
  onBrandChange,
  category,
  onCategoryChange,
  brands,
  categories,
  onAddClick,
}: ProductFilterBarProps) => {
  return (
    <FilterBar>
      <SearchBar
        placeholder="Search products, brand..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        width={{ xs: "100%", md: 400 }}
      />

      <FormControl size="small" sx={{ minWidth: 140, xs: "100%", sm: "auto" }}>
        <Select
          value={brand}
          onChange={(e: SelectChangeEvent) => onBrandChange(e.target.value)}
          displayEmpty
          inputProps={{ "aria-label": "Select Brand" }}
          sx={{
            "& .MuiSelect-select": { py: 1.0, px: 2, fontSize: "0.875rem", fontWeight: 550 },
          }}
        >
          <MenuItem value="">All Brands</MenuItem>
          {brands.map((b) => (
            <MenuItem key={b.id} value={b.brandName}>
              {b.brandName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 154, xs: "100%", sm: "auto" }}>
        <Select
          value={category}
          onChange={(e: SelectChangeEvent) => onCategoryChange(e.target.value)}
          displayEmpty
          inputProps={{ "aria-label": "Select Category" }}
          sx={{
            "& .MuiSelect-select": { py: 1.0, px: 2, fontSize: "0.875rem", fontWeight: 550 },
          }}
        >
          <MenuItem value="">All Categories</MenuItem>
          {categories.map((c) => (
            <MenuItem key={c.id} value={c.categoryName}>
              {c.categoryName}
            </MenuItem>
          ))}
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
            Add Product
          </Button>
        </Box>
      )}
    </FilterBar>
  );
};

export default ProductFilterBar;
