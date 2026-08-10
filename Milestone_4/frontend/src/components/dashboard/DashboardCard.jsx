import { Box, Card, Typography } from "@mui/material";

export default function DashboardCard({ title, action, children, sx }) {
  return (
    <Card sx={{ p: 3, height: "100%", ...sx }}>
      {(title || action) && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: title ? 2 : 0,
          }}
        >
          {title && (
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {title}
            </Typography>
          )}
          {action}
        </Box>
      )}
      {children}
    </Card>
  );
}