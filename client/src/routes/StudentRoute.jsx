import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function StudentRoute() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (user.role !== "student") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Outlet />;
}

export default StudentRoute;