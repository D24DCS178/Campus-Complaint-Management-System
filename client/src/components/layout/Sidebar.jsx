import { NavLink, useNavigate } from "react-router-dom";
import {
    FaTachometerAlt,
    FaClipboardList,
    FaPlusCircle,
    FaUser,
    FaSignOutAlt,
    FaUniversity,
} from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function Sidebar({ collapsed }) {
    const { user, logoutUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const adminLinks = [
        {
            name: "Dashboard",
            path: "/admin/dashboard",
            icon: <FaTachometerAlt />,
        },
        {
            name: "Manage Complaints",
            path: "/admin/complaints",
            icon: <FaClipboardList />,
        },
        {
            name: "Profile",
            path: "/admin/profile",
            icon: <FaUser />,
        },
    ];

    const studentLinks = [
        {
            name: "Dashboard",
            path: "/student/dashboard",
            icon: <FaTachometerAlt />,
        },
        {
            name: "New Complaint",
            path: "/student/new-complaint",
            icon: <FaPlusCircle />,
        },
        {
            name: "My Complaints",
            path: "/student/complaints",
            icon: <FaClipboardList />,
        },
        {
            name: "Profile",
            path: "/student/profile",
            icon: <FaUser />,
        },
    ];

    const links = user?.role === "admin" ? adminLinks : studentLinks;

    return (
        <aside
            className={`${collapsed ? "w-24" : "w-72"
                } bg-slate-900 text-white flex flex-col transition-all duration-300 shadow-xl`}
        >
            {/* Logo */}
            <div className="p-6 border-b border-slate-700">
                <div
                    className={`flex items-center ${collapsed ? "justify-center" : "gap-3"
                        }`}
                >
                    <div className="bg-blue-600 h-12 w-12 rounded-xl flex items-center justify-center">
                        <FaUniversity className="text-xl" />
                    </div>

                    {!collapsed && (
                        <div>
                            <h1 className="text-lg font-bold">Campus CMS</h1>

                            <p className="text-xs text-gray-400">
                                Complaint Management
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* User */}
            <div className="border-b border-slate-700 p-6">
                {!collapsed ? (
                    <div className="text-center">
                        <h2 className="font-semibold text-lg">{user?.name}</h2>

                        <span className="inline-block mt-2 px-3 py-1 rounded-full bg-blue-600 text-xs capitalize">
                            {user?.role}
                        </span>
                    </div>
                ) : (
                    <div className="flex justify-center">
                        <div className="bg-slate-700 h-12 w-12 rounded-full flex items-center justify-center">
                            <FaUser className="text-xl" />
                        </div>
                    </div>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4">
                {links.map((link) => (
                    <NavLink
                        key={link.path}
                        to={link.path}
                        className={({ isActive }) =>
                            `flex items-center ${collapsed ? "justify-center" : "gap-3"
                            } px-4 py-3 rounded-xl mb-2 transition-all duration-300 ${isActive
                                ? "bg-blue-600 shadow-lg"
                                : "hover:bg-slate-800"
                            }`
                        }
                    >
                        <span className="text-lg">{link.icon}</span>

                        {!collapsed && (
                            <span className="font-medium">{link.name}</span>
                        )}
                    </NavLink>
                ))}
            </nav>

            {/* Logout */}
            <div className="p-4">
                <button
                    onClick={() => {
                        logoutUser();
                        navigate("/");
                    }}
                    className="w-full bg-red-600 hover:bg-red-700 rounded-xl py-3 flex items-center justify-center gap-2 transition-all duration-300"
                >
                    <FaSignOutAlt />

                    {!collapsed && <span>Logout</span>}
                </button>
            </div>
        </aside>
    );
}

export default Sidebar;