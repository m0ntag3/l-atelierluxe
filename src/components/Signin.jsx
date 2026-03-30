import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/signin.css';

const Signin = ({ setUser }) => {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [loading, setLoading] = useState("");
const [error, setError] = useState("");

const navigate = useNavigate();

const handlesubmit = async (e) => {
e.preventDefault();
setLoading("Finalizing your login...");
setError(""); // Clear previous errors

try {
    const data = new FormData();
    data.append("email", email);
    data.append("password", password);

    const response = await axios.post(
    "https://collinspaul.alwaysdata.net/api/signin",
    data
    );

    setLoading("");

    if (response.data.user) {
    // ✅ Update App.js state
    setUser(response.data.user);

    // ✅ Store in localStorage
    localStorage.setItem("user", JSON.stringify(response.data.user));
    setUser(response.data.user); // ✅ Updates Navbar immediately
    navigate("/");

    // ✅ Redirect to home
    navigate("/");
    } else {
    setError("Login failed. Please try again!");
    }
} catch (err) {
    console.error(err);
    setLoading("");
    setError("We have a problem. Try again!");
}
};

return (
<div className="d-flex justify-content-center mt-5">
    <form className="form" onSubmit={handlesubmit}>
    {loading && <p className="text-center small text-dark fw-bold">{loading}</p>}
    {error && <p className="text-center small text-danger fw-bold">{error}</p>}

    <div className="flex-column">
        <label className='text-dark fw-bold'>Email</label>
    </div>
    <div className="inputForm">
        <input 
        placeholder="Enter your Email" 
        className="input" 
        type="email" 
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
    </div>

    <div className="flex-column">
        <label className='text-dark fw-bold'>Password</label>
    </div>
    <div className="inputForm">
        <input 
        placeholder="Enter your Password" 
        className="input" 
        type="password" 
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
    </div>

    <div className="flex-row">
        <div>
        <input type="checkbox" id="remember" />
        <label htmlFor="remember" className="ms-1">Remember me</label>
        </div>
        <Link to="/forgot" className='lost'>Forgot password?</Link>
    </div>

    <button type="submit" className="button-submit">Sign In</button>

    <p className="p">Don't have an account? 
        <Link to="/signup" className="span text-decoration-none">Sign Up</Link>
    </p>
    </form>
</div>
);
};

export default Signin;