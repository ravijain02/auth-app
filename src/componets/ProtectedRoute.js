import React from "react";
import { Navigate } from "react-router-dom"
import { isLoggedIn } from "../auth/authUser"

const ProtectedRoute = ({ children }) => {
  return isLoggedIn() ? <Navigate to="/login" replace /> : children
}

export default ProtectedRoute
