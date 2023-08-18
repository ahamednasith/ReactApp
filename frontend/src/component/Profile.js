import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Profile({ phoneNumber, otp }) {
    const [user, setUser] = useState('');

    const handleGetUser = async () => {
        try {
            const response = await axios.post('http://localhost:6733/verify', { phoneNumber, otp });
            console.log(response.data)

            if (response.data) {
                setUser(response.data);
                localStorage.setItem('userData', JSON.stringify(response.data));
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error("An error occurred: " + error.message);
        }
    }

    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');
        console.log(storedUserData);
        if (storedUserData) {
            setUser(JSON.parse(storedUserData));
        } else {
            handleGetUser();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="d-flex bg-dark justify-content-center align-items-center vh-100">
            <div className="bg-primary p-5 text-white rounded-4 w-25 ">
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Link to="/home" className='btn btn-lg btn-info text-dark'><b>Edit</b></Link>
                </div>
                <h1 className='text-dark'><strong><center>INFORMATION</center></strong></h1><br />
                {user && (
                    <div className='text-white font-weight'>
                        <p><b>User ID:</b> <b className='text-warning'>{user.data.userId}</b></p>
                        <p><b>Phone Number:</b> <b className='text-warning'>{user.data.phoneNumber}</b></p>
                        <p><b>Name:</b> <b className='text-warning'>{user.data.name}</b></p>
                        <p><b>Age: </b> <b className='text-warning'>{user.data.age}</b></p>
                        <p><b>Email: </b> <b className='text-warning'>{user.data.email}</b></p>
                    </div>
                )}
                <Link to='/signup' className="btn btn-danger text-dark text-weight-bold border-dark rounded-3 w-100">Log Out</Link>
            </div>
        </div>
    );
}

export default Profile;




