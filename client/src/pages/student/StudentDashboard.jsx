import { useEffect, useState } from "react";
import {
    FaClipboardList,
    FaClock,
    FaCheckCircle,
    FaSpinner,
} from "react-icons/fa";

import DashboardLayout from "../../components/layout/DashboardLayout";
import StatCard from "../../components/layout/StatCard";
import { getMyComplaints } from "../../services/complaintService";

function StudentDashboard() {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchComplaints = async () => {
        try {
            const response = await getMyComplaints();
            setComplaints(response.data);
        } catch (error) {
            console.error("Failed to fetch complaints:", error);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchComplaints();
    }, []);

    const inProgressComplaints = complaints.filter(
        (complaint) => complaint.status === "In Progress"
    ).length;

    const totalComplaints = complaints.length;

    const pendingComplaints = complaints.filter(
        (complaint) => complaint.status === "Pending"
    ).length;

    const resolvedComplaints = complaints.filter(
        (complaint) => complaint.status === "Resolved"
    ).length;

    if (loading) {
        return (
            <DashboardLayout>
                <p className="text-lg">Loading dashboard...</p>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white mb-8 shadow-lg">
                <h1 className="text-4xl font-bold">
                    Welcome Back 👋
                </h1>

                <p className="text-xl mt-2">
                    Student Complaint Dashboard
                </p>

                <p className="mt-3 text-blue-100">
                    Track complaints, monitor progress, and stay updated with the latest status.
                </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4 mb-10">

                <StatCard
                    title="Total Complaints"
                    value={totalComplaints}
                    icon={<FaClipboardList />}
                    color="bg-blue-600"
                />

                <StatCard
                    title="Pending"
                    value={pendingComplaints}
                    icon={<FaClock />}
                    color="bg-yellow-500"
                />

                <StatCard
                    title="In Progress"
                    value={inProgressComplaints}
                    icon={<FaSpinner />}
                    color="bg-purple-600"
                />

                <StatCard
                    title="Resolved"
                    value={resolvedComplaints}
                    icon={<FaCheckCircle />}
                    color="bg-green-600"
                />

            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="flex justify-between items-center px-6 py-5 border-b">
                    <h2 className="text-xl font-semibold">
                        Recent Complaints
                    </h2>
                    <span className="text-sm text-gray-500">
                        Last 5 Complaints
                    </span>
                </div>
                {complaints.length === 0 ? (
                    <div className="text-center py-10 text-gray-500">
                        No complaints submitted yet.
                    </div>
                ) : (
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-left">ID</th>
                                <th className="px-6 py-4 text-left">Title</th>
                                <th className="px-6 py-4 text-left">Category</th>
                                <th className="px-6 py-4 text-left">Priority</th>
                                <th className="px-6 py-4 text-left">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {complaints.slice(0, 5).map((complaint) => (
                                <tr
                                    key={complaint._id}
                                    className="border-t hover:bg-gray-50"
                                >
                                    <td className="px-6 py-4">
                                        {complaint.complaintId}
                                    </td>
                                    <td className="px-6 py-4 font-medium">
                                        {complaint.title}
                                    </td>
                                    <td className="px-6 py-4">
                                        {complaint.category}
                                    </td>
                                    <td className="px-6 py-4">
                                        {complaint.priority}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm ${complaint.status === "Pending"
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : complaint.status === "Resolved"
                                                        ? "bg-green-100 text-green-700"
                                                        : complaint.status === "In Progress"
                                                            ? "bg-blue-100 text-blue-700"
                                                            : "bg-red-100 text-red-700"
                                                }`}
                                        >
                                            {complaint.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </DashboardLayout>
    );
}

export default StudentDashboard;