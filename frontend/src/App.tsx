import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#e28a3a", // Gold/Amber accent color
      contrastText: "#000000",
    },
    secondary: {
      main: "#a1a1aa", // Muted slate gray
    },
    background: {
      default: "#09090b", // Deep dark background
      paper: "#121215", // Sleek dark surface background
    },
    text: {
      primary: "#ffffff",
      secondary: "#a1a1aa", // Zinc 400
    },
  },
  typography: {
    fontFamily: '"Outfit", "Inter", "Segoe UI", "Roboto", sans-serif',
    h1: {
      fontWeight: 900,
      letterSpacing: "-0.03em",
    },
    h2: {
      fontWeight: 800,
      letterSpacing: "-0.02em",
    },
    h4: {
      fontWeight: 700,
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#09090b",
          color: "#ffffff",
          fontFamily: '"Outfit", "Inter", "Segoe UI", sans-serif',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: "rgba(9, 9, 11, 0.8)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
