import "./App.css";
import { Routes, Route } from "react-router-dom";

import Login from "./auth/Login/Login";

import EventManage from "./Pages/QRGen/EventManage";
import QRScanner from "./Pages/QrDetails/QRScanner";
import Product from "./Pages/Product/Product";
import CartDetails from "./component/Cart";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/qrGenerate" element={<EventManage />}></Route>
        <Route path="/qrShow" element={<QRScanner />}></Route>
        <Route path="/event" element={<Product />}></Route>
        <Route path="/cart" element={<CartDetails />}></Route>




      </Routes>
    </>
  );
}

export default App;
