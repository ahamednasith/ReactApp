import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

function Home() {
    const [phoneNumber,setPhoneNumber] = useState('');
    const [name,setName] = useState('');
    const [age,setAge] = useState('');
    const [email,setEmail] = useState('');
    const validateForm = async () => {
        if (!phoneNumber) {
            toast.error('Phone Number is required');
            return false;
        }   
        if(!name){
            toast.error('Name is Required');
            return false;
        }
        if(!age){
            toast.error('Age is Required');
            return false;
        }
        if(!email){
            toast.error('email is Required');
            return false;
        }
        return true;
    };
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const isValid = await validateForm();
        if(isValid){
            axios.post('http://localhost:6733/profile',{phoneNumber,name,age,email})
            .then(res=>{
                if(res.data){
                    toast.success("Profile Enter Successfully",{position:'top-center'})
                }
                else{
                    toast.error(res.data.message,{position:'top-center'})
                }
            })
        }
    }
    return(
        <div className="d-flex bg-success justify-content-center align-items-center vh-100">
            <div className="bg-white p-5 text-primary rounded-4 w-25">
                <h1><strong><center>INFORMATION</center></strong></h1>
                <br></br>
                <form action="" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="phoneNumber" className="text-dark "><strong>Phone Number:</strong></label>
                        <input type="text" name="phoneNumber" placeholder="Enter Your Phone Number" onChange={(e)=>setPhoneNumber(e.target.value)} className="form-control rounded-3"></input>
                    </div>
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