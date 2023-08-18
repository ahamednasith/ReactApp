import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Update({ phoneNumber, otp }) {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            const userData = JSON.parse(storedUserData);
            setName(userData.data.name || '');
            setAge(userData.data.age || '');
            setEmail(userData.data.email || '');
        }
    }, []);

    const validateForm = () => {
        if (!name || !age || !email) {
            toast.error('All fields are required');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const isValid = validateForm();
            if (isValid) {
                const response = await axios.post('http://localhost:6733/profile', {
                    phoneNumber,
                    otp,
                    name,
                    age,
                    email,
                });

                if (response.data) {
                    toast.success('Profile Updated Successfully', { position: 'top-center' });
                    navigate('/profile');
                } else {
                    toast.error(response.data.message, { position: 'top-center' });
                }
            }
        } catch (error) {
            toast.error('An error occurred. Please try again later.', { position: 'top-center' });
        }
    };

    return (
        <div className="d-flex bg-success justify-content-center align-items-center vh-100">
            <div className="bg-white p-5 text-primary rounded-4 w-25">
                <h1><strong><center>INFORMATION</center></strong></h1>
                <br></br>
                <form action="" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="text-success"><strong>Name:</strong></label>
                        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="form-control rounded-3" autoComplete="name"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="age" className="text-danger"><strong>Age:</strong></label>
                        <input type="number" id="age" value={age} onChange={(e) => setAge(e.target.value)} className="form-control rounded-3" autoComplete="age"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="text-info"><strong>Email:</strong></label>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control rounded-3" autoComplete="email"/>
                    </div>
                    <button type='submit' className="btn btn-primary text-warning border-dark rounded-3 w-100"><strong>Update Profile</strong></button>
                </form>
            </div>
        </div>
    )
}



export default Update