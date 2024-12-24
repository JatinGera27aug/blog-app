import React from 'react';
import { jwtDecode } from "jwt-decode";

import { Navigate, Outlet } from 'react-router-dom';

const isTokenValid = (token) => {
    try {
        const { exp } = jwtDecode(token); // Decode the token
        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
        return exp > currentTime; // Check if the token is still valid
    } catch (error) {
        return false; // If decoding fails, the token is invalid
    }
};

const ProtectedRoutes = () => {
    const token = localStorage.getItem('token');

    if (!token || !isTokenValid(token)) {
        return <Navigate to="/login" />; // Redirect to login if no token or invalid token
    }

    return <Outlet />; // Render child routes if token is valid
};

export default ProtectedRoutes;