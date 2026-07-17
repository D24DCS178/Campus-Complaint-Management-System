import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { getComplaintById } from "../../services/complaintService";

function ComplaintDetails() {
    const { complaintId } = useParams();

    const [complaint, setComplaint] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchComplaint();
    }, []);

    const fetchComplaint = async () => {
        try {
            const response = await getComplaintById(complaintId);
            setComplaint(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <DashboardLayout>
                <p>Loading...</p>
            </DashboardLayout>
        );
    }

    if (!complaint) {
        return (
            <DashboardLayout>
                <p>Complaint not found.</p>
            </DashboardLayout>
        );
    }

    const getStatusClass = (status) => {
        switch (status) {
            case "Pending":
                return "bg-yellow-100 text-yellow-700";

            case "In Progress":
                return "bg-blue-100 text-blue-700";

            case "Resolved":
                return "bg-green-100 text-green-700";

            case "Rejected":
                return "bg-red-100 text-red-700";

            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-8">

                <h1 className="text-3xl font-bold mb-8">
                    Complaint Details
                </h1>

                <div className="grid grid-cols-2 gap-6">

                    <div>
                        <p className="text-gray-500">Complaint ID</p>
                        <p className="font-semibold">{complaint.complaintId}</p>
                    </div>

                    <div>
                        <p className="text-gray-500">Status</p>

                        <span
                            className={`px-3 py-1 rounded-full text-sm ${getStatusClass(
                                complaint.status
                            )}`}
                        >
                            {complaint.status}
                        </span>
                    </div>

                    <div>
                        <p className="text-gray-500">Category</p>
                        <p>{complaint.category}</p>
                    </div>

                    <div>
                        <p className="text-gray-500">Department</p>
                        <p>{complaint.department}</p>
                    </div>

                    <div>
                        <p className="text-gray-500">Priority</p>
                        <p>{complaint.priority}</p>
                    </div>

                    <div>
                        <p className="text-gray-500">Created On</p>
                        <p>
                            {new Date(
                                complaint.createdAt
                            ).toLocaleDateString()}
                        </p>
                    </div>

                </div>

                <div className="mt-8">
                    <h2 className="font-semibold text-lg">
                        Title
                    </h2>

                    <p className="mt-2">
                        {complaint.title}
                    </p>
                </div>

                <div className="mt-8">
                    <h2 className="font-semibold text-lg">
                        Description
                    </h2>

                    <div className="mt-3 border rounded-lg p-5 bg-gray-50">
                        {complaint.description}
                    </div>
                </div>

                <div className="mt-8">
                    <h2 className="font-semibold text-lg">
                        Admin Remarks
                    </h2>

                    <div className="mt-3 border rounded-lg p-5 bg-gray-50">
                        {complaint.remarks || "No remarks yet."}
                    </div>
                </div>

                <div className="mt-8 flex justify-between">

                    <div>
                        <p className="text-sm text-gray-500">
                            Updated
                        </p>

                        <p>
                            {new Date(
                                complaint.updatedAt
                            ).toLocaleDateString()}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">
                            Resolved
                        </p>

                        <p>
                            {complaint.resolvedAt
                                ? new Date(
                                    complaint.resolvedAt
                                ).toLocaleDateString()
                                : "-"}
                        </p>
                    </div>

                </div>

                <div className="mt-10">
                    <Link
                        to="/student/complaints"
                        className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
                    >
                        ← Back to My Complaints
                    </Link>
                </div>

            </div>
        </DashboardLayout>
    );
}

export default ComplaintDetails;