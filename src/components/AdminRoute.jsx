import React from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ user, children }) => {
// Only allow access if user exists AND is admin
if (user && user.is_admin === 1) {
return children;
} else {
// Redirect non-admins to home
return <Navigate to="/" />;
}
};

export default AdminRoute;