import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Typography,
  Button,
  Avatar,
  TextField,
  CircularProgress,
  IconButton,
  Tooltip,
  Paper,
  Chip,
  Switch,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert
} from "@mui/material";
import {
  Add,
  Edit,
  CloudUpload,
  Refresh,
  Palette,
  Inventory,
  Style,
  MonetizationOn
} from "@mui/icons-material";
import SectionCard from "../common/SectionCard";
import StatusChip from "../common/StatusChip";
import { getColors, createColor } from "../../../services/colorService";
import {
  getProductVariants,
  createProductVariant,
  updateProductVariant,
  uploadProductImage
} from "../../../services/productService";
import { Color } from "../../../types/color";
import { ProductVariant } from "../../../types/product";

interface VariantSectionProps {
  productId?: number;
  productName?: string;
  disabled?: boolean;
}

const VariantSection = ({ productId, productName, disabled }: VariantSectionProps) => {
  // Variant List State
  const [variants, setVariants] = useState<ProductVariant[]>([]);
  const [loadingVariants, setLoadingVariants] = useState(false);
  const [variantError, setVariantError] = useState<string | null>(null);

  // Available Colors State
  const [colors, setColors] = useState<Color[]>([]);
  const [loadingColors, setLoadingColors] = useState(false);

  // Variant Modal State (Add / Edit)
  const [openModal, setOpenModal] = useState(false);
  const [editingVariant, setEditingVariant] = useState<ProductVariant | null>(null);
  const [variantForm, setVariantForm] = useState({
    colorId: "",
    sku: "",
    additionalPrice: "0",
    stockQuantity: "0",
    variantImage: "",
    variantImagePublicId: "",
    isActive: true
  });
  const [modalErrors, setModalErrors] = useState<Record<string, string>>({});
  const [savingVariant, setSavingVariant] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Quick Add Color Modal State
  const [openColorModal, setOpenColorModal] = useState(false);
  const [colorForm, setColorForm] = useState({
    colorName: "",
    colorCode: "#000000"
  });
  const [colorError, setColorError] = useState<string | null>(null);
  const [savingColor, setSavingColor] = useState(false);

  // Load Colors
  const fetchColors = useCallback(async () => {
    setLoadingColors(true);
    try {
      const data = await getColors();
      setColors(data);
    } catch (err: any) {
      console.error("Failed to load colors:", err);
    } finally {
      setLoadingColors(false);
    }
  }, []);

  // Load Variants
  const fetchVariants = useCallback(async () => {
    if (!productId) return;
    setLoadingVariants(true);
    setVariantError(null);
    try {
      const data = await getProductVariants(productId);
      setVariants(data);
    } catch (err: any) {
      console.error("Failed to load product variants:", err);
      setVariantError("Failed to load variants for this product.");
    } finally {
      setLoadingVariants(false);
    }
  }, [productId]);

  useEffect(() => {
    void fetchColors();
    if (productId) {
      void fetchVariants();
    }
  }, [productId, fetchColors, fetchVariants]);

  // Open Modal for Create
  const handleOpenCreateModal = () => {
    setEditingVariant(null);
    setVariantForm({
      colorId: colors.length > 0 ? String(colors[0].id) : "",
      sku: "",
      additionalPrice: "0",
      stockQuantity: "0",
      variantImage: "",
      variantImagePublicId: "",
      isActive: true
    });
    setModalErrors({});
    setOpenModal(true);
  };

  // Open Modal for Edit
  const handleOpenEditModal = (variant: ProductVariant) => {
    setEditingVariant(variant);
    setVariantForm({
      colorId: variant.color?.id ? String(variant.color.id) : "",
      sku: variant.sku || "",
      additionalPrice: variant.additionalPrice !== undefined ? String(variant.additionalPrice) : "0",
      stockQuantity: variant.stockQuantity !== undefined ? String(variant.stockQuantity) : "0",
      variantImage: variant.variantImage || "",
      variantImagePublicId: variant.variantImagePublicId || "",
      isActive: variant.isActive !== false
    });
    setModalErrors({});
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    if (savingVariant || uploadingImage) return;
    setOpenModal(false);
  };

  // Image Upload Handler for Variant
  const handleVariantImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setModalErrors((prev) => ({ ...prev, variantImage: "" }));
    try {
      const res = await uploadProductImage(file);
      setVariantForm((prev) => ({
        ...prev,
        variantImage: res.url,
        variantImagePublicId: res.publicId
      }));
    } catch (err: any) {
      console.error("Failed to upload variant image:", err);
      setModalErrors((prev) => ({
        ...prev,
        variantImage: err?.response?.data?.message || err?.message || "Failed to upload image"
      }));
    } finally {
      setUploadingImage(false);
    }
  };

  // Form Validation
  const validateForm = () => {
    const errs: Record<string, string> = {};
    if (!variantForm.colorId) {
      errs.colorId = "Please select a color";
    }
    if (!variantForm.sku.trim()) {
      errs.sku = "SKU is required";
    } else if (!/^[A-Za-z0-9-]+$/.test(variantForm.sku.trim())) {
      errs.sku = "SKU can only contain letters, numbers, and hyphens";
    }
    if (variantForm.additionalPrice === "" || isNaN(Number(variantForm.additionalPrice)) || Number(variantForm.additionalPrice) < 0) {
      errs.additionalPrice = "Price must be a valid non-negative number";
    }
    if (variantForm.stockQuantity === "" || isNaN(Number(variantForm.stockQuantity)) || Number(variantForm.stockQuantity) < 0) {
      errs.stockQuantity = "Stock must be a valid non-negative number";
    }
    if (!variantForm.variantImage.trim()) {
      errs.variantImage = "Variant image is required";
    }

    setModalErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Submit Save Variant (Create / Update)
  const handleSaveVariant = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!productId) return;
    if (!validateForm()) return;

    setSavingVariant(true);
    try {
      if (editingVariant) {
        // Update existing variant
        await updateProductVariant(productId, editingVariant.id, {
          colorId: Number(variantForm.colorId),
          sku: variantForm.sku.trim().toUpperCase(),
          additionalPrice: Number(variantForm.additionalPrice),
          stockQuantity: Number(variantForm.stockQuantity),
          variantImage: variantForm.variantImage.trim(),
          variantImagePublicId: variantForm.variantImagePublicId.trim(),
          isActive: variantForm.isActive
        });
      } else {
        // Create new variant
        await createProductVariant(productId, {
          colorId: Number(variantForm.colorId),
          sku: variantForm.sku.trim().toUpperCase(),
          additionalPrice: Number(variantForm.additionalPrice),
          stockQuantity: Number(variantForm.stockQuantity),
          variantImage: variantForm.variantImage.trim(),
          variantImagePublicId: variantForm.variantImagePublicId.trim()
        });
      }
      setOpenModal(false);
      await fetchVariants();
    } catch (err: any) {
      console.error("Failed to save variant:", err);
      setModalErrors((prev) => ({
        ...prev,
        submit: err?.response?.data?.message || err?.message || "Failed to save variant. Please try again."
      }));
    } finally {
      setSavingVariant(false);
    }
  };

  // Quick Add Color Handler
  const handleSaveColor = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!colorForm.colorName.trim()) {
      setColorError("Color name is required");
      return;
    }
    setSavingColor(true);
    setColorError(null);
    try {
      const newColor = await createColor({
        colorName: colorForm.colorName.trim(),
        colorCode: colorForm.colorCode.trim()
      });
      await fetchColors();
      setVariantForm((prev) => ({ ...prev, colorId: String(newColor.id) }));
      setOpenColorModal(false);
      setColorForm({ colorName: "", colorCode: "#000000" });
    } catch (err: any) {
      console.error("Failed to create color:", err);
      setColorError(err?.response?.data?.message || err?.message || "Failed to create new color.");
    } finally {
      setSavingColor(false);
    }
  };

  const formatVND = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount);
  };

  // Render when creating product (no productId yet)
  if (!productId) {
    return (
      <SectionCard title="Product Variants Management">
        <Box
          sx={{
            py: 6,
            px: 3,
            textAlign: "center",
            backgroundColor: "rgba(255, 255, 255, 0.02)",
            borderRadius: 2,
            border: "1px dashed rgba(255, 255, 255, 0.1)"
          }}
        >
          <Style sx={{ fontSize: 48, color: "#71717a", mb: 1.5 }} />
          <Typography variant="h6" sx={{ color: "#ffffff", fontWeight: 650, mb: 1 }}>
            Save Basic Info First
          </Typography>
          <Typography variant="body2" sx={{ color: "#71717a", maxWidth: 460, mx: "auto" }}>
            Please publish or save the product basic information first. After creation, you will be able to manage variants for <strong>{productName || "this product"}</strong> here.
          </Typography>
        </Box>
      </SectionCard>
    );
  }

  return (
    <SectionCard title="Product Variants Management">
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
        {/* Header Action Bar */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 2,
            pb: 1
          }}
        >
          <Box>
            <Typography variant="subtitle2" sx={{ color: "#e4e4e7", fontWeight: 600 }}>
              Variants List ({variants.length})
            </Typography>
            <Typography variant="caption" sx={{ color: "#71717a" }}>
              Configure product variants, stock levels, extra pricing, and color options.
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Tooltip title="Refresh variants list">
              <IconButton
                onClick={() => void fetchVariants()}
                disabled={loadingVariants || disabled}
                sx={{
                  color: "#71717a",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)", color: "#ffffff" }
                }}
              >
                <Refresh fontSize="small" />
              </IconButton>
            </Tooltip>

            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={handleOpenCreateModal}
              disabled={disabled}
              sx={{
                backgroundColor: "#ff6b35",
                color: "#ffffff",
                fontWeight: 650,
                fontSize: "0.85rem",
                textTransform: "none",
                borderRadius: 2,
                boxShadow: "0 4px 12px rgba(255, 107, 53, 0.15)",
                "&:hover": { backgroundColor: "#e05a2b" }
              }}
            >
              Add Variant
            </Button>
          </Box>
        </Box>

        {variantError && (
          <Alert severity="error" sx={{ backgroundColor: "rgba(239, 68, 68, 0.1)", color: "#fca5a5" }}>
            {variantError}
          </Alert>
        )}

        {/* Loading Spinner */}
        {loadingVariants ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
            <CircularProgress color="warning" size={32} />
          </Box>
        ) : variants.length === 0 ? (
          /* Empty State */
          <Paper
            elevation={0}
            sx={{
              py: 5,
              px: 3,
              textAlign: "center",
              backgroundColor: "rgba(255, 255, 255, 0.02)",
              borderRadius: 2,
              border: "1px dashed rgba(255, 255, 255, 0.1)"
            }}
          >
            <Inventory sx={{ fontSize: 44, color: "#52525b", mb: 1 }} />
            <Typography variant="subtitle1" sx={{ color: "#e4e4e7", fontWeight: 600 }}>
              No Variants Created Yet
            </Typography>
            <Typography variant="body2" sx={{ color: "#71717a", mb: 2 }}>
              Add different color variations, price adjustments, and stock levels for this product.
            </Typography>
            <Button
              variant="outlined"
              startIcon={<Add />}
              onClick={handleOpenCreateModal}
              sx={{
                borderColor: "#ff6b35",
                color: "#ff6b35",
                fontWeight: 600,
                textTransform: "none",
                "&:hover": { borderColor: "#e05a2b", backgroundColor: "rgba(255, 107, 53, 0.05)" }
              }}
            >
              Add First Variant
            </Button>
          </Paper>
        ) : (
          /* Variants Table */
          <TableContainer
            component={Paper}
            elevation={0}
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.02)",
              border: "1px solid rgba(255, 255, 255, 0.05)",
              borderRadius: 2,
              overflow: "hidden"
            }}
          >
            <Table size="medium">
              <TableHead sx={{ backgroundColor: "rgba(255, 255, 255, 0.03)" }}>
                <TableRow>
                  <TableCell sx={{ color: "#71717a", fontWeight: 650, fontSize: "0.75rem" }}>IMAGE</TableCell>
                  <TableCell sx={{ color: "#71717a", fontWeight: 650, fontSize: "0.75rem" }}>COLOR</TableCell>
                  <TableCell sx={{ color: "#71717a", fontWeight: 650, fontSize: "0.75rem" }}>SKU</TableCell>
                  <TableCell sx={{ color: "#71717a", fontWeight: 650, fontSize: "0.75rem" }}>ADDITIONAL PRICE</TableCell>
                  <TableCell sx={{ color: "#71717a", fontWeight: 650, fontSize: "0.75rem" }}>STOCK</TableCell>
                  <TableCell sx={{ color: "#71717a", fontWeight: 650, fontSize: "0.75rem" }}>STATUS</TableCell>
                  <TableCell align="right" sx={{ color: "#71717a", fontWeight: 650, fontSize: "0.75rem" }}>ACTIONS</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {variants.map((v) => (
                  <TableRow
                    key={v.id}
                    sx={{
                      "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.03)" },
                      borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
                      opacity: v.isActive ? 1 : 0.55
                    }}
                  >
                    {/* Image */}
                    <TableCell>
                      <Avatar
                        variant="rounded"
                        src={v.variantImage}
                        alt={v.sku}
                        sx={{
                          width: 64,
                          height: 64,
                          borderRadius: 2,
                          backgroundColor: "#18181b",
                          border: "1px solid rgba(255, 255, 255, 0.12)",
                          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.4)"
                        }}
                      >
                        <Style sx={{ color: "#71717a", fontSize: 24 }} />
                      </Avatar>
                    </TableCell>

                    {/* Color */}
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
                        {v.color?.colorCode && (
                          <Box
                            sx={{
                              width: 22,
                              height: 22,
                              borderRadius: "50%",
                              backgroundColor: v.color.colorCode,
                              border: "2px solid rgba(255, 255, 255, 0.4)",
                              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.5), inset 0 0 4px rgba(255, 255, 255, 0.2)",
                              flexShrink: 0
                            }}
                          />
                        )}
                        <Typography variant="body2" sx={{ color: "#ffffff", fontWeight: 600 }}>
                          {v.color?.colorName || "N/A"}
                        </Typography>
                      </Box>
                    </TableCell>

                    {/* SKU */}
                    <TableCell>
                      <Chip
                        label={v.sku}
                        size="small"
                        sx={{
                          fontFamily: "monospace",
                          fontWeight: 700,
                          fontSize: "0.78rem",
                          backgroundColor: "rgba(255, 107, 53, 0.1)",
                          color: "#ff6b35",
                          border: "1px solid rgba(255, 107, 53, 0.2)"
                        }}
                      />
                    </TableCell>

                    {/* Additional Price */}
                    <TableCell sx={{ color: v.additionalPrice > 0 ? "#10b981" : "#a1a1aa", fontWeight: 600, fontSize: "0.85rem" }}>
                      {v.additionalPrice > 0 ? `+${formatVND(v.additionalPrice)}` : "0 ₫"}
                    </TableCell>

                    {/* Stock Quantity */}
                    <TableCell>
                      <Chip
                        label={`${v.stockQuantity} items`}
                        size="small"
                        sx={{
                          fontWeight: 600,
                          fontSize: "0.75rem",
                          backgroundColor: v.stockQuantity > 10 ? "rgba(16, 185, 129, 0.1)" : v.stockQuantity > 0 ? "rgba(245, 158, 11, 0.1)" : "rgba(239, 68, 68, 0.1)",
                          color: v.stockQuantity > 10 ? "#10b981" : v.stockQuantity > 0 ? "#f59e0b" : "#ef4444",
                          border: `1px solid ${v.stockQuantity > 10 ? "rgba(16, 185, 129, 0.2)" : v.stockQuantity > 0 ? "rgba(245, 158, 11, 0.2)" : "rgba(239, 68, 68, 0.2)"}`
                        }}
                      />
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      <StatusChip status={v.isActive ? "Active" : "Inactive"} />
                    </TableCell>

                    {/* Actions */}
                    <TableCell align="right">
                      <Tooltip title="Edit Variant">
                        <IconButton
                          size="small"
                          onClick={() => handleOpenEditModal(v)}
                          sx={{
                            color: "#a1a1aa",
                            "&:hover": { color: "#ff6b35", backgroundColor: "rgba(255, 107, 53, 0.1)" }
                          }}
                        >
                          <Edit fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>

      {/* --- ADD / EDIT VARIANT DIALOG MODAL --- */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: "#121214",
            backgroundImage: "none",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: 3,
            color: "#ffffff"
          }
        }}
      >
        <DialogTitle sx={{ fontWeight: 700, fontSize: "1.1rem", borderBottom: "1px solid rgba(255, 255, 255, 0.05)" }}>
          {editingVariant ? `Edit Variant: ${editingVariant.sku}` : "Add New Product Variant"}
        </DialogTitle>

        <Box component="form" onSubmit={(e) => { e.preventDefault(); e.stopPropagation(); void handleSaveVariant(e); }}>
          <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2.5, pt: 3 }}>
            {modalErrors.submit && (
              <Alert severity="error" sx={{ backgroundColor: "rgba(239, 68, 68, 0.1)", color: "#fca5a5" }}>
                {modalErrors.submit}
              </Alert>
            )}

            {/* Color Selector + Quick Add Button */}
            <Box sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}>
              <FormControl fullWidth error={!!modalErrors.colorId}>
                <InputLabel sx={{ color: "#71717a", fontWeight: 600 }}>COLOR *</InputLabel>
                <Select
                  value={variantForm.colorId}
                  label="COLOR *"
                  onChange={(e) => setVariantForm({ ...variantForm, colorId: e.target.value })}
                  sx={{
                    color: "#ffffff",
                    "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255, 255, 255, 0.1)" }
                  }}
                >
                  {loadingColors ? (
                    <MenuItem disabled>Loading colors...</MenuItem>
                  ) : colors.length === 0 ? (
                    <MenuItem disabled>No colors available. Click '+' to add one.</MenuItem>
                  ) : (
                    colors.map((c) => (
                      <MenuItem key={c.id} value={String(c.id)}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                          {c.colorCode && (
                            <Box
                              sx={{
                                width: 20,
                                height: 20,
                                borderRadius: "50%",
                                backgroundColor: c.colorCode,
                                border: "2px solid rgba(255, 255, 255, 0.35)",
                                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.4)",
                                flexShrink: 0
                              }}
                            />
                          )}
                          <span>{c.colorName}</span>
                        </Box>
                      </MenuItem>
                    ))
                  )}
                </Select>
                {modalErrors.colorId && (
                  <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
                    {modalErrors.colorId}
                  </Typography>
                )}
              </FormControl>

              <Tooltip title="Add New Color option">
                <Button
                  variant="outlined"
                  onClick={() => setOpenColorModal(true)}
                  sx={{
                    minWidth: 48,
                    height: 56,
                    borderColor: "rgba(255, 255, 255, 0.15)",
                    color: "#ff6b35",
                    "&:hover": { borderColor: "#ff6b35", backgroundColor: "rgba(255, 107, 53, 0.05)" }
                  }}
                >
                  <Palette />
                </Button>
              </Tooltip>
            </Box>

            {/* SKU Input */}
            <TextField
              fullWidth
              label="SKU (Stock Keeping Unit) *"
              placeholder="e.g. FAN-BLK-01"
              value={variantForm.sku}
              onChange={(e) => setVariantForm({ ...variantForm, sku: e.target.value.toUpperCase() })}
              error={!!modalErrors.sku}
              helperText={modalErrors.sku || "Uppercase letters, numbers, and hyphens only"}
              sx={{
                "& label": { color: "#71717a", fontWeight: 600 }
              }}
            />

            {/* Additional Price & Stock Quantity */}
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                fullWidth
                type="number"
                label="ADDITIONAL PRICE (₫)"
                placeholder="0"
                value={variantForm.additionalPrice}
                onChange={(e) => setVariantForm({ ...variantForm, additionalPrice: e.target.value })}
                error={!!modalErrors.additionalPrice}
                helperText={modalErrors.additionalPrice || "Extra cost on top of base price"}
                InputProps={{
                  startAdornment: <MonetizationOn sx={{ color: "#71717a", mr: 1, fontSize: 20 }} />
                }}
                sx={{
                  "& label": { color: "#71717a", fontWeight: 600 }
                }}
              />

              <TextField
                fullWidth
                type="number"
                label="STOCK QUANTITY *"
                placeholder="0"
                value={variantForm.stockQuantity}
                onChange={(e) => setVariantForm({ ...variantForm, stockQuantity: e.target.value })}
                error={!!modalErrors.stockQuantity}
                helperText={modalErrors.stockQuantity}
                sx={{
                  "& label": { color: "#71717a", fontWeight: 600 }
                }}
              />
            </Box>

            {/* Image Upload Field */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography variant="body2" sx={{ color: "#e4e4e7", fontWeight: 600 }}>
                Variant Image *
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", gap: 2.5 }}>
                <Avatar
                  variant="rounded"
                  src={variantForm.variantImage}
                  sx={{
                    width: 100,
                    height: 100,
                    borderRadius: 2.5,
                    backgroundColor: "rgba(255, 255, 255, 0.04)",
                    border: "1px dashed rgba(255, 255, 255, 0.2)",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)"
                  }}
                >
                  <Style sx={{ color: "#71717a", fontSize: 36 }} />
                </Avatar>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <Button
                    variant="outlined"
                    component="label"
                    disabled={uploadingImage}
                    startIcon={uploadingImage ? <CircularProgress size={18} color="inherit" /> : <CloudUpload />}
                    sx={{
                      borderColor: "rgba(255, 255, 255, 0.15)",
                      color: "#e4e4e7",
                      fontSize: "0.82rem",
                      textTransform: "none",
                      fontWeight: 600,
                      "&:hover": { borderColor: "#ff6b35", color: "#ff6b35" }
                    }}
                  >
                    {uploadingImage ? "Uploading..." : "Upload Image"}
                    <input type="file" hidden accept="image/*" onChange={handleVariantImageUpload} />
                  </Button>
                  <Typography variant="caption" sx={{ color: "#71717a" }}>
                    JPG, PNG or WEBP up to 5MB
                  </Typography>
                </Box>
              </Box>

              {modalErrors.variantImage && (
                <Typography variant="caption" color="error">
                  {modalErrors.variantImage}
                </Typography>
              )}
            </Box>

            {/* Is Active Switch */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                pt: 1,
                borderTop: "1px solid rgba(255, 255, 255, 0.05)"
              }}
            >
              <Typography variant="body2" sx={{ color: "#e4e4e7", fontWeight: 600 }}>
                Active Status
              </Typography>
              <Switch
                checked={variantForm.isActive}
                onChange={(e) => setVariantForm({ ...variantForm, isActive: e.target.checked })}
                sx={{
                  "& .MuiSwitch-switchBase.Mui-checked": { color: "#ff6b35" },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { backgroundColor: "#ff6b35" }
                }}
              />
            </Box>
          </DialogContent>

          <DialogActions sx={{ p: 2.5, pt: 1, borderTop: "1px solid rgba(255, 255, 255, 0.05)" }}>
            <Button
              onClick={handleCloseModal}
              disabled={savingVariant}
              sx={{ color: "#71717a", fontWeight: 600, textTransform: "none" }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={savingVariant || uploadingImage}
              startIcon={savingVariant ? <CircularProgress size={18} color="inherit" /> : null}
              sx={{
                backgroundColor: "#ff6b35",
                color: "#ffffff",
                fontWeight: 650,
                textTransform: "none",
                px: 3,
                borderRadius: 2,
                "&:hover": { backgroundColor: "#e05a2b" }
              }}
            >
              {savingVariant ? "Saving..." : editingVariant ? "Save Changes" : "Create Variant"}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      {/* --- QUICK CREATE COLOR MODAL --- */}
      <Dialog
        open={openColorModal}
        onClose={() => !savingColor && setOpenColorModal(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: "#18181b",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: 3,
            color: "#ffffff"
          }
        }}
      >
        <DialogTitle sx={{ fontWeight: 700, fontSize: "1rem" }}>
          Add New Color Option
        </DialogTitle>
        <Box component="form" onSubmit={(e) => { e.preventDefault(); e.stopPropagation(); void handleSaveColor(e); }}>
          <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}>
            {colorError && (
              <Alert severity="error" sx={{ backgroundColor: "rgba(239, 68, 68, 0.1)", color: "#fca5a5" }}>
                {colorError}
              </Alert>
            )}

            <TextField
              fullWidth
              label="Color Name *"
              placeholder="e.g. Metallic Black / Đen bóng"
              value={colorForm.colorName}
              onChange={(e) => setColorForm({ ...colorForm, colorName: e.target.value })}
              sx={{ "& label": { color: "#71717a", fontWeight: 600 } }}
            />

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <TextField
                fullWidth
                label="Color Hex Code"
                placeholder="#000000"
                value={colorForm.colorCode}
                onChange={(e) => setColorForm({ ...colorForm, colorCode: e.target.value })}
                sx={{ "& label": { color: "#71717a", fontWeight: 600 } }}
              />
              <input
                type="color"
                value={colorForm.colorCode || "#000000"}
                onChange={(e) => setColorForm({ ...colorForm, colorCode: e.target.value })}
                style={{
                  width: 44,
                  height: 44,
                  border: "none",
                  borderRadius: 8,
                  cursor: "pointer",
                  backgroundColor: "transparent"
                }}
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 2, pt: 1 }}>
            <Button
              onClick={() => setOpenColorModal(false)}
              disabled={savingColor}
              sx={{ color: "#71717a", textTransform: "none" }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={savingColor}
              sx={{
                backgroundColor: "#ff6b35",
                color: "#ffffff",
                fontWeight: 650,
                textTransform: "none",
                "&:hover": { backgroundColor: "#e05a2b" }
              }}
            >
              {savingColor ? "Creating..." : "Save Color"}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </SectionCard>
  );
};

export default VariantSection;
