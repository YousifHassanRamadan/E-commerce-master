import React, { useState } from "react";
import { FaUsers, FaUserShield, FaChartBar, FaFileAlt } from "react-icons/fa";
import DashboardStats from "../components/superAdmin/DashboardStats";
import ManageAdmin from "../components/superAdmin/ManageAdmin";
import ManageUsers from "../components/superAdmin/ManageUsers";

const actions = [
  {
    name: "Manage Users",
    method: "Edit",
    icon: <FaUsers />,
    color: "bg-blue-100 text-blue-600 border-blue-500",
    component: <ManageUsers />,
  },
  {
    name: "Manage Admin",
    method: "Edit",
    icon: <FaUserShield />,
    color: "bg-blue-100 text-blue-600 border-blue-500",
    component: <ManageAdmin />,
  },

  {
    name: "Dashboard Stats",
    method: "Display",
    icon: <FaChartBar />,
    color: "bg-blue-100 text-blue-600 border-blue-500",
    component: <DashboardStats />,
  },
];

const SuperAdminPanel = () => {
  const [selectedComponent, setSelectedComponent] = useState(
    <DashboardStats />
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen w-full flex flex-col items-center">
      <h2 className="text-3xl font-semibold mb-6 text-[#284980]">
        Super Admin Panel
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
        {actions.map((action, index) => (
          <div
            key={index}
            onClick={() => setSelectedComponent(action.component)}
            className={`flex flex-col items-center p-6 border-l-4 shadow rounded-lg cursor-pointer transition hover:shadow-lg ${action.color}`}
          >
            <div className="text-4xl mb-3">{action.icon}</div>
            <p className="font-semibold text-lg">{action.name}</p>
            <span className="text-sm font-medium uppercase mt-2">
              {action.method}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-6 w-full max-w-4xl p-6 bg-white shadow rounded-lg">
        {selectedComponent}
      </div>
    </div>
  );
};

export default SuperAdminPanel;
