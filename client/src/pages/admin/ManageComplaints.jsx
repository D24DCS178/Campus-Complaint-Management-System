import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaEye } from "react-icons/fa";

import DashboardLayout from "../../components/layout/DashboardLayout";
import StatusBadge from "../../components/common/StatusBadge";
import { getAllComplaints } from "../../services/adminService";

function ManageComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const response = await getAllComplaints();
      setComplaints(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredComplaints = useMemo(() => {
    return complaints.filter((complaint) => {
      const matchesSearch =
        complaint.title.toLowerCase().includes(search.toLowerCase()) ||
        complaint.complaintId.toLowerCase().includes(search.toLowerCase()) ||
        complaint.student?.name
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        status === "All" || complaint.status === status;

      const matchesCategory =
        category === "All" || complaint.category === category;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesCategory
      );
    });
  }, [complaints, search, status, category]);

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

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-3xl font-bold">
            Manage Complaints
          </h1>

          <p className="text-gray-500 mt-1">
            View and manage all student complaints.
          </p>

        </div>

      </div>

      {/* Filters */}

      <div className="bg-white rounded-xl border p-6 mb-8">

        <div className="grid md:grid-cols-3 gap-4">

          <div className="relative">

            <FaSearch className="absolute left-4 top-4 text-gray-400" />

            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full pl-11 pr-4 py-3 border rounded-lg"
            />

          </div>

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            className="border rounded-lg p-3"
          >
            <option>All</option>
            <option>Pending</option>
            <option>In Progress</option>
            <option>Resolved</option>
            <option>Rejected</option>
          </select>

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            className="border rounded-lg p-3"
          >
            <option>All</option>
            <option>Academic</option>
            <option>Library</option>
            <option>Hostel</option>
            <option>Transport</option>
            <option>Cafeteria</option>
            <option>IT Support</option>
            <option>Infrastructure</option>
            <option>Examination</option>
            <option>Administration</option>
            <option>Other</option>
          </select>

        </div>

      </div>

      {/* Table */}

      <div className="bg-white rounded-xl border overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-50">

            <tr>

              <th className="px-6 py-4 text-left">
                Complaint ID
              </th>

              <th className="px-6 py-4 text-left">
                Student
              </th>

              <th className="px-6 py-4 text-left">
                Title
              </th>

              <th className="px-6 py-4 text-left">
                Category
              </th>

              <th className="px-6 py-4 text-left">
                Status
              </th>

              <th className="px-6 py-4 text-center">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredComplaints.map((complaint) => (

              <tr
                key={complaint._id}
                className="border-t hover:bg-gray-50"
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

                <td className="px-6 py-5 text-center">

                  <Link
                    to={`/admin/complaints/${complaint.complaintId}`}
                    className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >

                    <FaEye />

                    View

                  </Link>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </DashboardLayout>
  );
}

export default ManageComplaints;