import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#2563EB",
      light: "#3B82F6",
      dark: "#1D4ED8",
      contrastText: "#FFFFFF",
    },
    success: {
      main: "#22C55E",
      contrastText: "#FFFFFF",
    },
    warning: {
      main: "#F59E0B",
      contrastText: "#FFFFFF",
    },
    error: {
      main: "#EF4444",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#F4F7FB",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#111827",
      secondary: "#6B7280",
    },
    divider: "#EEF1F6",
  },
  shape: {
    borderRadius: 16,
  },
  spacing: 8,
  typography: {
    fontFamily: [
      "Inter",
      "-apple-system",
      "BlinkMacSystemFont",
      "Segoe UI",
      "Roboto",
      "sans-serif",
    ].join(","),
    h1: { fontWeight: 700, color: "#111827" },
    h2: { fontWeight: 700, color: "#111827" },
    h3: { fontWeight: 700, color: "#111827" },
    h4: { fontWeight: 600, color: "#111827" },
    h5: { fontWeight: 600, color: "#111827" },
    h6: { fontWeight: 600, color: "#111827" },
    subtitle1: { fontWeight: 600, color: "#111827" },
    subtitle2: { fontWeight: 500, color: "#374151" },
    body1: { color: "#111827" },
    body2: { color: "#374151" },
    button: { fontWeight: 600, textTransform: "none" },
    caption: { color: "#6B7280" },
  },
  shadows: [
    "none",
    "0px 1px 2px rgba(16, 24, 40, 0.06)",
    "0px 2px 4px rgba(16, 24, 40, 0.06)",
    "0px 4px 8px rgba(16, 24, 40, 0.08)",
    "0px 6px 12px rgba(16, 24, 40, 0.08)",
    "0px 8px 16px rgba(16, 24, 40, 0.10)",
    "0px 8px 16px rgba(16, 24, 40, 0.10)",
    "0px 8px 16px rgba(16, 24, 40, 0.10)",
    "0px 8px 16px rgba(16, 24, 40, 0.10)",
    "0px 8px 16px rgba(16, 24, 40, 0.10)",
    "0px 8px 16px rgba(16, 24, 40, 0.10)",
    "0px 8px 16px rgba(16, 24, 40, 0.10)",
    "0px 8px 16px rgba(16, 24, 40, 0.10)",
    "0px 8px 16px rgba(16, 24, 40, 0.10)",
    "0px 8px 16px rgba(16, 24, 40, 0.10)",
    "0px 8px 16px rgba(16, 24, 40, 0.10)",
    "0px 8px 16px rgba(16, 24, 40, 0.10)",
    "0px 8px 16px rgba(16, 24, 40, 0.10)",
    "0px 8px 16px rgba(16, 24, 40, 0.10)",
    "0px 8px 16px rgba(16, 24, 40, 0.10)",
    "0px 8px 16px rgba(16, 24, 40, 0.10)",
    "0px 8px 16px rgba(16, 24, 40, 0.10)",
    "0px 8px 16px rgba(16, 24, 40, 0.10)",
    "0px 8px 16px rgba(16, 24, 40, 0.10)",
    "0px 8px 16px rgba(16, 24, 40, 0.10)",
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#F4F7FB",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0px 2px 4px rgba(16, 24, 40, 0.06)",
          border: "1px solid #EEF1F6",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: "8px 20px",
        },
        containedPrimary: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
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
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: "1px solid #EEF1F6",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          color: "#111827",
          boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.06)",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: 12,
          fontWeight: 500,
          backgroundColor: "#111827",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 600,
          color: "#6B7280",
          backgroundColor: "#F9FAFB",
          fontSize: 13,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: "small",
      },
    },
  },
});

export default theme;