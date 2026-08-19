import { useState } from "react";
import {
  Box,
  Typography,
  Grid,
} from "@mui/material";
import { Product } from "@/types/product.ts";
import { ProductSpecification } from "@/types/specDefinition.ts";

interface TabbedDetailsProps {
  product: Product;
}

const formatSpecValue = (spec: ProductSpecification): string => {
  if (spec.dataType === "select" && spec.optionValue) {
    return spec.optionValue;
  }
  if (spec.dataType === "number" && spec.valueNumber !== undefined && spec.valueNumber !== null) {
    const formattedNum = Number.isInteger(spec.valueNumber)
      ? String(spec.valueNumber)
      : String(Number(spec.valueNumber));
    return spec.unit ? `${formattedNum} ${spec.unit}` : formattedNum;
  }
  if (spec.value) {
    return spec.value;
  }
  return "-";
};

const TabbedDetails = ({ product }: TabbedDetailsProps) => {
  const [activeTab, setActiveTab] = useState<"specs" | "desc">("specs");
  const specifications = product.specifications || [];

  return (
    <Box sx={{ width: "100%", mt: 6 }}>
      {/* Tabs Title Bar */}
      <Box sx={{ display: "flex", gap: 4, borderBottom: "1px solid rgba(255, 255, 255, 0.05)", mb: 4 }}>
        {[
          { id: "specs", label: "Specifications" },
          { id: "desc", label: "Description" },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <Box
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              sx={{
                pb: 2,
                cursor: "pointer",
                position: "relative",
                transition: "all 0.15s",
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 700,
                  color: isActive ? "#e28a3a" : "rgba(255, 255, 255, 0.4)",
                  "&:hover": { color: isActive ? "#e28a3a" : "white" },
                }}
              >
                {tab.label}
              </Typography>
              {isActive && (
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    height: "2px",
                    backgroundColor: "#e28a3a",
                  }}
                />
              )}
            </Box>
          );
        })}
      </Box>

      {/* Tabs Content */}
      <Box>
        {/* Specifications Tab Panel */}
        {activeTab === "specs" && (
          <Box
            sx={{
              backgroundColor: "#121214",
              border: "1px solid rgba(255, 255, 255, 0.05)",
              borderRadius: "16px",
              p: 4,
            }}
          >
            {specifications.length === 0 ? (
              <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.4)", fontStyle: "italic" }}>
                No technical specifications available for this model yet.
              </Typography>
            ) : (
              <Grid container spacing={3}>
                {specifications.map((spec, index) => (
                  <Grid key={spec.id || index} size={{ xs: 12, sm: 6 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        pb: 1.5,
                        borderBottom: "1px solid rgba(255, 255, 255, 0.04)",
                      }}
                    >
                      <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.4)", fontWeight: 500 }}>
                        {spec.displayName}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "white", fontWeight: 700, textAlign: "right" }}>
                        {formatSpecValue(spec)}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        )}

        {/* Description Tab Panel */}
        {activeTab === "desc" && (
          <Box
            sx={{
              backgroundColor: "#121214",
              border: "1px solid rgba(255, 255, 255, 0.05)",
              borderRadius: "16px",
              p: 4,
            }}
          >
            <Typography variant="body1" sx={{ color: "rgba(255, 255, 255, 0.8)", lineHeight: 1.8 }}>
              {product.description || "Detailed descriptive info is not available for this model. Enjoy the exceptional craftsmanship, cutting-edge specifications and riding performance that it brings to the street."}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default TabbedDetails;
