// import React, { useEffect, useState } from "react";
// import {
//   Container,
//   Row,
//   Col,
//   Form,
//   Button,
//   Spinner,
//   Alert,
// } from "react-bootstrap";
// import SideBar from "../../component/SideBar";
// import axios from "axios";

// const QRScanner = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const sidebarWidth = isSidebarOpen ? 200 : 0;
//   const rightSidebarWidth = 250;




//   return (
//     <Container
//       fluid
//       style={{
//         display: "flex",

//         width: "100vw",
//         overflow: "hidden",
//         padding: 0,

//       }}
//     >
//       {isSidebarOpen && (
//         <SideBar key="sidebar" sx={{ width: sidebarWidth, flexShrink: 0 }} />
//       )}

//       <div
//         style={{
//           flexGrow: 1,
//           padding: "16px",
//           marginTop: "55px",
//           width: `calc(100vw - ${sidebarWidth + rightSidebarWidth}px)`,
//           minHeight: "calc(100vh - 60px)",
//           height: "100%",
//           background: "white",
//           overflowX: "auto",
//           transition: "width 0.3s ease",
//         }}
//       >
//         <Row className="mt-2" style={headerStyle}>
//           <Col className="d-flex align-items-center">
//             <h3 className="mb-0" style={headerTextStyle}>
//               Event-management Qr-Scan
//             </h3>
//           </Col>
//         </Row>


//         <Row className="mt-2" style={containerStyle}>

//           ddd


//         </Row>
//       </div>


//     </Container>
//   );
// };

// export default QRScanner;

// // Styles
// const headerStyle = {
//   height: "50px",
//   backgroundColor: "#e9ecef",
//   borderBottom: "2px solid #ced4da",
//   margin: "0px",
// };

// const containerStyle = {
//   height: "500px",
//   backgroundColor: "#e9ecef",
//   borderBottom: "2px solid #ced4da",
//   margin: "0px",
// };






// const headerTextStyle = {
//   fontSize: "14px",
//   textTransform: "uppercase",
//   fontWeight: "600",
//   color: "#003c78",
// };






// import React, { useState, useRef, useCallback } from 'react';
// import {
//   Container,
//   Card,
//   CardContent,
//   Grid,
//   TextField,
//   Button,
//   Typography,
// } from '@mui/material';
// import { styled } from '@mui/system';

// import QRCode from 'qrcode';
// import {QrReader} from 'react-qr-reader';
// import SideBar from "../../component/SideBar";


// // ---------- styled helpers ----------
// const PREFIX = 'QrDemo';
// const classes = {
//   container: `${PREFIX}-container`,
//   header: `${PREFIX}-header`,
//   button: `${PREFIX}-button`,
// };

// const Root = styled(Container)(({ theme }) => ({
//   [`&.${classes.container}`]: {
//     marginTop: theme.spacing(10),
    
//   },
//   [`& .${classes.header}`]: {
//     display: 'flex',
//     justifyContent: 'center',
   
//     alignItems: 'center',
//     background: 'orange',
//     // color: theme.palette.common.white,
//     padding: theme.spacing(2.5),
//     borderRadius: theme.shape.borderRadius,
//     marginBottom: theme.spacing(2),
//   },
//   [`& .${classes.button}`]: {
//     marginTop: theme.spacing(1),
//     marginBottom: theme.spacing(2.5),
//   },
// }));

// // ---------- component ----------
// export default function QRScanner() {
//   const [text, setText] = useState('');
//   const [imageUrl, setImageUrl] = useState('');
//   const [scanResultFile, setScanResultFile] = useState('');
//   const [scanResultWebCam, setScanResultWebCam] = useState('');
//   const qrRef = useRef(null);

//     const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const sidebarWidth = isSidebarOpen ? 200 : 0;
//   const rightSidebarWidth = 250;

//   const generateQrCode = useCallback(async () => {
//     if (!text) return;
//     try {
//       const url = await QRCode.toDataURL(text);
//       setImageUrl(url);
//     } catch (err) {
//       console.error('QR generation failed', err);
//     }
//   }, [text]);

//   // ---- file scan ----
//   const onScanFile = () => qrRef.current?.openImageDialog?.();
//   const handleScanFile = (result) => result && setScanResultFile(result);

//   // ---- webcam scan ----
//   const handleScanWebCam = (result) => {
//     if (result) {
//       setScanResultWebCam(result);
//       // stop scanning once we have data
//       // eslint‑disable‑next‑line no-unused-expressions
//       qrWebcamRef.current?.pausePreview?.();
//     }
//   };
//   const qrWebcamRef = useRef(null);

//   return (
//     <Root className={classes.container} >

//        {isSidebarOpen && (
//          <SideBar key="sidebar" sx={{ width: sidebarWidth, flexShrink: 0 }} />
//        )}
//       <Card elevation={3} style={{ height:"500px", marginLeft:"130px"}}>
//         <Typography variant="h5" className={classes.header}>
//           Generate, Download &amp; Scan QR Codes
//         </Typography>

