import React from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";





function Signup({ phoneNumber, setPhoneNumber }) {
    const navigate = useNavigate();
    const validateForm = async () => {
        if (!phoneNumber) {
            toast.error('Phone number is required');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const isValid = await validateForm();
            if (isValid) {
                const response = await axios.post('http://localhost:6733/signup', { phoneNumber });
                if (response.data) {
                    toast.success('OTP Generated', { position: 'top-center', theme: 'light' });
                    setPhoneNumber(phoneNumber);
                    navigate('/login');
                } else {
                    toast.error(response.data.message, { position: 'top-center', theme: 'light' });
                }
            }
        } catch (error) {
            console.error('An error occurred:', error);
            toast.error('OTP Not genretaed', { position: 'top-center', theme: 'light' });
            
        }
    };
    return (
        <div className="d-flex bg-secondary justify-content-center align-items-center vh-100">
            <div className="bg-warning p-5 text-white rounded-4 w-25 ">
                <h1 className="text-success"><strong><center>Sign up</center></strong> </h1>
                <br></br>
                <form action="" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor='phoneNumber' className="text-dark"><strong>Phone Number:</strong></label>
                        <input type='text' id='phoneNumber'  placeholder="Enter Your Phone Number" onChange={(e) => setPhoneNumber(e.target.value)} className="form-control rounded"/>
                        <br></br>
                    </div>
                    <button type="submit" className="btn btn-primary border-dark rounded-3 w-100">Send OTP</button>
                    <br/><br/>
                </form>
            </div>
        </div>
    )
}

export default Signup