import React, { useState } from "react";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from "./component/Button";
import Signup from "./component/Signup";
import Login from "./component/Login";
import Home from "./component/Home";
import Profile from "./component/Profile";
import Update from "./component/Update";

function App() {
  const [phoneNumber,setPhoneNumber] = useState('');
  const [otp,setOtp] = useState('');
  return (
    <BrowserRouter>
    <div>
    <Routes>
      <Route path="/" element={<Button/>}></Route>
      <Route path='/signup' element={<Signup phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber}/>}></Route>
      <Route path="/login" element={<Login phoneNumber={phoneNumber} otp={otp} setOtp={setOtp} />}></Route>
      <Route path="/home" element={<Home phoneNumber={phoneNumber} />}></Route>
      <Route path="/profile" element={<Profile phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} otp={otp} setOtp={setOtp}/>}></Route>
      <Route path="/update" element={<Update phoneNumber={phoneNumber} />}></Route>
    </Routes>
    <ToastContainer position="top-center" type="info" theme="colored"/>{/* Add ToastContainer here*/}
    </div>
    </BrowserRouter>
  )
}

export default App;
