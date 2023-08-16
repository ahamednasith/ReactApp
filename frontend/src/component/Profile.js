import React from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function Profile({ phoneNumber }) {
    const [user, setUser] = useState(null);

    const handleGetUser = async () => {
        try {
            const response = await axios.post('http://localhost:6733/verify', {phoneNumber});

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
        <div className="d-flex justify-content-center bg-primary align-items-center  vh-100">
            <div className="bg-warining p-5 rounded-4 w-25">
                <h1><strong><center>INFORMATION</center></strong></h1>
                {user && (
                    <div>
                        <p>User ID: {user.userId}</p>
                        <p>Phone Number: {user.phoneNumber}</p>
                        <p>Name: {user.name}</p>
                        <p>Age: {user.age}</p>
                        <p>Email: {user.email}</p>
                    </div>
                )}
                <button onClick={handleGetUser}>Get User Info</button>
            </div>
        </div>
    )
}

export default Profile