import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FaBell, FaSearch, FaUserCircle, FaBars } from "react-icons/fa";

function Topbar({ collapsed, setCollapsed }) {
    const { user } = useContext(AuthContext);

    const today = new Date().toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return (
        <header className="bg-white shadow-sm border-b border-gray-200 px-8 py-4 flex items-center justify-between">

            {/* Left Section */}
            <div className="flex items-center gap-4">

                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="p-3 rounded-lg hover:bg-gray-100 transition"
                >
                    <FaBars />
                </button>

                <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        Campus Complaint Management System
                    </h2>

                    <p className="text-sm text-gray-500">
                        {today}
                    </p>
                </div>

            </div>

            {/* Right Section */}
            <div className="flex items-center gap-6">

                {/* Search Bar (UI only) */}
                <div className="hidden md:flex items-center bg-gray-100 rounded-xl px-4 py-2 w-72">
                    <FaSearch className="text-gray-400 mr-2" />

                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-transparent outline-none text-sm w-full"
                    />
                </div>

                {/* Notification */}
                <button className="relative p-3 rounded-full hover:bg-gray-100 transition">
                    <FaBell className="text-xl text-gray-600" />

                    <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full"></span>
                </button>

                {/* User */}
                <div className="flex items-center gap-3">

                    <div className="bg-blue-600 text-white h-11 w-11 rounded-full flex items-center justify-center">
                        <FaUserCircle className="text-2xl" />
                    </div>

                    <div className="hidden sm:block">
                        <h3 className="font-semibold text-gray-800">
                            {user?.name}
                        </h3>

                        <p className="text-sm text-gray-500">
                            {user?.role}
                        </p>
                    </div>

                </div>

            </div>

        </header>
    );
}

export default Topbar;  