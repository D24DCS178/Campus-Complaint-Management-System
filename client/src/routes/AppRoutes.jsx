import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
import StudentRoute from "./StudentRoute";

import StudentDashboard from "../pages/student/StudentDashboard";
import NewComplaint from "../pages/student/NewComplaint";
import MyComplaints from "../pages/student/MyComplaints";
import Profile from "../pages/student/Profile";
import ComplaintDetails from "../pages/student/ComplaintDetails";

import AdminDashboard from "../pages/admin/AdminDashboard";
import ManageComplaints from "../pages/admin/ManageComplaints";
import AdminComplaintDetails from "../pages/admin/AdminComplaintDetails";
import AdminProfile from "../pages/admin/AdminProfile";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected Routes */}
                <Route element={<ProtectedRoute />}>
                    {/* Admin */}
                    <Route element={<AdminRoute />}>

                        <Route
                            path="/admin/dashboard"
                            element={<AdminDashboard />}
                        />

                        <Route
                            path="/admin/complaints"
                            element={<ManageComplaints />}
                        />

                        <Route
                            path="/admin/complaints/:complaintId"
                            element={<AdminComplaintDetails />}
                        />

                        <Route
                            path="/admin/profile"
                            element={<AdminProfile />}
                        />

                    </Route>

                    {/* Student */}
                    <Route element={<StudentRoute />}>
                        <Route
                            path="/student/dashboard"
                            element={<StudentDashboard />}
                        />

                        <Route
                            path="/student/new-complaint"
                            element={<NewComplaint />}
                        />

                        <Route
                            path="/student/complaints"
                            element={<MyComplaints />}
                        />

                        <Route
                            path="/student/complaints/:complaintId"
                            element={<ComplaintDetails />}
                        />

                        <Route
                            path="/student/profile"
                            element={<Profile />}
                        />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;