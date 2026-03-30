import React from "react";
import { Link } from "react-router-dom";
import "./css/Navbar.css";

const Navbar = ({ user, handleLogout, defaultAvatar }) => {
return (
<div className="d-flex justify-content-center my-4">
    <div className="button-container d-flex align-items-center" id="Nav">

    {/* Home */}
    <Link to="/" className="button">
        🏠 Home
    </Link>

    {/* Admin Add Products */}
    {user?.is_admin === 1 && (
        <Link to="/addproducts" className="button ms-2">
        ➕ Add Creation
        </Link>
    )}

    {/* Logged-in User Info */}
    {user && (
        <div className="d-flex align-items-center ms-3">
        {user.profile_image ? (
            <img
            src={user.profile_image}
            alt="User Avatar"
            style={{
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                marginRight: "8px",
                objectFit: "cover",
            }}
            />
        ) : (
            <span style={{ marginRight: "8px" }}>{defaultAvatar}</span>
        )}
        <span className="username-label">Hello, {user.username}</span>
        </div>
    )}

    {/* Auth Buttons */}
    <div className="d-flex align-items-center ms-3">
        {!user ? (
        <>
            <Link to="/signin" className="button ms-2">Sign in</Link>
            <Link to="/signup" className="button ms-2">Sign up</Link>
        </>
        ) : (
        <button className="button ms-2" onClick={handleLogout}>
            Logout
        </button>
        )}
    </div>
    </div>
</div>
);
};

export default Navbar;