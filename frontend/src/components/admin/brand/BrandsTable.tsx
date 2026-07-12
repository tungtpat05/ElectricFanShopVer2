import { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Avatar, Typography, Box } from "@mui/material";
import StatusChip from "../common/StatusChip";
import ActionButtons from "../common/ActionButtons";
import Pagination from "../common/Pagination";

export interface BrandItemType {
  id: number;
  name: string;
  country: string;
  count: number;
  status: string;
  image: string;
}

interface BrandsTableProps {
  brands: BrandItemType[];
}

const BrandsTable = ({ brands }: BrandsTableProps) => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [page, setPage] = useState(1);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(brands.map((b) => b.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    }
  };

  // Pagination metrics
  const itemsPerPage = 5;
  const totalItems = brands.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const startIndex = (page - 1) * itemsPerPage + 1;
  const endIndex = Math.min(page * itemsPerPage, totalItems);

  const paginatedBrands = brands.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <TableContainer sx={{ overflowX: "auto" }}>
        <Table size="medium" sx={{ minWidth: 600 }}>
          <TableHead>
            <TableRow sx={{ "& th": { backgroundColor: "#18181b", color: "#71717a", fontWeight: 650, fontSize: "0.75rem", borderBottom: "1px solid rgba(255, 255, 255, 0.05)", py: 1.5, px: 2 } }}>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={brands.length > 0 && selectedIds.length === brands.length}
                  indeterminate={selectedIds.length > 0 && selectedIds.length < brands.length}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  sx={{ color: "#3f3f46", "&.Mui-checked": { color: "#ff6b35" }, "&.MuiCheckbox-indeterminate": { color: "#ff6b35" } }}
                />
              </TableCell>
              <TableCell>Logo</TableCell>
              <TableCell sx={{ minWidth: 154 }}>Brand</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Products Count</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right" sx={{ pr: 3 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedBrands.map((brand) => {
              const isSelected = selectedIds.includes(brand.id);

              return (
                <TableRow
                  key={brand.id}
                  hover
                  selected={isSelected}
                  sx={{
                    "& td": { borderBottom: "1px solid rgba(255, 255, 255, 0.03)", color: "#e4e4e7", py: 2, px: 2 },
                    "&.Mui-selected": { backgroundColor: "rgba(255, 107, 53, 0.03) !important" },
                    "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.01)" }
                  }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      onChange={(e) => handleSelectOne(brand.id, e.target.checked)}
                      sx={{ color: "#3f3f46", "&.Mui-checked": { color: "#ff6b35" } }}
                    />
                  </TableCell>
                  <TableCell>
                    <Avatar
                      variant="rounded"
                      src={brand.image}
                      sx={{ width: 44, height: 44, border: "1px solid rgba(255, 255, 255, 0.05)", backgroundColor: "#27272a" }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: "#ffffff", fontSize: "0.875rem" }}>
                      {brand.name}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ fontSize: "0.85rem", color: "#a1a1aa" }}>
                    {brand.country}
                  </TableCell>
                  <TableCell sx={{ fontWeight: 650, fontSize: "0.85rem" }}>
                    {brand.count}
                  </TableCell>
                  <TableCell>
                    <StatusChip status={brand.status} />
                  </TableCell>
                  <TableCell align="right" sx={{ pr: 3 }}>
                    <ActionButtons
                      onView={() => console.log(`Viewing brand ${brand.name}`)}
                      onEdit={() => console.log(`Editing brand ${brand.name}`)}
                      onDelete={() => console.log(`Deleting brand ${brand.name}`)}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        totalItems={totalItems}
        startIndex={totalItems === 0 ? 0 : startIndex}
        endIndex={endIndex}
        onPageChange={handlePageChange}
      />
    </Box>
  );
};

export default BrandsTable;
