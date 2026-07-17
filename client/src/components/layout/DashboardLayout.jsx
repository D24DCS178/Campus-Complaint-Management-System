import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function DashboardLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />

        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;