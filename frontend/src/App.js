import React from "react";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Signup from "./component/Signup";
import Login from "./component/Login";
import Home from "./component/Home";

function App() {
  return (
    <BrowserRouter>
    <div>
    <Routes>
      <Route path='/' element={<Signup/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/home" element={<Home/>}></Route>
    </Routes>
    <ToastContainer position="top-center" type="info" theme="colored"/>{/* Add ToastContainer here*/}
    </div>
    </BrowserRouter>
  )
}

export default App;
