import React from "react";
import ReactDOM from "react-dom/client";
import { AnalysisProvider } from "./context/AnalysisContext";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";

import App from "./App";
import theme from "./theme/theme";
import { AuthProvider } from "./context/AuthContext";

import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
  <AnalysisProvider>
    <App />
  </AnalysisProvider>
</AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);