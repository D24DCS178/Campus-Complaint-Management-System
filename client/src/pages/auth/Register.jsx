import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    enrollmentNo: "",
    department: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (
      !formData.name ||
      !formData.email ||
      !formData.enrollmentNo ||
      !formData.department ||
      !formData.password
    ) {
      setError("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      console.log("Sending:", formData);

      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response:", response.data);

      alert("Registration Successful!");

      navigate("/");
    } catch (err) {
      console.error(err);

      if (err.response) {
        setError(err.response.data.message || "Registration failed");
      } else {
        setError("Unable to connect to server");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg">

        <h1 className="text-3xl font-bold text-center text-blue-600 mb-2">
          Student Registration
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Create your account
        </p>

        {error && (
          <div className="mb-4 p-3 rounded bg-red-100 text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
          />

          <input
            type="text"
            name="enrollmentNo"
            placeholder="Enrollment Number"
            value={formData.enrollmentNo}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
          />

          <input
            type="text"
            name="department"
            placeholder="Department"
            value={formData.department}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
          >
            {loading ? "Registering..." : "Register"}
          </button>

        </form>

        <p className="text-center mt-6">
          Already have an account?
          <Link
            to="/"
            className="text-blue-600 font-semibold ml-1"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;