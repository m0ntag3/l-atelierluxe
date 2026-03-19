import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/ForgotPassword.css'; 

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleReset = (e) => {
        e.preventDefault();
        console.log("Reset link sent to:", email);
        // Your API call logic goes here
    };

    return (
        <div className="forgot-page-container" style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}>
            <form className="form" onSubmit={handleReset}>
                <div className="flex-column">
                    <label className='text-dark'>Email address of your account*</label>
                </div>
                <div className="inputForm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 32 32" height="20">
                        <g data-name="Layer 3" id="Layer_3">
                            <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path>
                        </g>
                    </svg>
                    <input 
                        placeholder="Enter your Email" 
                        className="input" 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <button type="submit" className="button-submit">Reset Password</button>
                
                <p className="p">
                    Remember your password? 
                    <span className="span" onClick={() => navigate("/signin")}> Sign In</span>
                </p>
            </form>
        </div>
    );
};

export default ForgotPassword;