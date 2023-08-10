import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';


function Login({phoneNumber}) {
    const [otp,setOtp] = useState('');
    const navigate = useNavigate();
    const validateForm = async () => {
        if (!otp) {
            toast.error('OTP is required');
            return false;
        }   
        return true;
    };
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const isValid = await validateForm();
        if(isValid){
            axios.post('http://localhost:6733/verify',{phoneNumber,otp})
            .then(res=>{
                if(res.data){
                    toast.success("OTP Verified Successfully",{position:'top-center'})
                    navigate('/home');
                }
                else{
                    toast.error("OTP Has Expired",{position:'top-center'})
                }
            })
        }
    }
    return (
        <div className="d-flex bg-dark justify-content-center align-items-center vh-100">
            <div className="bg-primary p-5 text-white rounded-4 w-25 ">
                <h1 className="text-danger"><strong><center>Sign up</center></strong> </h1>
                <br></br>
                <form action="" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor='otp' className="text-dark"><strong>OTP:</strong></label>
                        <input type='text' name='otp' placeholder="Enter Your OTP" onChange={(e) => setOtp(e.target.value)} className="form-control rounded"/>
                        <br></br>
                    </div>
                    <button type="submit" className="btn btn-success border-dark rounded-3 w-100">Login</button>
                    <br/><br/>
                    <Link to="/" className="btn btn-warning border-dark rounded-3 w-100">Get OTP</Link>
                </form>
            </div>
        </div>
    )
}
export default Login