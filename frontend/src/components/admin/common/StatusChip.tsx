import { Chip } from "@mui/material";

export type StatusType =
  | "completed"
  | "processing"
  | "shipped"
  | "cancelled"
  | "published"
  | "draft"
  | string;

interface StatusChipProps {
  status: StatusType;
}

const StatusChip = ({ status }: StatusChipProps) => {
  const normalized = status.toLowerCase();

  let colorSetting = {
    bg: "rgba(113, 113, 122, 0.08)",
    text: "#a1a1aa",
    border: "rgba(113, 113, 122, 0.15)",
  };

  switch (normalized) {
    case "completed":
    case "published":
      colorSetting = {
        bg: "rgba(34, 197, 94, 0.08)",
        text: "#22c55e",
        border: "rgba(34, 197, 94, 0.15)",
      };
      break;
    case "processing":
      colorSetting = {
        bg: "rgba(59, 130, 246, 0.08)",
        text: "#3b82f6",
        border: "rgba(59, 130, 246, 0.15)",
      };
      break;
    case "shipped":
      colorSetting = {
        bg: "rgba(168, 85, 247, 0.08)",
        text: "#a855f7",
        border: "rgba(168, 85, 247, 0.15)",
      };
      break;
    case "cancelled":
      colorSetting = {
        bg: "rgba(239, 68, 68, 0.08)",
        text: "#ef4444",
        border: "rgba(239, 68, 68, 0.15)",
      };
      break;
    case "draft":
      colorSetting = {
        bg: "rgba(245, 158, 11, 0.08)", // golden/amber
        text: "#f59e0b",
        border: "rgba(245, 158, 11, 0.15)",
      };
      break;
  }

  return (
    <Chip
      label={status}
      variant="outlined"
      size="small"
      sx={{
        backgroundColor: colorSetting.bg,
        color: colorSetting.text,
        borderColor: colorSetting.border,
        fontWeight: 600,
        textTransform: "lowercase",
        fontSize: "0.75rem",
        height: 24,
        borderRadius: 1.5,
        "& .MuiChip-label": {
          px: 1,
        },
      }}
    />
  );
};

export default StatusChip;
