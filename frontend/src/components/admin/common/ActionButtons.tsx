import { Box, IconButton } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface ActionButtonsProps {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

const ActionButtons = ({ onView, onEdit, onDelete }: ActionButtonsProps) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
      {onView && (
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            onView();
          }}
          sx={{
            color: "#a1a1aa",
            "&:hover": { color: "#ffffff" },
          }}
        >
          <RemoveRedEyeIcon fontSize="small" />
        </IconButton>
      )}
      {onEdit && (
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          sx={{
            color: "#a1a1aa",
            "&:hover": { color: "#e28a3a" },
          }}
        >
          <EditIcon fontSize="small" />
        </IconButton>
      )}
      {onDelete && (
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          sx={{
            color: "#a1a1aa",
            "&:hover": { color: "#ef4444" },
          }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      )}
    </Box>
  );
};

export default ActionButtons;
