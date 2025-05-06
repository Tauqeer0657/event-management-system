import DashboardIcon from "@mui/icons-material/Dashboard";
import LayersIcon from "@mui/icons-material/Layers";
import QrCode2Icon from "@mui/icons-material/QrCode2";      // QR-Generate
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner"; // QR-Scan
import InventoryIcon from "@mui/icons-material/Inventory";  // Product
import EventIcon from "@mui/icons-material/Event";          // Event

export const menuItems = [
  {
    text: "Menu",
    icon: <LayersIcon sx={{ fontSize: "20px" }} />,
    path: "",
    submenu: [
      {
        text: "Event",
        path: "",
        icon: <EventIcon sx={{ fontSize: "20px" }} />,
        submenu: [
          { text: "QR-Generate", path: "/qrGenerate", icon: <QrCode2Icon sx={{ fontSize: "18px" }} /> },
          { text: "QR-Scan", path: "/qrShow", icon: <QrCodeScannerIcon sx={{ fontSize: "18px" }} /> },
          { text: "Event-Pass", path: "/event", icon: <InventoryIcon sx={{ fontSize: "18px" }} /> },
        ],
      },
    ],
  },
];
