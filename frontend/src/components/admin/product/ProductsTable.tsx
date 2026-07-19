import { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Avatar, Typography, Box } from "@mui/material";
import StatusChip from "../common/StatusChip";
import ActionButtons from "../common/ActionButtons";
import Pagination from "../common/Pagination";
import { useNavigate } from "react-router-dom";

import { Product } from "../../../types/product";

interface ProductsTableProps {
  products: Product[];
}

const ProductsTable = ({ products }: ProductsTableProps) => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(products.map((p) => p.id));
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

  // Mock handling pagination metrics
  const itemsPerPage = 8;
  const totalItems = products.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const startIndex = (page - 1) * itemsPerPage + 1;
  const endIndex = Math.min(page * itemsPerPage, totalItems);

  // Filter list to fit currentPage items
  const paginatedProducts = products.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <TableContainer sx={{ overflowX: "auto" }}>
        <Table size="medium" sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow sx={{ "& th": { backgroundColor: "#18181b", color: "#71717a", fontWeight: 650, fontSize: "0.75rem", borderBottom: "1px solid rgba(255, 255, 255, 0.05)", py: 1.5, px: 2 } }}>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={products.length > 0 && selectedIds.length === products.length}
                  indeterminate={selectedIds.length > 0 && selectedIds.length < products.length}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  sx={{ color: "#3f3f46", "&.Mui-checked": { color: "#ff6b35" }, "&.MuiCheckbox-indeterminate": { color: "#ff6b35" } }}
                />
              </TableCell>
              <TableCell>Image</TableCell>
              <TableCell sx={{ minWidth: 200 }}>Product</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedProducts.map((product) => {
              const isSelected = selectedIds.includes(product.id);

              return (
                <TableRow
                  key={product.id}
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
                      onChange={(e) => handleSelectOne(product.id, e.target.checked)}
                      sx={{ color: "#3f3f46", "&.Mui-checked": { color: "#ff6b35" } }}
                    />
                  </TableCell>
                  <TableCell>
                    <Avatar
                      variant="rounded"
                      src={product.thumbnail || ""}
                      sx={{ width: 44, height: 44, border: "1px solid rgba(255, 255, 255, 0.05)", backgroundColor: "#27272a" }}
                    />
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: "#ffffff", fontSize: "0.875rem" }}>
                        {product.productName || "No Name"}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "#71717a", display: "block", mt: 0.25 }}>
                        {product.brand?.brandName || "Unknown Brand"}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: "#ffffff", fontSize: "0.875rem" }}>
                        {product.category?.categoryName || "Unknown Category"}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: "#ffffff", fontSize: "0.875rem" }}>
                        ${(() => {
                          const hasDiscount = product.discountPrice !== null && product.discountPrice !== undefined && product.discountPrice < product.basePrice;
                          const activePrice = hasDiscount ? product.discountPrice : product.basePrice;
                          return activePrice !== null && activePrice !== undefined ? activePrice.toLocaleString() : "0";
                        })()}
                      </Typography>
                      {product.discountPrice !== null && product.discountPrice !== undefined && product.discountPrice < product.basePrice && (
                        <Typography variant="caption" sx={{ color: "#71717a", textDecoration: "line-through", mt: 0.1 }}>
                          ${product.basePrice !== null && product.basePrice !== undefined ? product.basePrice.toLocaleString() : "0"}
                        </Typography>
                      )}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <StatusChip status={product.isActive ? "Active" : "Inactive"} />
                  </TableCell>
                  <TableCell align="right" sx={{ pr: 3 }}>
                    <ActionButtons
                      onView={() => window.open(`/products/${product.id}`, "_blank")}
                      onEdit={() => navigate(`/admin/products/edit/${product.id}`)}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination wrapper component */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        totalItems={totalItems}
        startIndex={totalItems === 0 ? 0 : startIndex}
        endIndex={endIndex}
        onPageChange={handlePageChange}
        itemLabel="products"
      />
    </Box>
  );
};

export default ProductsTable;
