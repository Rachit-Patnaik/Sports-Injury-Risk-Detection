import {
  Dashboard,
  UploadFile,
  Insights,
  Description,
  Logout,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const menuItems = [
  {
    text: "Dashboard",
    icon: <Dashboard />,
    path: "/dashboard",
  },
  {
    text: "Upload",
    icon: <UploadFile />,
    path: "/upload",
  },
  {
    text: "Insights",
    icon: <Insights />,
    path: "/insights",
  },
  {
    text: "Reports",
    icon: <Description />,
    path: "/reports",
  },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Box
      sx={{
        width: 260,
        height: "100vh",
        bgcolor: "#fff",
        borderRight: "1px solid #e5e7eb",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Logo */}
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" fontWeight={700}>
          Sports AI
        </Typography>
      </Box>

      <Divider />

      {/* User */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          p: 2,
        }}
      >
        <Avatar>
          {user?.name?.charAt(0).toUpperCase() || "A"}
        </Avatar>

        <Box>
          <Typography fontWeight={600}>
            {user?.name || "Admin"}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            {user?.role || "Coach"}
          </Typography>
        </Box>
      </Box>

      <Divider />

      {/* Navigation */}
      <List sx={{ flexGrow: 1, px: 1 }}>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.text}
            component={NavLink}
            to={item.path}
            sx={{
              borderRadius: 2,
              mb: 1,
              "&.active": {
                bgcolor: "primary.main",
                color: "#fff",
              },
              "&.active .MuiListItemIcon-root": {
                color: "#fff",
              },
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>

            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>

      <Divider />

      {/* Logout */}
      <Box sx={{ p: 2 }}>
        <ListItemButton
          onClick={handleLogout}
          sx={{ borderRadius: 2 }}
        >
          <ListItemIcon>
            <Logout />
          </ListItemIcon>

          <ListItemText primary="Logout" />
        </ListItemButton>
      </Box>
    </Box>
  );
}