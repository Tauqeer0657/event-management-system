// Header.js
import React from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import logo from "../assets/logo/OWM_White.png";

// Define the drawer width
const drawerWidth = 200;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function Header2() {
  return (
    <AppBar position="fixed"  style={{ background: "#222b48" }}>
      <Toolbar
        style={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <img src={logo} alt="logo" height='66px' style={{ backgroundSize:"140px auto"}}/>
        <div style={{height:"40px", width:"40px" , background:"white", borderRadius:"50%"}}>

        </div>
      </Toolbar>
    </AppBar>
  );
}
