import { useEffect, useState } from "react";
import {
  FaClipboardList,
  FaClock,
  FaSpinner,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

import DashboardLayout from "../../components/layout/DashboardLayout";
import StatCard from "../../components/layout/StatCard";
import StatusBadge from "../../components/common/StatusBadge";
import { getDashboardStats } from "../../services/adminService";

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await getDashboardStats();
      setStats(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-96">
          <div className="h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-8 text-white shadow-lg mb-8">

        <h1 className="text-4xl font-bold">
          Admin Dashboard
        </h1>

        <p className="mt-2 text-slate-300">
          Monitor complaints, track progress and manage campus issues.
        </p>

      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

        <StatCard
          title="Total Complaints"
          value={stats.totalComplaints}
          icon={<FaClipboardList />}
          color="bg-blue-600"
        />

        <StatCard
          title="Pending"
          value={stats.pendingComplaints}
          icon={<FaClock />}
          color="bg-yellow-500"
        />

        <StatCard
          title="In Progress"
          value={stats.inProgressComplaints}
          icon={<FaSpinner />}
          color="bg-purple-600"
        />

        <StatCard
          title="Resolved"
          value={stats.resolvedComplaints}
          icon={<FaCheckCircle />}
          color="bg-green-600"
        />

      </div>

      {/* Recent Complaints */}

      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">

        <div className="px-6 py-5 border-b">

          <h2 className="text-xl font-semibold">
            Recent Complaints
          </h2>

        </div>

        <table className="w-full">

          <thead className="bg-gray-50">

            <tr>

              <th className="px-6 py-4 text-left">Complaint ID</th>
              <th className="px-6 py-4 text-left">Student</th>
              <th className="px-6 py-4 text-left">Title</th>
              <th className="px-6 py-4 text-left">Category</th>
              <th className="px-6 py-4 text-left">Status</th>

            </tr>

          </thead>

          <tbody>

            {stats.recentComplaints.map((complaint) => (

              <tr
                key={complaint._id}
                className="border-t hover:bg-blue-50 transition"
              >

                <td className="px-6 py-5">
                  {complaint.complaintId}
                </td>

                <td className="px-6 py-5">
                  {complaint.student?.name}
                </td>

                <td className="px-6 py-5 font-medium">
                  {complaint.title}
                </td>

                <td className="px-6 py-5">
                  {complaint.category}
                </td>

                <td className="px-6 py-5">
                  <StatusBadge
                    status={complaint.status}
                  />
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </DashboardLayout>
  );
}

export default AdminDashboard;