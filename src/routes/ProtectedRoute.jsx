import { Navigate } from "react-router-dom";

export function ProtectedRoute({ userRole, allowedRoles, children }) {
    if (!userRole) return <Navigate to="/login" replace />;
    if (allowedRoles && !allowedRoles.includes(userRole)) {
        return <Navigate to="/products" replace />;
    }
    return children;
}   