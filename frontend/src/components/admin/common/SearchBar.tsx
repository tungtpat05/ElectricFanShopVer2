import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ChangeEvent } from "react";

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  width?: any;
}

const SearchBar = ({
  placeholder = "Search...",
  value,
  onChange,
  width = { xs: "100%", sm: 320 },
}: SearchBarProps) => {
  return (
    <TextField
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "#71717a" }} />
            </InputAdornment>
          ),
        },
      }}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      size="small"
      sx={{
        width,
        "& .MuiOutlinedInput-root": {
          backgroundColor: "#18181b",
          borderRadius: 2,
          border: "1px solid rgba(255, 255, 255, 0.05)",
          color: "#ffffff",
          "& fieldset": {
            border: "none",
          },
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.02)",
          },
          "&.Mui-focused": {
            backgroundColor: "rgba(255, 255, 255, 0.03)",
            border: "1px solid #ff6b35",
          },
        },
        "& .MuiInputBase-input::placeholder": {
          color: "#71717a",
          opacity: 1,
        },
      }}
    />
  );
};

export default SearchBar;
