import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaSearch } from "react-icons/fa";

import DashboardLayout from "../../components/layout/DashboardLayout";
import StatusBadge from "../../components/common/StatusBadge";
import PriorityBadge from "../../components/common/PriorityBadge";
import { getMyComplaints } from "../../services/complaintService";

function MyComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const fetchComplaints = async () => {
    try {
      const response = await getMyComplaints();
      setComplaints(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const filteredComplaints = useMemo(() => {
    return complaints.filter((complaint) => {
      const matchesSearch =
        complaint.title.toLowerCase().includes(search.toLowerCase()) ||
        complaint.complaintId.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        complaint.status === statusFilter;

      const matchesPriority =
        priorityFilter === "All" ||
        complaint.priority === priorityFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority
      );
    });
  }, [complaints, search, statusFilter, priorityFilter]);

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
      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6 mb-8">

        <div>
          <h1 className="text-4xl font-bold text-gray-800">
            My Complaints
          </h1>

          <p className="text-gray-500 mt-2">
            Track and manage all complaints submitted by you.
          </p>
        </div>

        <Link
          to="/student/new-complaint"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-xl shadow"
        >
          <FaPlus />
          New Complaint
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border shadow-sm p-6 mb-8">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          <div className="relative">
            <FaSearch className="absolute left-4 top-4 text-gray-400" />

            <input
              type="text"
              placeholder="Search complaint..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border rounded-xl pl-11 pr-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
            <option value="Rejected">Rejected</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="All">All Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

        </div>

      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-50">

            <tr className="text-gray-700">

              <th className="px-6 py-4 text-left">Complaint ID</th>
              <th className="px-6 py-4 text-left">Title</th>
              <th className="px-6 py-4 text-left">Category</th>
              <th className="px-6 py-4 text-left">Priority</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-left">Created</th>
              <th className="px-6 py-4 text-center">Action</th>

            </tr>

          </thead>

          <tbody>

            {filteredComplaints.length === 0 ? (

              <tr>

                <td colSpan="7">

                  <div className="text-center py-16">

                    <h2 className="text-2xl font-semibold text-gray-700">
                      No Complaints Found
                    </h2>

                    <p className="text-gray-500 mt-2">
                      Try changing your filters or submit a new complaint.
                    </p>

                  </div>

                </td>

              </tr>

            ) : (

              filteredComplaints.map((complaint) => (

                <tr
                  key={complaint._id}
                  className="border-t hover:bg-blue-50 transition"
                >

                  <td className="px-6 py-5 font-medium">
                    {complaint.complaintId}
                  </td>

                  <td className="px-6 py-5 font-semibold">
                    {complaint.title}
                  </td>

                  <td className="px-6 py-5">
                    {complaint.category}
                  </td>

                  <td className="px-6 py-5">
                    <PriorityBadge
                      priority={complaint.priority}
                    />
                  </td>

                  <td className="px-6 py-5">
                    <StatusBadge
                      status={complaint.status}
                    />
                  </td>

                  <td className="px-6 py-5 text-gray-600">
                    {new Date(
                      complaint.createdAt
                    ).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-5 text-center">

                    <Link
                      to={`/student/complaints/${complaint.complaintId}`}
                      className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded-lg"
                    >
                      View
                    </Link>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>
    </DashboardLayout>
  );
}

export default MyComplaints;