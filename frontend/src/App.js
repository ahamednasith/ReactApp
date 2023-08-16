import React, { useState } from "react";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from "./component/Button";
import Signup from "./component/Signup";
import Login from "./component/Login";
import Home from "./component/Home";
import Profile from "./component/Profile";

function App() {
  const [phoneNumber,setPhoneNumber] = useState('');
  return (
    <BrowserRouter>
    <div>
    <Routes>
      <Route path="/" element={<Button/>}></Route>
      <Route path='/signup' element={<Signup phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber}/>}></Route>
      <Route path="/login" element={<Login phoneNumber={phoneNumber}/>}></Route>
      <Route path="/home" element={<Home phoneNumber={phoneNumber}/>}></Route>
      <Route path="/profile" element={<Profile phoneNumber={phoneNumber}/>}></Route>
    </Routes>
    <ToastContainer position="top-center" type="info" theme="colored"/>{/* Add ToastContainer here*/}
    </div>
    </BrowserRouter>
  )
}

export default App;
