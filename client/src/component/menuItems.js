
import DashboardIcon from "@mui/icons-material/Dashboard";
import LayersIcon from "@mui/icons-material/Layers";

import CommuteIcon from "@mui/icons-material/Commute";
import ApartmentIcon from "@mui/icons-material/Apartment";


export const menuItems = [
  {
    text: "DASHBOARD",
    icon: <DashboardIcon sx={{ fontSize: "20px" }} />,
    path: "/dashboard",
  },
  {
    text: "MASTER",
    icon: <LayersIcon sx={{ fontSize: "20px" }} />, 
    path: "",
    submenu: [
      {
        text: "Event",
        path: "",
        icon: <ApartmentIcon sx={{ fontSize: "20px" }} />, 
        submenu: [
          { text: "QR-Genrate", path: "/qrgenrate", icon: <CommuteIcon sx={{ fontSize: "18px" }} /> },
          { text: "QR-Scan", path: "/qrshow", icon: <CommuteIcon sx={{ fontSize: "18px" }} /> },
         
        ],
      },
    ],
  },
];
