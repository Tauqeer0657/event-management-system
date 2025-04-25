


import React, { useState, useRef, } from 'react';
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

import QrReader from 'react-qr-reader'; // Note: lowercase 'r'
import SideBar from '../../component/SideBar';
import { jwtDecode } from "jwt-decode";

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


  const [scanResultFile, setScanResultFile] = useState('');
  const [scanResultWebCam, setScanResultWebCam] = useState('');
  const qrRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const sidebarWidth = isSidebarOpen ? 200 : 0;


  const [decodedToken, setDecodedToken] = useState(null);




  const onScanFile = () => qrRef.current?.openImageDialog?.();



  const handleScanFile = (result) => {
    if (result) {
      setScanResultFile(result);
      try {
        const decoded = jwtDecode(result);
        console.log('Decoded JWT:', decoded);
        setDecodedToken(decoded);
      } catch (err) {
        console.error('Invalid JWT:', err);
      }
    }
  }

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
          Event Management System
        </Typography>

        <CardContent>
          <Grid container spacing={2} >


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



            </Grid>

            <div style={{ marginLeft:"30px", padding:"10px"}}>
              {decodedToken && (
                <div style={{ marginTop: '16px' }}>
                  <Typography variant="subtitle1" gutterBottom>Student Details</Typography>
                  <Typography>Name: {decodedToken.student_name}</Typography>
                  <Typography>Email: {decodedToken.student_email}</Typography>
                  <Typography>Event: {decodedToken.event_name}</Typography>
                  <Typography>Time: {decodedToken.event_time}</Typography>
                </div>
              )}

            </div>


          </Grid>
        </CardContent>
      </Card>
    </Root>
  );
}
