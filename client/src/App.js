import "./App.css";
import { Routes, Route } from "react-router-dom";

import Login from "./auth/Login/Login";
import { Dashboard } from "./Pages/Dashboard/Dashboard";
import VehicleType from "./Pages/QRGen/VehicleType";


// import VehicleType from "./Pages/Vehicle/VehicleType/VehicleType";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}></Route>
        

      
        {/* vehicle */}
        <Route path="/qrgenrate" element={<VehicleType />}></Route>
     



       



      </Routes>
    </>
  );
}

export default App;

// import './App.css';
// import { Routes, Route } from "react-router-dom";

// import Login from './auth/Login/Login';
// import DN from './Pages/Upload/ViewUpload/DN'
// import Upload from './Pages/Upload/Upload';
// import { Dashboard } from './Pages/Dashboard/Dashboard';
// import Header2 from './component/Header2';

// function App() {
//   return (
//     <>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/dashboard" element={<Dashboard/>}></Route>

//         {/* Nested Routes */}
//       <Route
//         path="/data"
//         element={
//           <>
//             <Header2 />
//             <Routes>
//               {/* Upload Route */}
//               <Route path="/upload" element={<Upload />} />
//               {/* DN Route */}
//               <Route path="/dn" element={<DN />} />
//             </Routes>
//           </>
//         }
//       />

//       </Routes>

//     </>
//   );
// }

// export default App;
