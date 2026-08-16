import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  Chip,
} from "@mui/material";

import { useAuth } from "../../context/AuthContext";

export default function Topbar() {
  const { user } = useAuth();

  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={0}
      sx={{
        borderBottom: 1,
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h5"
          fontWeight={700}
          color="text.primary"
        >
          Sports Injury Risk Detection
        </Typography>

        <Box
          display="flex"
          alignItems="center"
          gap={2}
        >
          <Chip
            label="Online"
            color="success"
            size="small"
          />

          <Typography
            variant="body2"
            color="text.secondary"
          >
            {user?.name || "Guest"}
          </Typography>

          <Avatar sx={{ bgcolor: "primary.main" }}>
            {(user?.name || "G")[0].toUpperCase()}
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
}