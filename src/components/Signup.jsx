import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/signin.css'; // Using the same CSS file for consistency

const Signup = () => {
    // Hooks for user input
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [number, setNumber] = useState("");

    // Status hooks
    const [loading, setLoading] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading("Finalizing your registration...");
        setError("");

        try {
            const formdata = new FormData();
            formdata.append("username", username);
            formdata.append("email", email);
            formdata.append("password", password);
            formdata.append("phone", number);

            const response = await axios.post("https://collinspaul.alwaysdata.net/api/signup", formdata);
            
            setLoading("");
            setSuccess(response.data.message || "Registration successful!");

            // Clear form
            setUsername("");
            setEmail("");
            setPassword("");
            setNumber("");

            // Redirect to signin after a brief delay
            setTimeout(() => {
                setSuccess("");
                navigate("/signin");
            }, 3000);

        } catch (error) {
            setLoading("");
            setError(error.response?.data?.message || "Registration failed. Try again!");
        }
    };

    return (
        <div className="d-flex justify-content-center mt-5">
            <form className="form" onSubmit={handleSubmit}>
                <h2 className="text-center text-white mb-3 fw-bold">Create Account</h2>
                
                {/* Feedback Messages */}
                {loading && <p className="text-center small text-dark fw-bold">{loading}</p>}
                {success && <p className="text-center small text-white fw-bold bg-success p-2 rounded">{success}</p>}
                {error && <p className="text-center small text-danger fw-bold bg-white p-2 rounded">{error}</p>}

                {/* Username Field */}
                <div className="flex-column">
                    <label>Username</label>
                </div>
                <div className="inputForm">
                    <input 
                        placeholder="Enter your Username" 
                        className="input" 
                        type="text" 
                        required 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                {/* Email Field */}
                <div className="flex-column">
                    <label>Email</label>
                </div>
                <div className="inputForm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 32 32" height="20">
                        <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path>
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

                {/* Password Field */}
                <div className="flex-column">
                    <label>Password</label>
                </div>
                <div className="inputForm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="-64 0 512 512" height="20">
                        <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path>
                        <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path>
                    </svg>
                    <input 
                        placeholder="Enter your Password" 
                        className="input" 
                        type="password" 
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {/* Phone Field */}
                <div className="flex-column">
                    <label>Phone Number</label>
                </div>
                <div className="inputForm">
                    <input 
                        placeholder="e.g. 07..." 
                        className="input" 
                        type="tel" 
                        required 
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                    />
                </div>

                <button type="submit" className="button-submit">Sign Up</button>

                <p className="p">Already have an account? 
                    <Link to="/signin" className="span text-decoration-none">Sign In</Link>
                </p>
            </form>
        </div>
    );
};

export default Signup;