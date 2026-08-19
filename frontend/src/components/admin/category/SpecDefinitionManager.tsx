import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormControlLabel,
  Switch,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SectionCard from "../common/SectionCard";
import {
  SpecDefinition,
  SpecDataType,
} from "../../../types/specDefinition";
import {
  getSpecDefinitionsByCategory,
  createSpecDefinition,
  updateSpecDefinition,
  deleteSpecDefinition,
  createSpecDefinitionOption,
  deleteSpecDefinitionOption,
} from "../../../services/specDefinitionService";

interface SpecDefinitionManagerProps {
  categoryId?: number;
}

const slugifyKey = (text: string) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s]/g, "")
    .replace(/[\s-]+/g, "_");
};

const SpecDefinitionManager: React.FC<SpecDefinitionManagerProps> = ({ categoryId }) => {
  const [specDefs, setSpecDefs] = useState<SpecDefinition[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Dialog state for create/edit spec definition
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingDef, setEditingDef] = useState<SpecDefinition | null>(null);

  // Dialog form state
  const [keyCode, setKeyCode] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [dataType, setDataType] = useState<SpecDataType>("text");
  const [unit, setUnit] = useState("");
  const [displayOrder, setDisplayOrder] = useState<number>(0);
  const [isRequired, setIsRequired] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [isKeyManuallyEdited, setIsKeyManuallyEdited] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Select Options management state inside edit
  const [newOptionValue, setNewOptionValue] = useState("");
  const [addingOption, setAddingOption] = useState(false);

  const fetchSpecDefs = async () => {
    if (!categoryId) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getSpecDefinitionsByCategory(categoryId, false);
      setSpecDefs(data);
    } catch (err: any) {
      console.error("Failed to load spec definitions:", err);
      setError("Failed to load specification fields for this category.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (categoryId) {
      void fetchSpecDefs();
    }
  }, [categoryId]);

  const handleOpenAddDialog = () => {
    setEditingDef(null);
    setKeyCode("");
    setDisplayName("");
    setDataType("text");
    setUnit("");
    setDisplayOrder(specDefs.length + 1);
    setIsRequired(false);
    setIsActive(true);
    setIsKeyManuallyEdited(false);
    setFormError(null);
    setDialogOpen(true);
  };

  const handleOpenEditDialog = (def: SpecDefinition) => {
    setEditingDef(def);
    setKeyCode(def.keyCode);
    setDisplayName(def.displayName);
    setDataType(def.dataType);
    setUnit(def.unit || "");
    setDisplayOrder(def.displayOrder);
    setIsRequired(def.isRequired);
    setIsActive(def.isActive);
    setIsKeyManuallyEdited(true);
    setFormError(null);
    setDialogOpen(true);
  };

  const handleDisplayNameChange = (val: string) => {
    setDisplayName(val);
    if (!isKeyManuallyEdited && !editingDef) {
      setKeyCode(slugifyKey(val));
    }
  };

  const handleSaveDef = async () => {
    if (!categoryId) return;
    if (!displayName.trim()) {
      setFormError("Display name is required");
      return;
    }
    if (!keyCode.trim()) {
      setFormError("Key code is required");
      return;
    }

    setSubmitting(true);
    setFormError(null);

    try {
      if (editingDef) {
        await updateSpecDefinition(categoryId, editingDef.id, {
          keyCode: keyCode.trim(),
          displayName: displayName.trim(),
          dataType,
          unit: dataType === "number" ? unit.trim() : "",
          displayOrder,
          isRequired,
          isActive,
        });
      } else {
        await createSpecDefinition(categoryId, {
          keyCode: keyCode.trim(),
          displayName: displayName.trim(),
          dataType,
          unit: dataType === "number" ? unit.trim() : "",
          displayOrder,
          isRequired,
        });
      }
      setDialogOpen(false);
      await fetchSpecDefs();
    } catch (err: any) {
      console.error("Failed to save spec definition:", err);
      setFormError(
        err?.response?.data?.message || err?.message || "Failed to save spec field."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteDef = async (defId: number) => {
    if (!categoryId) return;
    if (!window.confirm("Are you sure you want to delete this specification field?")) return;

    try {
      await deleteSpecDefinition(categoryId, defId);
      await fetchSpecDefs();
    } catch (err: any) {
      console.error("Failed to delete spec definition:", err);
      alert(err?.response?.data?.message || "Failed to delete spec field.");
    }
  };

  const handleAddOption = async () => {
    if (!categoryId || !editingDef || !newOptionValue.trim()) return;
    setAddingOption(true);
    try {
      await createSpecDefinitionOption(categoryId, editingDef.id, {
        optionValue: newOptionValue.trim(),
        displayOrder: (editingDef.options?.length || 0) + 1,
      });
      setNewOptionValue("");
      // Refresh editingDef options
      const updatedDefs = await getSpecDefinitionsByCategory(categoryId, false);
      setSpecDefs(updatedDefs);
      const updatedCurrent = updatedDefs.find((d) => d.id === editingDef.id);
      if (updatedCurrent) {
        setEditingDef(updatedCurrent);
      }
    } catch (err: any) {
      console.error("Failed to add option:", err);
      alert(err?.response?.data?.message || "Failed to add option.");
    } finally {
      setAddingOption(false);
    }
  };

  const handleDeleteOption = async (optionId: number) => {
    if (!categoryId || !editingDef) return;
    try {
      await deleteSpecDefinitionOption(categoryId, editingDef.id, optionId);
      const updatedDefs = await getSpecDefinitionsByCategory(categoryId, false);
      setSpecDefs(updatedDefs);
      const updatedCurrent = updatedDefs.find((d) => d.id === editingDef.id);
      if (updatedCurrent) {
        setEditingDef(updatedCurrent);
      }
    } catch (err: any) {
      console.error("Failed to delete option:", err);
      alert(err?.response?.data?.message || "Failed to delete option.");
    }
  };

  if (!categoryId) {
    return (
      <SectionCard title="Specification Fields">
        <Typography variant="body2" sx={{ color: "#71717a", fontStyle: "italic", py: 1 }}>
          Save the category first to configure custom specification fields (e.g. Engine Capacity, Transmission, Fuel System).
        </Typography>
      </SectionCard>
    );
  }

  return (
    <SectionCard title="Specification Fields Configuration">
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="body2" sx={{ color: "#a1a1aa" }}>
          Define specs required for products under this category.
        </Typography>
        <Button
          variant="contained"
          size="small"
          startIcon={<AddIcon />}
          onClick={handleOpenAddDialog}
          sx={{
            backgroundColor: "#ff6b35",
            color: "#ffffff",
            fontWeight: 650,
            textTransform: "none",
            "&:hover": { backgroundColor: "#e05a2b" },
          }}
        >
          Add Spec Field
        </Button>
      </Box>

      {error && (
        <Typography color="error" variant="body2" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
          <CircularProgress size={28} color="warning" />
        </Box>
      ) : specDefs.length === 0 ? (
        <Paper
          variant="outlined"
          sx={{
            p: 3,
            textAlign: "center",
            backgroundColor: "rgba(255, 255, 255, 0.02)",
            borderColor: "rgba(255, 255, 255, 0.08)",
          }}
        >
          <Typography variant="body2" sx={{ color: "#71717a" }}>
            No specification fields defined for this category yet. Click <strong>"Add Spec Field"</strong> to create fields like <em>Displacement (cc)</em>, <em>Horsepower</em>, or <em>Transmission</em>.
          </Typography>
        </Paper>
      ) : (
        <TableContainer
          component={Paper}
          variant="outlined"
          sx={{
            backgroundColor: "#18181b",
            borderColor: "rgba(255, 255, 255, 0.08)",
          }}
        >
          <Table size="small">
            <TableHead sx={{ backgroundColor: "rgba(255, 255, 255, 0.03)" }}>
              <TableRow>
                <TableCell sx={{ color: "#71717a", fontWeight: 700, fontSize: "0.75rem" }}>#</TableCell>
                <TableCell sx={{ color: "#71717a", fontWeight: 700, fontSize: "0.75rem" }}>DISPLAY NAME</TableCell>
                <TableCell sx={{ color: "#71717a", fontWeight: 700, fontSize: "0.75rem" }}>KEY CODE</TableCell>
                <TableCell sx={{ color: "#71717a", fontWeight: 700, fontSize: "0.75rem" }}>TYPE</TableCell>
                <TableCell sx={{ color: "#71717a", fontWeight: 700, fontSize: "0.75rem" }}>UNIT</TableCell>
                <TableCell sx={{ color: "#71717a", fontWeight: 700, fontSize: "0.75rem" }}>REQ?</TableCell>
                <TableCell sx={{ color: "#71717a", fontWeight: 700, fontSize: "0.75rem" }}>STATUS</TableCell>
                <TableCell align="right" sx={{ color: "#71717a", fontWeight: 700, fontSize: "0.75rem" }}>ACTIONS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {specDefs.map((def, idx) => (
                <TableRow key={def.id} hover sx={{ "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.02)" } }}>
                  <TableCell sx={{ color: "#e4e4e7" }}>{def.displayOrder || idx + 1}</TableCell>
                  <TableCell sx={{ color: "#ffffff", fontWeight: 600 }}>{def.displayName}</TableCell>
                  <TableCell sx={{ color: "#a1a1aa", fontFamily: "monospace", fontSize: "0.8rem" }}>
                    {def.keyCode}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={def.dataType.toUpperCase()}
                      size="small"
                      sx={{
                        fontSize: "0.65rem",
                        fontWeight: 700,
                        backgroundColor:
                          def.dataType === "number"
                            ? "rgba(59, 130, 246, 0.15)"
                            : def.dataType === "select"
                            ? "rgba(168, 85, 247, 0.15)"
                            : "rgba(113, 113, 122, 0.2)",
                        color:
                          def.dataType === "number"
                            ? "#60a5fa"
                            : def.dataType === "select"
                            ? "#c084fc"
                            : "#a1a1aa",
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ color: "#a1a1aa" }}>{def.unit || "-"}</TableCell>
                  <TableCell sx={{ color: def.isRequired ? "#ef4444" : "#71717a" }}>
                    {def.isRequired ? "Yes" : "No"}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={def.isActive ? "Active" : "Disabled"}
                      size="small"
                      sx={{
                        fontSize: "0.65rem",
                        backgroundColor: def.isActive ? "rgba(34, 197, 94, 0.1)" : "rgba(239, 68, 68, 0.1)",
                        color: def.isActive ? "#4ade80" : "#f87171",
                      }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton size="small" onClick={() => handleOpenEditDialog(def)} sx={{ color: "#a1a1aa", "&:hover": { color: "#ffffff" } }}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDeleteDef(def.id)} sx={{ color: "#71717a", "&:hover": { color: "#ef4444" } }}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Add / Edit Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={() => !submitting && setDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: "#18181b",
            color: "#ffffff",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: 2,
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 700, fontSize: "1.1rem" }}>
          {editingDef ? `Edit Spec Field: ${editingDef.displayName}` : "Add New Specification Field"}
        </DialogTitle>
        <DialogContent dividers sx={{ borderColor: "rgba(255, 255, 255, 0.08)" }}>
          {formError && (
            <Typography color="error" variant="body2" sx={{ mb: 2, p: 1.5, borderRadius: 1, backgroundColor: "rgba(239, 68, 68, 0.1)" }}>
              {formError}
            </Typography>
          )}
          <Grid container spacing={2.5} sx={{ pt: 1 }}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                required
                fullWidth
                label="DISPLAY NAME"
                placeholder="e.g. Engine Capacity"
                value={displayName}
                onChange={(e) => handleDisplayNameChange(e.target.value)}
                disabled={submitting}
                sx={{ "& label": { color: "#71717a", fontWeight: 600, fontSize: "0.85rem" } }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                required
                fullWidth
                label="KEY CODE"
                placeholder="e.g. displacement"
                value={keyCode}
                onChange={(e) => {
                  setKeyCode(e.target.value);
                  setIsKeyManuallyEdited(true);
                }}
                helperText="Unique identifier code (e.g. displacement, max_power)"
                disabled={submitting}
                sx={{ "& label": { color: "#71717a", fontWeight: 600, fontSize: "0.85rem" } }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth size="small">
                <InputLabel sx={{ color: "#71717a", fontWeight: 600 }}>DATA TYPE</InputLabel>
                <Select
                  value={dataType}
                  label="DATA TYPE"
                  onChange={(e) => setDataType(e.target.value as SpecDataType)}
                  disabled={submitting}
                  sx={{ color: "#ffffff" }}
                >
                  <MenuItem value="text">Text (Free string)</MenuItem>
                  <MenuItem value="number">Number (Numeric value + Unit)</MenuItem>
                  <MenuItem value="select">Select (Predefined Dropdown)</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="UNIT"
                placeholder="e.g. cc, HP, Nm, L, mm, kg"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                disabled={submitting || dataType !== "number"}
                helperText={dataType === "number" ? "Appended to value (e.g. cc)" : "Only applicable for Number type"}
                sx={{ "& label": { color: "#71717a", fontWeight: 600, fontSize: "0.85rem" } }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                type="number"
                label="DISPLAY ORDER"
                value={displayOrder}
                onChange={(e) => setDisplayOrder(Number(e.target.value))}
                disabled={submitting}
                sx={{ "& label": { color: "#71717a", fontWeight: 600, fontSize: "0.85rem" } }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }} sx={{ display: "flex", alignItems: "center" }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={isRequired}
                    onChange={(e) => setIsRequired(e.target.checked)}
                    disabled={submitting}
                    sx={{ "& .MuiSwitch-switchBase.Mui-checked": { color: "#ff6b35" } }}
                  />
                }
                label="Is Required Field"
                sx={{ color: "#e4e4e7" }}
              />
            </Grid>
            {editingDef && (
              <Grid size={{ xs: 12, sm: 6 }} sx={{ display: "flex", alignItems: "center" }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={isActive}
                      onChange={(e) => setIsActive(e.target.checked)}
                      disabled={submitting}
                      sx={{ "& .MuiSwitch-switchBase.Mui-checked": { color: "#ff6b35" } }}
                    />
                  }
                  label="Active Status"
                  sx={{ color: "#e4e4e7" }}
                />
              </Grid>
            )}

            {/* Select Options Section when type = select */}
            {dataType === "select" && editingDef && (
              <Grid size={{ xs: 12 }}>
                <Divider sx={{ my: 1, borderColor: "rgba(255, 255, 255, 0.08)" }} />
                <Typography variant="subtitle2" sx={{ color: "#ff6b35", fontWeight: 700, mb: 1 }}>
                  Predefined Options (Dropdown Choices)
                </Typography>
                <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                  <TextField
                    size="small"
                    placeholder="New option (e.g. 6-speed Manual)"
                    value={newOptionValue}
                    onChange={(e) => setNewOptionValue(e.target.value)}
                    disabled={addingOption}
                    sx={{ flex: 1 }}
                  />
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={handleAddOption}
                    disabled={addingOption || !newOptionValue.trim()}
                    sx={{ color: "#ffffff", borderColor: "#71717a" }}
                  >
                    {addingOption ? "Adding..." : "Add Option"}
                  </Button>
                </Box>

                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {editingDef.options && editingDef.options.length > 0 ? (
                    editingDef.options.map((opt) => (
                      <Chip
                        key={opt.id}
                        label={opt.optionValue}
                        onDelete={() => handleDeleteOption(opt.id)}
                        sx={{
                          backgroundColor: "rgba(255, 255, 255, 0.08)",
                          color: "#ffffff",
                          "& .MuiChip-deleteIcon": { color: "#71717a", "&:hover": { color: "#ef4444" } },
                        }}
                      />
                    ))
                  ) : (
                    <Typography variant="caption" sx={{ color: "#71717a" }}>
                      No options added yet. Add options above (e.g. 5-speed, 6-speed, DCT).
                    </Typography>
                  )}
                </Box>
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={() => setDialogOpen(false)} disabled={submitting} sx={{ color: "#71717a" }}>
            Cancel
          </Button>
          <Button
            onClick={handleSaveDef}
            disabled={submitting}
            variant="contained"
            sx={{ backgroundColor: "#ff6b35", color: "#ffffff", fontWeight: 700, "&:hover": { backgroundColor: "#e05a2b" } }}
          >
            {submitting ? "Saving..." : editingDef ? "Save Changes" : "Create Spec Field"}
          </Button>
        </DialogActions>
      </Dialog>
    </SectionCard>
  );
};

export default SpecDefinitionManager;
