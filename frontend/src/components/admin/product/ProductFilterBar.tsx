import { Select, MenuItem, FormControl, SelectChangeEvent } from "@mui/material";
import FilterBar from "../common/FilterBar";
import SearchBar from "../common/SearchBar";

interface ProductFilterBarProps {
  search: string;
  onSearchChange: (val: string) => void;
  status: string;
  onStatusChange: (val: string) => void;
  brand: string;
  onBrandChange: (val: string) => void;
  category: string;
  onCategoryChange: (val: string) => void;
}

const ProductFilterBar = ({
  search,
  onSearchChange,
  status,
  onStatusChange,
  brand,
  onBrandChange,
  category,
  onCategoryChange,
}: ProductFilterBarProps) => {
  return (
    <FilterBar>
      <SearchBar
        placeholder="Search products, SKU, brand..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        width={{ xs: "100%", md: 400 }}
      />

      <FormControl size="small" sx={{ minWidth: 140, xs: "100%", sm: "auto" }}>
        <Select
          value={status}
          onChange={(e: SelectChangeEvent) => onStatusChange(e.target.value)}
          displayEmpty
          inputProps={{ "aria-label": "Select Status" }}
          sx={{
            "& .MuiSelect-select": { py: 1.0, px: 2, fontSize: "0.875rem", fontWeight: 550 },
          }}
        >
          <MenuItem value="">All Status</MenuItem>
          <MenuItem value="published">Published</MenuItem>
          <MenuItem value="draft">Draft</MenuItem>
        </Select>
      </FormControl>

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
          <MenuItem value="Honda">Honda</MenuItem>
          <MenuItem value="Yamaha">Yamaha</MenuItem>
          <MenuItem value="Kawasaki">Kawasaki</MenuItem>
          <MenuItem value="Ducati">Ducati</MenuItem>
          <MenuItem value="BMW Motorrad">BMW Motorrad</MenuItem>
          <MenuItem value="Suzuki">Suzuki</MenuItem>
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
          <MenuItem value="Sport">Sport</MenuItem>
          <MenuItem value="Naked / Streetfighter">Naked / Streetfighter</MenuItem>
          <MenuItem value="Adventure">Adventure</MenuItem>
          <MenuItem value="Cruiser">Cruiser</MenuItem>
          <MenuItem value="Touring">Touring</MenuItem>
          <MenuItem value="Scooter">Scooter</MenuItem>
          <MenuItem value="Off-Road">Off-Road</MenuItem>
        </Select>
      </FormControl>
    </FilterBar>
  );
};

export default ProductFilterBar;
