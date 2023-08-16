import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Home({ phoneNumber, otp }) {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');

    const navigate = useNavigate();
    const validateForm = async () => {
        if (!name) {
            toast.error('Name is Required');
            return false;
        }
        if (!age) {
            toast.error('Age is Required');
            return false;
        }
        if (!email) {
            toast.error('Email is Required');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const isValid = await validateForm();
            if (isValid) {
                const response = await axios.post('http://localhost:6733/profile', {
                    phoneNumber,
                    otp,
                    name,
                    age,
                    email,
                });

                console.log(response)
                if (response.data) {
                    console.log(response.data)
                    toast.success('Profile Entered Successfully', { position: 'top-center' });
                    navigate('/profile');
                } else {
                    toast.error(response.data.message, { position: 'top-center' });
                }
            }
        } catch (error) {
            toast.error('An error occurred. Please try again later.', { position: 'top-center' });
        }
    };
    return(
        <div className="d-flex bg-success justify-content-center align-items-center vh-100">
            <div className="bg-white p-5 text-primary rounded-4 w-25">
                <h1><strong><center>INFORMATION</center></strong></h1>
                <br></br>
                <form action="" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="text-success"><strong>Name:</strong></label>
                        <input type="text" name="name" placeholder="Enter Your Name" onChange={(e)=>setName(e.target.value)} className="form-control rounded-3"></input>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="age" className="text-danger"><strong>Age:</strong></label>
                        <input type="number" name="phoneNumber" placeholder="Enter Your Age" onChange={(e)=>setAge(e.target.value)} className="form-control rounded-3"></input>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="text-info"><strong>Email:</strong></label>
                        <input type="email" name="email" placeholder="Enter Your Email" onChange={(e)=>setEmail(e.target.value)} className="form-control rounded-3"></input>
                    </div>
                    <button type='submit' className="btn btn-primary text-warning border-dark rounded-3 w-100"><strong>Submit</strong></button>
                </form>
            </div>
        </div>
    )
}

export default Home
