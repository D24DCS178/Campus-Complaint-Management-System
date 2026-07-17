import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaClipboardList,
  FaTags,
  FaFlag,
  FaAlignLeft,
  FaPaperPlane,
  FaUndo,
} from "react-icons/fa";

import DashboardLayout from "../../components/layout/DashboardLayout";
import { createComplaint } from "../../services/complaintService";

function NewComplaint() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    priority: "Medium",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleReset = () => {
    setFormData({
      title: "",
      category: "",
      priority: "Medium",
      description: "",
    });

    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await createComplaint(formData);

      setSuccess("Complaint submitted successfully!");

      setTimeout(() => {
        navigate("/student/complaints");
      }, 1500);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to submit complaint."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-lg mb-8">

          <h1 className="text-4xl font-bold">
            Submit New Complaint
          </h1>

          <p className="mt-2 text-blue-100">
            Fill in the details below. The complaint will automatically
            be assigned to the appropriate department.
          </p>

        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-sm border p-8">

          {error && (
            <div className="mb-6 rounded-xl bg-red-100 text-red-700 p-4">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-6 rounded-xl bg-green-100 text-green-700 p-4">
              {success}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* Title */}
            <div>

              <label className="font-semibold flex items-center gap-2 mb-2">
                <FaClipboardList />
                Complaint Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Enter complaint title"
                className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />

            </div>

            {/* Category & Priority */}
            <div className="grid md:grid-cols-2 gap-6">

              <div>

                <label className="font-semibold flex items-center gap-2 mb-2">
                  <FaTags />
                  Category
                </label>

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="">Select Category</option>
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

              <div>

                <label className="font-semibold flex items-center gap-2 mb-2">
                  <FaFlag />
                  Priority
                </label>

                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>

              </div>

            </div>

            {/* Description */}
            <div>

              <label className="font-semibold flex items-center gap-2 mb-2">
                <FaAlignLeft />
                Description
              </label>

              <textarea
                rows="6"
                maxLength="500"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                placeholder="Describe your complaint in detail..."
                className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              />

              <div className="text-right text-sm text-gray-500 mt-2">
                {formData.description.length} / 500 characters
              </div>

            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4">

              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-2 px-6 py-3 rounded-xl border hover:bg-gray-100 transition"
              >
                <FaUndo />
                Reset
              </button>

              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition disabled:opacity-60"
              >
                <FaPaperPlane />

                {loading
                  ? "Submitting..."
                  : "Submit Complaint"}
              </button>

            </div>

          </form>

        </div>

      </div>
    </DashboardLayout>
  );
}

export default NewComplaint;