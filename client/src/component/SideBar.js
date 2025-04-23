import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Header from "./Header";
import { useNavigate, useLocation } from "react-router-dom";
import { menuItems } from "./menuItems"; // Import the menuItems
import logo from "../assets/logo/OWM_Final.png";

const drawerWidth = 200;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  background: "white",
  color: "white",
  fontFamily: "sans-serif",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  background: "white",
  color: "white",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0),
  ...theme.mixins.toolbar,
  backgroundImage: `url(${logo})`,
  backgroundSize: "60px auto",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  position: "sticky", 
  top: 0,
  zIndex: 1000,
  backgroundColor: "white",
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function SideBar() {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [submenuOpen, setSubmenuOpen] = useState({}); 
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleToggleSubMenu = (index) => {
    setSubmenuOpen((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  const renderMenuItems = (items, parentIndex = "") =>
    items.map((item, index) => {
      const key = `${parentIndex}-${index}`;
      const hasSubmenu = !!item.submenu;

      return (
        <div key={key}>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={() => (hasSubmenu ? handleToggleSubMenu(key) : handleNavigate(item.path))}
              sx={{
                minHeight: 45,
                justifyContent: open ? "initial" : "center",
                px: 1,
                mt: 1,
                borderBottom: "1px solid #ccc",
                color: "#222b48",
                ...(location.pathname === item.path && {
                  background: "#222b48",
                  color: "white",
                }),
                ":hover": {
                  background: "#045e8477",
                  color: "white",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 1 : "auto",
                  justifyContent: "center",
                  color: "#222b48",
                  ...(location.pathname === item.path && {
                    color: "white",
                  }),
                  ":hover": {
                    color: "white",
                  },
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={
                  <div
                    style={{
                      fontSize: "12px",
                      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                    }}
                  >
                    {item.text}
                  </div>
                }
                sx={{ opacity: open ? 1 : 0 }}
              />
              {hasSubmenu &&
                (submenuOpen[key] ? (
                  <ExpandLessIcon />
                ) : (
                  <ExpandMoreIcon />
                ))}
            </ListItemButton>
          </ListItem>
          {hasSubmenu && submenuOpen[key] && (
            <List sx={{ pl: 2 }}>{renderMenuItems(item.submenu, key)}</List>
          )}
        </div>
      );
    });

  return (
    <Box sx={{ display: "flex",  }}>
      <CssBaseline />
      <Header open={open} handleDrawerOpen={handleDrawerOpen} />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose} style={{ color: "#045e84" }}>
            {theme.direction === "rtl" ? <MenuIcon /> : <MenuIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>{renderMenuItems(menuItems)}</List>
      </Drawer>
    </Box>
  );
}
