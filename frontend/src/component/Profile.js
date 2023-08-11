import React from "react";

function Profile(){
    return (
        <div className="d-flex justify-content-center bg-primary align-items-center  vh-100">
            <div className="bg-warining text-dark p-5 rounded-4 w-25">
                <h1><strong><center>INFORMATION</center></strong></h1>
                <ul>
                    <h2><strong>Name:<br></br></strong></h2>
                    <h2><strong>Age:<br></br></strong></h2>
                    <h2><strong>Email:<br></br></strong></h2>
                    <h2><strong>Phone Number:</strong></h2>
                </ul>
            </div> 
        </div>
    )
}

export default Profile