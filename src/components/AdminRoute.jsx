import React from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {

    const user = JSON.parse(localStorage.getItem("user"));

    // Checks if user exists and is an admin
    if(!user || user.role !== 1){
        return <Navigate to="/signin" replace />
    }
    return children;
};

export default AdminRoute;