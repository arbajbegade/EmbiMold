import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Badge } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { resetSessionStorageAndRedirect } from "../../services/apiFetch";

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [notifAnchorEl, setNotifAnchorEl] = React.useState(null);
  const [notifications, setNotifications] = React.useState([
    "New message from admin",
    "Server maintenance at 10 PM",
    "New update available",
  ]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleNotifOpen = (event) => {
    setNotifAnchorEl(event.currentTarget);
  };

  const handleNotifClose = () => {
    setNotifAnchorEl(null);
  };

  return (
    <AppBar position="static" style={{ backgroundColor: "white" }}>
      <Toolbar>
        <IconButton
          onClick={toggleSidebar}
          aria-label="menu"
          size="large"
          edge="start"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, color: "#1d0d4b", fontWeight: "bold" }}
        >
          EmbiMold
        </Typography>

        {/* Notifications Icon */}
        <IconButton
          size="large"
          aria-label="show notifications"
          aria-haspopup="true"
          onClick={handleNotifOpen}
          sx={{ color: "#282560", mr: 2 }}
        >
          <Badge badgeContent={notifications.length} color="error">
            <NotificationsIcon sx={{ width: "30px", height: "30px" }} />
          </Badge>
        </IconButton>
        <Menu
          anchorEl={notifAnchorEl}
          open={Boolean(notifAnchorEl)}
          onClose={handleNotifClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          {notifications.length > 0 ? (
            notifications.map((notif, index) => (
              <MenuItem key={index} onClick={handleNotifClose}>
                {notif}
              </MenuItem>
            ))
          ) : (
            <MenuItem onClick={handleNotifClose}>No new notifications</MenuItem>
          )}
        </Menu>

        {/* Profile Icon */}
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          sx={{ color: "#282560" }}
          onClick={handleMenu}
        >
          <AccountCircle sx={{ width: "36px", height: "36px" }} />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          keepMounted
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={resetSessionStorageAndRedirect}>Log Out</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
