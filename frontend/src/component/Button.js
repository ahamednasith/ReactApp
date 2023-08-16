import React from "react";
import { Link } from "react-router-dom";

function Button(){
    return (
        <div className="d-flex bg-secondary justify-content-center align-items-center vh-100">
            <div className="bg-warning p-5 text-white rounded-4 w-25 ">
            <Link to='/signup' className="btn btn-primary border-dark rounded-3 w-100">Login</Link>
            </div>
        </div>
    )
}

export default Button