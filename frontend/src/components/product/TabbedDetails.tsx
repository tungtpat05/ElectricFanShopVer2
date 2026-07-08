import { useState } from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Product } from "@/types/product.ts";

interface TabbedDetailsProps {
  product: Product;
}

const TabbedDetails = ({ product }: TabbedDetailsProps) => {
  const [activeTab, setActiveTab] = useState<"specs" | "features" | "desc">("specs");
  const [expandedAccordion, setExpandedAccordion] = useState<string | false>("specs-engine");

  const handleAccordionChange =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpandedAccordion(isExpanded ? panel : false);
    };

  const ccVal = product.engineCapacity || 649;
  const hpVal = Math.round(ccVal * 0.146) || 95;
  const torqueVal = Math.round(ccVal * 0.098) || 64;

  const engineSpecsTable = [
    { name: "Engine Type", value: "Liquid-cooled, DOHC Inline-4, 16 valves" },
    { name: "Displacement", value: `${ccVal}cc` },
    { name: "Bore × Stroke", value: "67.0mm × 46.0mm" },
    { name: "Compression Ratio", value: "11.0:1" },
    { name: "Maximum Power", value: `${hpVal} HP @ 12,000 rpm` },
    { name: "Maximum Torque", value: `${torqueVal} Nm @ 8,500 rpm` },
    { name: "Fuel System", value: "PGM-FI, 32mm throttle body" },
    { name: "Cooling", value: "Liquid-cooled" },
    { name: "Starter", value: "Electric" },
    { name: "Exhaust", value: "4-into-2-into-1, catalytic converter" },
  ];

  const chassisSpecsTable = [
    { name: "Frame Type", value: "Steel diamond" },
    { name: "Rake (Caster Angle)", value: "25.0°" },
    { name: "Trail", value: "101 mm" },
    { name: "Front Wheels", value: "17-inch Y-spoke cast aluminum" },
    { name: "Rear Wheels", value: "17-inch Y-spoke cast aluminum" },
  ];

  const suspensionSpecsTable = [
    { name: "Front Suspension", value: "Showa 41mm Separate Function Front Fork Big Piston (SFF-BP)" },
    { name: "Rear Suspension", value: "Single shock with 7-position spring preload adjustability" },
  ];

  const brakesSpecsTable = [
    { name: "Front Brakes", value: "Dual radial-mount four-piston calipers, 310mm floating discs" },
    { name: "Rear Brakes", value: "Single-caliper, 240mm disc; ABS standard" },
  ];

  const wheelsSpecsTable = [
    { name: "Front Tire", value: "120/70-ZR17 radial" },
    { name: "Rear Tire", value: "180/55-ZR17 radial" },
  ];

  const electronicsSpecsTable = [
    { name: "Riding Modes", value: "3 modes (Sport/Standard/Rain)" },
    { name: "Traction Control", value: "Honda Selectable Torque Control (HSTC)" },
    { name: "Connectivity", value: "Honda RoadSync Bluetooth module" },
  ];

  const featuresList = [
    `${product.brand?.brandName || "Honda"} Selectable Torque Control (HSTC) — 3 levels`,
    "Dual-channel cornering-sensitive ABS",
    "3 riding modes: Sport / Standard / Rain",
    "5-inch full-colour TFT display",
    `${product.brand?.brandName || "Honda"} RoadSync Bluetooth connectivity`,
    "Showa SFF-BP 41mm premium inverted forks",
    "4-piston radial-mount Nissin brake calipers",
    "Slipper & assist clutch mechanism",
    "Full LED lighting package",
    "USB-C charging port (under seat)",
    "Neo Sports Café design language",
    "Quick-shifter compatible (accessory)",
  ];

  const renderSpecsTable = (specs: { name: string; value: string }[]) => (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, py: 1 }}>
      {specs.map((item, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            pb: 1.5,
            borderBottom: "1px solid rgba(255, 255, 255, 0.03)",
            "&:last-child": { borderBottom: "none", pb: 0 },
          }}
        >
          <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.4)", fontWeight: 500 }}>
            {item.name}
          </Typography>
          <Typography variant="body2" sx={{ color: "white", fontWeight: 700, textAlign: "right" }}>
            {item.value}
          </Typography>
        </Box>
      ))}
    </Box>
  );

  return (
    <Box sx={{ width: "100%", mt: 6 }}>
      {/* Tabs Title Bar */}
      <Box sx={{ display: "flex", gap: 4, borderBottom: "1px solid rgba(255, 255, 255, 0.05)", mb: 4 }}>
        {[
          { id: "specs", label: "Specifications" },
          { id: "features", label: "Features" },
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
          <Grid container spacing={3}>
            {/* Left Specification Column */}
            <Grid size={{ xs: 12, md: 6 }} sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
              <Accordion
                expanded={expandedAccordion === "specs-engine"}
                onChange={handleAccordionChange("specs-engine")}
                sx={{
                  backgroundColor: "#121214",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                  borderRadius: "12px !",
                  "&:before": { display: "none" },
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "rgba(255,255,255,0.4)" }} />}>
                  <Typography variant="body2" sx={{ fontWeight: 800, color: "#e28a3a", letterSpacing: "0.1em" }}>
                    ENGINE
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 3, pb: 3 }}>
                  {renderSpecsTable(engineSpecsTable)}
                </AccordionDetails>
              </Accordion>

              <Accordion
                expanded={expandedAccordion === "specs-suspension"}
                onChange={handleAccordionChange("specs-suspension")}
                sx={{
                  backgroundColor: "#121214",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                  borderRadius: "12px !",
                  "&:before": { display: "none" },
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "rgba(255,255,255,0.4)" }} />}>
                  <Typography variant="body2" sx={{ fontWeight: 800, color: "#e28a3a", letterSpacing: "0.1em" }}>
                    SUSPENSION
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 3, pb: 3 }}>
                  {renderSpecsTable(suspensionSpecsTable)}
                </AccordionDetails>
              </Accordion>

              <Accordion
                expanded={expandedAccordion === "specs-wheels"}
                onChange={handleAccordionChange("specs-wheels")}
                sx={{
                  backgroundColor: "#121214",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                  borderRadius: "12px !",
                  "&:before": { display: "none" },
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "rgba(255,255,255,0.4)" }} />}>
                  <Typography variant="body2" sx={{ fontWeight: 800, color: "#e28a3a", letterSpacing: "0.1em" }}>
                    WHEELS
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 3, pb: 3 }}>
                  {renderSpecsTable(wheelsSpecsTable)}
                </AccordionDetails>
              </Accordion>
            </Grid>

            {/* Right Specification Column */}
            <Grid size={{ xs: 12, md: 6 }} sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
              <Accordion
                expanded={expandedAccordion === "specs-chassis"}
                onChange={handleAccordionChange("specs-chassis")}
                sx={{
                  backgroundColor: "#121214",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                  borderRadius: "12px !",
                  "&:before": { display: "none" },
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "rgba(255,255,255,0.4)" }} />}>
                  <Typography variant="body2" sx={{ fontWeight: 800, color: "#e28a3a", letterSpacing: "0.1em" }}>
                    CHASSIS
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 3, pb: 3 }}>
                  {renderSpecsTable(chassisSpecsTable)}
                </AccordionDetails>
              </Accordion>

              <Accordion
                expanded={expandedAccordion === "specs-brakes"}
                onChange={handleAccordionChange("specs-brakes")}
                sx={{
                  backgroundColor: "#121214",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                  borderRadius: "12px !",
                  "&:before": { display: "none" },
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "rgba(255,255,255,0.4)" }} />}>
                  <Typography variant="body2" sx={{ fontWeight: 800, color: "#e28a3a", letterSpacing: "0.1em" }}>
                    BRAKES
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 3, pb: 3 }}>
                  {renderSpecsTable(brakesSpecsTable)}
                </AccordionDetails>
              </Accordion>

              <Accordion
                expanded={expandedAccordion === "specs-electronics"}
                onChange={handleAccordionChange("specs-electronics")}
                sx={{
                  backgroundColor: "#121214",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                  borderRadius: "12px !",
                  "&:before": { display: "none" },
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "rgba(255,255,255,0.4)" }} />}>
                  <Typography variant="body2" sx={{ fontWeight: 800, color: "#e28a3a", letterSpacing: "0.1em" }}>
                    ELECTRONICS
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 3, pb: 3 }}>
                  {renderSpecsTable(electronicsSpecsTable)}
                </AccordionDetails>
              </Accordion>
            </Grid>
          </Grid>
        )}

        {/* Features Tab Panel */}
        {activeTab === "features" && (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
              gap: 2.5,
            }}
          >
            {featuresList.map((feature, i) => (
              <Box
                key={i}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  backgroundColor: "#121214",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                  borderRadius: "12px",
                  p: 2.5,
                  transition: "all 0.15s",
                  "&:hover": {
                    borderColor: "rgba(226, 138, 58, 0.3)",
                  },
                }}
              >
                <CheckCircleIcon sx={{ color: "#e28a3a", fontSize: "1.2rem", flexShrink: 0 }} />
                <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.85)", fontWeight: 600, fontSize: "0.85rem" }}>
                  {feature}
                </Typography>
              </Box>
            ))}
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
              {product.description || "Detailed descriptive info is not available for this motorcycle model. Enjoy the exceptional craftsmanship, cutting-edge specifications and riding performance that it brings to the street."}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default TabbedDetails;
