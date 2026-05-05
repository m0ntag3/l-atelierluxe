import React from "react";
import { Link } from "react-router-dom";
import "./css/Navbar.css";

const Navbar = ({ user, handleLogout, defaultAvatar, cart = [] }) => {

// Total number of items across all quantities
const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

return (
<div className="d-flex justify-content-center my-4">
    <div className="button-container d-flex align-items-center" id="Nav">

    {/* Home Icon */}
    <Link to="/" className="button d-flex align-items-center">
        <span className="material-symbols-outlined">home</span>
    </Link>

    {/* Admin Add Products */}
    {user?.role === 1 && (
        <Link to="/addproducts" className="button ms-2 d-flex align-items-center">
        <span className="material-symbols-outlined">add_circle</span>
        <span className="ms-1"></span>
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
            <Link to="/signin" className="button ms-2 d-flex align-items-center" title="Sign In">
            <span className="material-symbols-outlined">login</span>
            </Link>
            <Link to="/signup" className="button ms-2 d-flex align-items-center" title="Sign Up">
            <span className="material-symbols-outlined">person_add</span>
            </Link>
        </>
        ) : (
        <button className="button ms-2 d-flex align-items-center" onClick={handleLogout}>
            <span className="material-symbols-outlined">logout</span>
        </button>
        )}
    </div>

    </div>
</div>
);
};

export default Navbar;