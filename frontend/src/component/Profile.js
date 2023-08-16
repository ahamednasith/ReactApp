import React from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function Profile({ phoneNumber, otp }) {
    const [user, setUser] = useState('');

    const handleGetUser = async () => {
        try {
            const response = await axios.post('http://localhost:6733/verify', { phoneNumber, otp });
            console.log(response.data)

            if (response.data) {
                setUser(response.data);
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error("An error occurred: " + error.message);
        }
    }
    return (
        <div className="d-flex bg-dark justify-content-center align-items-center vh-100">
            <div className="bg-primary p-5 text-white rounded-4 w-25 ">
                <h1 className='text-dark'><strong><center>INFORMATION</center></strong></h1><br/>
                {user && (
                    <div className='text-white font-weight'>
                        <p><b>User ID:</b> {user.userId}</p>
                        <p><b>Phone Number:</b> {user.phoneNumber}</p>
                        <p><b>Name:</b> {user.name}</p>
                        <p><b>Age: </b>{user.age}</p>
                        <p><b>Age: </b> {user.email}</p>
                    </div>
                )}
                <button className="btn btn-info border-dark rounded-3 w-100" onClick={handleGetUser}>Get User Info</button>
            </div>
        </div>
    )
}

export default Profile

