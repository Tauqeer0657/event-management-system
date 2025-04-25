import "./App.css";
import { Routes, Route } from "react-router-dom";

import Login from "./auth/Login/Login";

import EventManage from "./Pages/QRGen/EventManage";
import QRScanner from "./Pages/QrDetails/QRScanner";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
    
        <Route path="/qrGenerate" element={<EventManage />}></Route>
        <Route path="/qrShow" element={<QRScanner />}></Route>

  
      </Routes>
    </>
  );
}

export default App;
