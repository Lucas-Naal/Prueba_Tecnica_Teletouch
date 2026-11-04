import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { LoginPage } from "../pages/LoginPage";
import { StorePage } from "../pages/StorePage";
import { AdminPage } from "../pages/AdminPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { ProtectedRoute } from "./ProtectedRoute";

export function AppRoutes() {
    const [userRole, setUserRole] = useState(() => {
        return localStorage.getItem("userRole") || null;
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (userRole) {
            localStorage.setItem("userRole", userRole);
        } else {
            localStorage.removeItem("userRole");
        }
    }, [userRole]);

    const handleLoginSuccess = (data) => {
        const role = data.username === "emilys" ? "admin" : "user";
        setUserRole(role);
        navigate("/products");
    };

    const handleLogout = async () => {
        const result = await Swal.fire({
            title: "¿Cerrar sesión?",
            text: "Tendrás que volver a iniciar sesión para acceder a tu cuenta.",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Sí, cerrar sesión",
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#0f766e",
            cancelButtonColor: "#64748b",
        });

        if (!result.isConfirmed) return;

        setUserRole(null);
        navigate("/login");
    };

    return (
        <Routes>
            <Route
                path="/login"
                element={
                    userRole ? <Navigate to="/products" replace /> : <LoginPage onLogin={handleLoginSuccess} />
                }
            />

            <Route
                path="/products"
                element={
                    <ProtectedRoute userRole={userRole}>
                        <StorePage userRole={userRole} onLogout={handleLogout} />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin"
                element={
                    <ProtectedRoute userRole={userRole} allowedRoles={["admin"]}>
                        <AdminPage />
                    </ProtectedRoute>
                }
            />

            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}