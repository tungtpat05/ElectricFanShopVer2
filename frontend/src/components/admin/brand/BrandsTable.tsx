import { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Avatar, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import StatusChip from "../common/StatusChip";
import ActionButtons from "../common/ActionButtons";
import Pagination from "../common/Pagination";

import { Brand } from "../../../types/brand";

interface BrandsTableProps {
  brands: Brand[];
}

const BrandsTable = ({ brands }: BrandsTableProps) => {
  const navigate = useNavigate();
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
  const itemsPerPage = 8;
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
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
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
                      src={brand.logoUrl}
                      sx={{ width: 44, height: 44, border: "1px solid rgba(255, 255, 255, 0.05)", backgroundColor: "#27272a" }}
                    />
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: "#ffffff", fontSize: "0.875rem" }}>
                        {brand.brandName}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "#71717a", display: "block", mt: 0.25 }}>
                        {brand.description}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <StatusChip status={brand.isActive ? "Active" : "Inactive"} />
                  </TableCell>
                  <TableCell>
                    <ActionButtons
                      onView={() => console.log(`Viewing brand ${brand.brandName}`)}
                      onEdit={() => navigate(`/admin/brands/edit/${brand.id}`)}
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
