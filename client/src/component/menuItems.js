
import DashboardIcon from "@mui/icons-material/Dashboard";
import LayersIcon from "@mui/icons-material/Layers";

import CommuteIcon from "@mui/icons-material/Commute";
import ApartmentIcon from "@mui/icons-material/Apartment";


export const menuItems = [
 
  {
    text: "Menu",
    icon: <LayersIcon sx={{ fontSize: "20px" }} />, 
    path: "",
    submenu: [
      {
        text: "Event",
        path: "",
        icon: <ApartmentIcon sx={{ fontSize: "20px" }} />, 
        submenu: [
          { text: "QR-Generate", path: "/qrGenerate", icon: <CommuteIcon sx={{ fontSize: "18px" }} /> },
          { text: "QR-Scan", path: "/qrShow", icon: <CommuteIcon sx={{ fontSize: "18px" }} /> },
         
        ],
      },
    ],
  },
];
