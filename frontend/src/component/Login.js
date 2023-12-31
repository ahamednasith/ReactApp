import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login({ phoneNumber,otp,setOtp }) {
    const navigate = useNavigate();
    const verifyOTP = async () => {
        try {
            const response = await axios.post('http://localhost:6733/verify', { phoneNumber, otp });
            if (response.data) {
                toast.success("OTP Verified Successfully", { position: 'top-center' });
                if (response.data.profile) {
                    setOtp(otp);
                    navigate('/profile');
                }
                else{
                    setOtp(otp);
                    navigate('/home')
                }
            } else {
                toast.error("OTP Has Expired", { position: 'top-center' });
            } 
        }
        catch (error) {
            toast.error("OTP Is Invalid", { position: 'top-center' });
        }
    }
    useEffect(() => {
        if (otp.length === 6) {
            verifyOTP();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[otp]);

    return (
        <div className="d-flex bg-dark justify-content-center align-items-center vh-100">
            <div className="bg-primary p-5 text-white rounded-4 w-25 ">
                <h1 className="text-danger"><strong><center>Sign up</center></strong> </h1>
                <br></br>
                <div className="mb-3">
                    <label htmlFor='otp' className="text-dark"><strong>OTP:</strong></label>
                    <input
                        type='text'
                        id="otp"
                        placeholder="Enter Your OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="form-control rounded"
                    />
                    <br></br>
                </div>
            </div>
        </div>
    )
}


export default Login;
