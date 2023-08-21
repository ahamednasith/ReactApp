import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function Update({ phoneNumber, otp }) {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [userData, setUserData] = useState(null); 
    const userId = useState('');
    const loginDate = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                const response = await axios.get('http://localhost:6733/getprofile', {
                    headers: {
                        Authorization: `bearer ${token}`,
                    },
                    params: {
                        phoneNumber: phoneNumber,
                        otp: otp
                    }
                });

                if (response.data) {
                    setUserData(response.data.data); 
                }
            } catch (error) {
                toast.error('Error fetching user data:', error.message);
            }
        };

        fetchUserData();
    }, [phoneNumber, otp]);

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
            const isValid = await validateForm();
            if (isValid) {
                const response = await axios.post('http://localhost:6733/profile', {
                    phoneNumber,
                    otp,
                    userId,
                    name,
                    age,
                    email,
                    loginDate
                });

                console.log(response.data)
                if (response.data) {
                    const token = response.data.token; 
                    localStorage.setItem('accessToken', token); 

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

    useEffect(() => {
        if (userData) {
            setName(userData.name);
            setAge(userData.age);
            setEmail(userData.email);
        }
    }, [userData]);

    return (
        <div className="d-flex bg-success justify-content-center align-items-center vh-100">
            <div className="bg-white p-5 text-primary rounded-4 w-25">
                <h1><strong><center>INFORMATION</center></strong></h1>
                <br></br>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="text-success"><strong>Name:</strong></label>
                        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="form-control rounded-3" autoComplete="name" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="age" className="text-danger"><strong>Age:</strong></label>
                        <input type="number" id="age" value={age} onChange={(e) => setAge(e.target.value)} className="form-control rounded-3" autoComplete="age" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="text-info"><strong>Email:</strong></label>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control rounded-3" autoComplete="email" />
                    </div>
                    <button type="submit" className="btn btn-primary text-warning border-dark rounded-3 w-100"><strong>Submit</strong></button>
                </form>
            </div>
        </div>
    );
}

export default Update;
