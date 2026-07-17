import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import DashboardLayout from "../../components/layout/DashboardLayout";
import StatusBadge from "../../components/common/StatusBadge";
import PriorityBadge from "../../components/common/PriorityBadge";

import {
  getComplaintDetails,
  updateComplaintStatus,
} from "../../services/adminService";

function AdminComplaintDetails() {
  const { complaintId } = useParams();

  const [complaint, setComplaint] = useState(null);
  const [status, setStatus] = useState("");
  const [remarks, setRemarks] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchComplaint = async () => {
    try {
      const response = await getComplaintDetails(complaintId);

      const data = response.data;

      setComplaint(data);
      setStatus(data.status);
      setRemarks(data.remarks || "");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchComplaint();
  }, []);

  const handleUpdate = async () => {
    try {
      setSaving(true);

      await updateComplaintStatus(complaintId, {
        status,
        remarks,
      });

      alert("Complaint updated successfully.");

      fetchComplaint();
    } catch (error) {
      console.error(error);
      alert("Failed to update complaint.");
    } finally {
      setSaving(false);
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

      <div className="max-w-5xl mx-auto space-y-8">

        <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-8 text-white">

          <h1 className="text-3xl font-bold">
            Complaint Details
          </h1>

          <p className="mt-2">
            {complaint.complaintId}
          </p>

        </div>

        {/* Complaint */}

        <div className="bg-white rounded-xl border p-6">

          <h2 className="text-xl font-semibold mb-5">
            Complaint
          </h2>

          <div className="space-y-4">

            <div>
              <p className="text-gray-500">Title</p>
              <h3 className="font-semibold text-lg">
                {complaint.title}
              </h3>
            </div>

            <div>
              <p className="text-gray-500">Description</p>
              <p>{complaint.description}</p>
            </div>

          </div>

        </div>

        {/* Student */}

        <div className="bg-white rounded-xl border p-6">

          <h2 className="text-xl font-semibold mb-5">
            Student Information
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <Info label="Name" value={complaint.student.name} />
            <Info label="Email" value={complaint.student.email} />
            <Info label="Enrollment" value={complaint.student.enrollmentNo} />
            <Info label="Department" value={complaint.student.department} />

          </div>

        </div>

        {/* Complaint Info */}

        <div className="bg-white rounded-xl border p-6">

          <h2 className="text-xl font-semibold mb-5">
            Complaint Information
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <Info label="Category" value={complaint.category} />

            <div>
              <p className="text-gray-500 mb-2">Priority</p>
              <PriorityBadge priority={complaint.priority} />
            </div>

            <div>
              <p className="text-gray-500 mb-2">Status</p>
              <StatusBadge status={complaint.status} />
            </div>

            <Info
              label="Created On"
              value={new Date(
                complaint.createdAt
              ).toLocaleDateString()}
            />

          </div>

        </div>

        {/* Update */}

        <div className="bg-white rounded-xl border p-6">

          <h2 className="text-xl font-semibold mb-6">
            Update Complaint
          </h2>

          <div className="space-y-6">

            <div>

              <label className="block mb-2 font-medium">
                Status
              </label>

              <select
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value)
                }
                className="w-full border rounded-lg p-3"
              >
                <option>Pending</option>
                <option>In Progress</option>
                <option>Resolved</option>
                <option>Rejected</option>
              </select>

            </div>

            <div>

              <label className="block mb-2 font-medium">
                Remarks
              </label>

              <textarea
                rows={5}
                value={remarks}
                onChange={(e) =>
                  setRemarks(e.target.value)
                }
                className="w-full border rounded-lg p-3"
                placeholder="Enter remarks..."
              />

            </div>

            <button
              onClick={handleUpdate}
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold"
            >
              {saving
                ? "Updating..."
                : "Update Complaint"}
            </button>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-gray-500">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  );
}

export default AdminComplaintDetails;