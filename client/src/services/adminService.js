import api from "./api";

export const getDashboardStats = async () => {
  const response = await api.get("/admin/dashboard");
  return response.data;
};

export const getAllComplaints = async () => {
  const response = await api.get("/admin/complaints");
  return response.data;
};

export const getComplaintDetails = async (complaintId) => {
  const response = await api.get(
    `/admin/complaints/${complaintId}`
  );

  return response.data;
};

export const updateComplaintStatus = async (
  complaintId,
  data
) => {
  const response = await api.patch(
    `/admin/complaints/${complaintId}`,
    data
  );

  return response.data;
};