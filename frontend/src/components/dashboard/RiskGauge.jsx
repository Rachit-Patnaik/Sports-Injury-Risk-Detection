import { Box, Typography, useTheme } from "@mui/material";

function getRiskLevel(value, theme) {
  if (value <= 25) {
    return { label: "Low", color: theme.palette.success.main };
  }
  if (value <= 50) {
    return { label: "Moderate", color: theme.palette.warning.main };
  }
  if (value <= 75) {
    return { label: "High", color: theme.palette.error.main };
  }
  return { label: "Critical", color: theme.palette.error.dark };
}

export default function RiskGauge({ value = 0, label = "Risk Score" }) {
  const theme = useTheme();

  const clampedValue = Math.min(Math.max(value, 0), 100);
  const { label: riskLabel, color } = getRiskLevel(clampedValue, theme);

  const viewBoxSize = 120;
  const strokeWidth = 12;
  const radius = (viewBoxSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clampedValue / 100) * circumference;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          maxWidth: 160,
          aspectRatio: "1 / 1",
        }}
      >
        <svg
          viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
          style={{ width: "100%", height: "100%", transform: "rotate(-90deg)" }}
        >
          <circle
            cx={viewBoxSize / 2}
            cy={viewBoxSize / 2}
            r={radius}
            fill="none"
            stroke={theme.palette.divider}
            strokeWidth={strokeWidth}
          />
          <circle
            cx={viewBoxSize / 2}
            cy={viewBoxSize / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 0.6s ease" }}
          />
        </svg>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 700, lineHeight: 1 }}>
            {clampedValue}%
          </Typography>
          <Typography
            variant="caption"
            sx={{ fontWeight: 600, color, mt: 0.5 }}
          >
            {riskLabel}
          </Typography>
        </Box>
      </Box>
      <Typography variant="body2" sx={{ color: "text.secondary", mt: 1.5 }}>
        {label}
      </Typography>
    </Box>
  );
}