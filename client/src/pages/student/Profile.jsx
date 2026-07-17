import { useEffect, useState } from "react";
import {
  FaUserCircle,
  FaEnvelope,
  FaIdCard,
  FaBuilding,
  FaUserShield,
  FaCalendarAlt,
  FaCheckCircle,
} from "react-icons/fa";

import DashboardLayout from "../../components/layout/DashboardLayout";
import { getProfile } from "../../services/userService";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await getProfile();
      setUser(response.data);
    } catch (error) {
      console.error("Failed to fetch profile:", error);
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
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-lg mb-8">

          <h1 className="text-4xl font-bold">
            My Profile
          </h1>

          <p className="mt-2 text-blue-100">
            View your account and academic information.
          </p>

        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Left Card */}
          <div className="bg-white rounded-2xl shadow-sm border p-8 text-center">

            <div className="flex justify-center mb-5">
              <FaUserCircle className="text-8xl text-blue-600" />
            </div>

            <h2 className="text-2xl font-bold text-gray-800">
              {user.name}
            </h2>

            <p className="text-gray-500 mt-2">
              {user.department}
            </p>

            <span className="inline-block mt-4 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium capitalize">
              {user.role}
            </span>

          </div>

          {/* Right Side */}
          <div className="lg:col-span-2 space-y-8">

            {/* Personal Information */}
            <div className="bg-white rounded-2xl shadow-sm border">

              <div className="border-b px-6 py-4">
                <h2 className="text-xl font-semibold">
                  Personal Information
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6 p-6">

                <InfoCard
                  icon={<FaUserCircle />}
                  title="Full Name"
                  value={user.name}
                />

                <InfoCard
                  icon={<FaEnvelope />}
                  title="Email"
                  value={user.email}
                />

                <InfoCard
                  icon={<FaIdCard />}
                  title="Enrollment Number"
                  value={user.enrollmentNo}
                />

                <InfoCard
                  icon={<FaBuilding />}
                  title="Department"
                  value={user.department}
                />

              </div>

            </div>

            {/* Account Information */}
            <div className="bg-white rounded-2xl shadow-sm border">

              <div className="border-b px-6 py-4">
                <h2 className="text-xl font-semibold">
                  Account Information
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6 p-6">

                <InfoCard
                  icon={<FaUserShield />}
                  title="Role"
                  value={user.role}
                />

                <InfoCard
                  icon={<FaCheckCircle />}
                  title="Account Status"
                  value="Active"
                />

                <InfoCard
                  icon={<FaCalendarAlt />}
                  title="Member Since"
                  value={new Date(user.createdAt).toLocaleDateString()}
                />

              </div>

            </div>

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}

function InfoCard({ icon, title, value }) {
  return (
    <div className="flex items-start gap-4">

      <div className="bg-blue-100 text-blue-600 p-3 rounded-xl text-xl">
        {icon}
      </div>

      <div>
        <p className="text-sm text-gray-500">
          {title}
        </p>

        <h3 className="text-lg font-semibold text-gray-800 capitalize">
          {value}
        </h3>
      </div>

    </div>
  );
}

export default Profile;