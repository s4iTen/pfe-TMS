import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const ProtectedRoute = () => {
  const token = window.localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const decoded = jwtDecode(token);
    const userType = decoded.userType;

    if (userType === "landlord") {
      return <Outlet />;
    } else {
      return <Navigate to="/404" />;
    }
  } catch (error) {
    console.error("Error decoding token:", error);
    return <Navigate to="/404" />;
  }
};