//         <CardContent>
//           <Grid container spacing={3}>
//             {/* ---------- QR generator ---------- */}
//             <Grid item xs={12} md={4}>
//               <TextField
//                 fullWidth
//                 label="Enter text here"
//                 value={text}
//                 onChange={(e) => setText(e.target.value)}
//               />
//               <Button
//                 fullWidth
//                 variant="contained"
//                 className={classes.button}
//                 onClick={generateQrCode}
//               >
//                 Generate
//               </Button>
//               {imageUrl && (
//                 <a href={imageUrl} download="qrcode.png">
//                   <img src={imageUrl} alt="Generated QR" width="100%" />
//                 </a>
//               )}
//             </Grid>

//             {/* ---------- Scan from file ---------- */}
//             <Grid item xs={12} md={4}>
//               <Button
//                 fullWidth
//                 variant="outlined"
//                 color="secondary"
//                 className={classes.button}
//                 onClick={onScanFile}
//               >
//                 Scan from file
//               </Button>

//               <QrReader
//                 legacyMode
//                 ref={qrRef}
//                 delay={300}
//                 onError={console.error}
//                 onScan={handleScanFile}
//                 style={{ width: '100%' }}
//               />
//               {scanResultFile && (
//                 <Typography variant="subtitle2" sx={{ mt: 2 }}>
//                   Result: {scanResultFile}
//                 </Typography>
//               )}
//             </Grid>

//             {/* ---------- Scan via webcam ---------- */}
//             <Grid item xs={12} md={4}>
//               <Typography variant="h6" gutterBottom>
//                 Scan via webcam
//               </Typography>

//               <QrReader
//                 ref={qrWebcamRef}
//                 delay={300}
//                 onError={console.error}
//                 onScan={handleScanWebCam}
//                 style={{ width: '100%' }}
//               />
//               {scanResultWebCam && (
//                 <Typography variant="subtitle2" sx={{ mt: 2 }}>
//                   Result: {scanResultWebCam}
//                 </Typography>
//               )}
//             </Grid>
//           </Grid>
//         </CardContent>
//       </Card>
//     </Root>
//   );
// }



import React, { useState, useRef, useCallback } from 'react';
import {
  Container,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Typography,
} from '@mui/material';
import { styled } from '@mui/system';
import QRCode from 'qrcode';
import QrReader from 'react-qr-reader'; // Note: lowercase 'r'
import SideBar from '../../component/SideBar';

// ---------- styled helpers ----------
const PREFIX = 'QrDemo';
const classes = {
  container: `${PREFIX}-container`,
  header: `${PREFIX}-header`,
  button: `${PREFIX}-button`,
};

const Root = styled(Container)(({ theme }) => ({
  [`&.${classes.container}`]: {
    marginTop: theme.spacing(10),
  },
  [`& .${classes.header}`]: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'orange',
    padding: theme.spacing(2.5),
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(2),
  },
  [`& .${classes.button}`]: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2.5),
  },
}));

export default function QRScanner() {
  const [text, setText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [scanResultFile, setScanResultFile] = useState('');
  const [scanResultWebCam, setScanResultWebCam] = useState('');
  const qrRef = useRef(null);
  const qrWebcamRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const sidebarWidth = isSidebarOpen ? 200 : 0;

  const generateQrCode = useCallback(async () => {
    if (!text) return;
    try {
      const url = await QRCode.toDataURL(text);
      setImageUrl(url);
    } catch (err) {
      console.error('QR generation failed', err);
    }
  }, [text]);

  const onScanFile = () => qrRef.current?.openImageDialog?.();

  const handleScanFile = (result) => {
    if (result) {
      setScanResultFile(result);
    }
  };

  const handleScanWebCam = (result) => {
    if (result) {
      setScanResultWebCam(result);
    }
  };

  return (
    <Root className={classes.container}>
      {isSidebarOpen && (
        <SideBar key="sidebar" sx={{ width: sidebarWidth, flexShrink: 0 }} />
      )}
      <Card elevation={3} style={{ height: 'auto', marginLeft: '130px' }}>
        <Typography variant="h5" className={classes.header}>
          Generate, Download &amp; Scan QR Codes
        </Typography>

        <CardContent>
          <Grid container spacing={3}>
            {/* QR Generator */}
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Enter text here"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <Button
                fullWidth
                variant="contained"
                className={classes.button}
                onClick={generateQrCode}
              >
                Generate
              </Button>
              {imageUrl && (
                <a href={imageUrl} download="qrcode.png">
                  <img src={imageUrl} alt="Generated QR" width="100%" />
                </a>
              )}
            </Grid>

            {/* Scan from File */}
            <Grid item xs={12} md={4}>
              <Button
                fullWidth
                variant="outlined"
                color="secondary"
                className={classes.button}
                onClick={onScanFile}
              >
                Scan from file
              </Button>
              <QrReader
                ref={qrRef}
                legacyMode
                delay={300}
                onError={console.error}
                onScan={handleScanFile}
                style={{ width: '100%' }}
              />
              {scanResultFile && (
                <Typography variant="subtitle2" sx={{ mt: 2 }}>
                  Result: {scanResultFile}
                </Typography>
              )}
            </Grid>

            {/* Scan via Webcam */}
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Scan via webcam
              </Typography>
              <QrReader
                delay={300}
                onError={console.error}
                onScan={handleScanWebCam}
                style={{ width: '100%' }}
              />
              {scanResultWebCam && (
                <Typography variant="subtitle2" sx={{ mt: 2 }}>
                  Result: {scanResultWebCam}
                </Typography>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Root>
  );
}
