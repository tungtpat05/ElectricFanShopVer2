import { Select, MenuItem, FormControl, SelectChangeEvent } from "@mui/material";
import FilterBar from "../common/FilterBar";
import SearchBar from "../common/SearchBar";

interface BrandFilterBarProps {
  search: string;
  onSearchChange: (val: string) => void;
  status: string;
  onStatusChange: (val: string) => void;
}

const BrandFilterBar = ({
  search,
  onSearchChange,
  status,
  onStatusChange,
}: BrandFilterBarProps) => {
  return (
    <FilterBar>
      <SearchBar
        placeholder="Search brands..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        width={{ xs: "100%", md: 400 }}
      />

      <FormControl size="small" sx={{ minWidth: 140 }}>
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
    </FilterBar>
  );
};

export default BrandFilterBar;
