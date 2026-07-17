import { useEffect, useState } from "react";
import {
  FaUserCircle,
  FaEnvelope,
  FaUserShield,
  FaCalendarAlt,
  FaCheckCircle,
} from "react-icons/fa";

import DashboardLayout from "../../components/layout/DashboardLayout";
import { getProfile } from "../../services/userService";

function AdminProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const response = await getProfile();

      // Change to response.data.data if that's your API structure
      setUser(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

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

      <div className="max-w-6xl mx-auto">

        {/* Header */}

        <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-8 text-white shadow-lg mb-8">

          <h1 className="text-4xl font-bold">
            Admin Profile
          </h1>

          <p className="mt-2 text-slate-300">
            Manage your administrator account information.
          </p>

        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Left */}

          <div className="bg-white rounded-2xl border shadow-sm p-8 text-center">

            <FaUserCircle className="text-8xl text-blue-600 mx-auto mb-5" />

            <h2 className="text-2xl font-bold">
              {user.name}
            </h2>

            <span className="inline-block mt-4 bg-red-100 text-red-700 px-4 py-2 rounded-full font-medium capitalize">
              {user.role}
            </span>

          </div>

          {/* Right */}

          <div className="lg:col-span-2 bg-white rounded-2xl border shadow-sm">

            <div className="border-b px-6 py-5">
              <h2 className="text-xl font-semibold">
                Account Information
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 p-6">

              <Info
                icon={<FaUserCircle />}
                title="Full Name"
                value={user.name}
              />

              <Info
                icon={<FaEnvelope />}
                title="Email"
                value={user.email}
              />

              <Info
                icon={<FaUserShield />}
                title="Role"
                value={user.role}
              />

              <Info
                icon={<FaCheckCircle />}
                title="Status"
                value="Active"
              />

              <Info
                icon={<FaCalendarAlt />}
                title="Member Since"
                value={new Date(
                  user.createdAt
                ).toLocaleDateString()}
              />

            </div>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}

function Info({ icon, title, value }) {
  return (
    <div className="flex gap-4">

      <div className="bg-blue-100 text-blue-600 p-3 rounded-xl text-xl">
        {icon}
      </div>

      <div>
        <p className="text-gray-500 text-sm">
          {title}
        </p>

        <p className="font-semibold text-lg capitalize">
          {value}
        </p>
      </div>

    </div>
  );
}

export default AdminProfile;