import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, isAdmin }) => {
  // If the user is not an admin, redirect them to the home page or a 404
if (!isAdmin) {
    return <Navigate to="/" replace />;
}

return children;
};

export default ProtectedRoute;