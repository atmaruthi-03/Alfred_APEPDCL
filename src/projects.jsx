import React from "react";
import { FiFilter, FiDownload, FiExternalLink } from "react-icons/fi";

const projectsData = [
  {
    id: "P-901",
    consumer: "Global Logistics Hub",
    updated: "Updated 2h ago",
    capacity: "100kW",
    vendor: "SolarFlow Ltd",
    progress: 85,
  },
  {
    id: "P-902",
    consumer: "State Tech Campus",
    updated: "Updated 1d ago",
    capacity: "500kW",
    vendor: "GreenGrid Systems",
    progress: 40,
  },
  {
    id: "P-903",
    consumer: "Metro Medical Center",
    updated: "Updated 3d ago",
    capacity: "250kW",
    vendor: "EcoVolt Power",
    progress: 100,
  },
  {
    id: "P-904",
    consumer: "Coastal Steel Works",
    updated: "Updated 5h ago",
    capacity: "75kW",
    vendor: "SolarFlow Ltd",
    progress: 15,
  },
  {
    id: "P-905",
    consumer: "Cinema City Complex",
    updated: "Updated 12h ago",
    capacity: "1.2MW",
    vendor: "Titan Solar",
    progress: 65,
  },
];

export default function Projects() {
  return (
    <div className="p-6 h-full flex flex-col">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Active Deployments</h2>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-[#151617] text-white border border-gray-700 rounded-lg hover:bg-[#1f2021] transition-colors cursor-pointer">
            <FiFilter className="w-4 h-4" />
            <span>Filter</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#1CC8A0] text-black font-medium rounded-lg hover:bg-[#17a885] transition-colors cursor-pointer">
            <FiDownload className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-[#151617] rounded-xl border border-gray-800 flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="p-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Project ID</th>
                <th className="p-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Consumer</th>
                <th className="p-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Capacity</th>
                <th className="p-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Vendor</th>
                <th className="p-6 text-xs font-bold text-gray-500 uppercase tracking-wider w-1/4">Progress</th>
                <th className="p-6 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {projectsData.map((project, index) => (
                <tr key={index} className="hover:bg-[#1a1b1c] transition-colors group">
                  <td className="p-6 text-sm font-medium text-[#1CC8A0]">
                    {project.id}
                  </td>
                  <td className="p-6">
                    <div className="text-sm font-bold text-white">{project.consumer}</div>
                    <div className="text-xs text-gray-500 mt-1">{project.updated}</div>
                  </td>
                  <td className="p-6 text-sm font-medium text-white">
                    {project.capacity}
                  </td>
                  <td className="p-6 text-sm text-gray-400">
                    {project.vendor}
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#1CC8A0] rounded-full"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-bold text-white w-10 text-right">{project.progress}%</span>
                    </div>
                  </td>
                  <td className="p-6 text-right">
                    <button className="p-2 text-gray-400 hover:text-white transition-colors">
                      <FiExternalLink className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
