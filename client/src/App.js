import "./App.css";
import { Routes, Route } from "react-router-dom";

import Login from "./auth/Login/Login";
import { Dashboard } from "./Pages/Dashboard/Dashboard";
import EventManage from "./Pages/QRGen/EventManage";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}></Route>
        

      
        {/* vehicle */}
        <Route path="/qrgenrate" element={<EventManage />}></Route>
     

      </Routes>
    </>
  );
}

export default App;
