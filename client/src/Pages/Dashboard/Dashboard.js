import React, { useState } from "react";
import Box from "@mui/material/Box";
import SideBar from "../../component/SideBar";
import "./Dashboard.css";
import Mainpage from "./Mainpage";
import RightSidebar from "./RightSidebar";

export const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const sidebarWidth = isSidebarOpen ? 200 : 0; 
  const rightSidebarWidth = 250; 

  return (
    <Box sx={{ display: "flex", width: "100vw", overflow: "hidden" }}>
      {/* Left Sidebar */}
      {isSidebarOpen && (
        <SideBar
          sx={{
            width: sidebarWidth,
            flexShrink: 0,
          }}
        />
      )}

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
          marginTop: "55px",
          width: `calc(100vw - ${sidebarWidth + rightSidebarWidth}px)`,
          minHeight: "94vh",
          height: "100%",
          background: "white",
          overflowX: "auto", // Add horizontal scrolling for larger content
          transition: "width 0.3s ease", // Smooth transition when toggling sidebar
        }}
      >
        <Box
          sx={{
            maxWidth: "100%", // Max width to prevent content overflow
            flexGrow: 1,
            marginRight: `${rightSidebarWidth}px`, // Keep space for the right sidebar
            overflow: "hidden", // Ensure content doesn't overflow into the right sidebar
          }}
        >
          <Mainpage />
        </Box>
      </Box>

      {/* Right Sidebar (Fixed Position) */}
      <Box
        sx={{
          width: rightSidebarWidth,
          position: "fixed",
          right: 0,
          top: "55px",
          padding:"10px",
          height: "calc(100vh - 55px)", // Ensure the height covers the full viewport minus the header
          backgroundColor: "#FEF9F2", // For visual indication (can be removed or styled differently)
          overflowY: "auto", // Add vertical scrolling if needed
        }}
      >
        <RightSidebar />
      </Box>
    </Box>
  );
};
