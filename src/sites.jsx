import React, { useState } from "react";
import { 
  FiMapPin, 
  FiChevronRight, 
  FiArrowLeft, 
  FiCheckCircle, 
  FiActivity, 
  FiClock, 
  FiDownload,
  FiCpu,
  FiUser
} from "react-icons/fi";

export const sitesData = [
  {
    id: "SITE-001",
    name: "Apex Manufacturing Hub",
    location: "Bheemunipatnam",
    type: "Industrial",
    stage: "NET-METERING",
    progress: 75,
    capacity: "2.5 MW",
    gridHealth: "98.4%",
    installType: "Industrial",
    vendor: {
      epc: "EcoPower Systems Ltd.",
      license: "EPDCL-332-A",
      manager: "K. Venkat Rao"
    },
    timeline: [
      {
        title: "Sanction",
        date: "2023-11-12",
        status: "COMPLETED",
        items: ["Project ID generated", "DISCOM feasibility approved"]
      },
      {
        title: "Construction",
        date: "2024-01-20",
        status: "COMPLETED",
        items: ["Module installation finished", "Inverter wiring certified"]
      },
      {
        title: "Commissioning",
        date: "2024-02-15",
        status: "COMPLETED",
        items: ["Internal testing complete", "Vendor handover signed"]
      },
      {
        title: "Net-Metering",
        date: "Current Stage",
        status: "CURRENT",
        items: ["Awaiting bidirectional meter sync", "Test report submitted to EPDCL"]
      },
      {
        title: "Energized",
        date: "Pending",
        status: "PENDING",
        items: []
      }
    ]
  },
  {
    id: "SITE-002",
    name: "TechPark One",
    location: "Rushikonda",
    type: "Commercial",
    stage: "CONSTRUCTION",
    progress: 40,
    capacity: "1.2 MW",
    gridHealth: "99.1%",
    installType: "Commercial",
    vendor: {
      epc: "SolarTech Solutions",
      license: "EPDCL-105-B",
      manager: "P. Suresh"
    },
    timeline: [
      { title: "Sanction", date: "2023-12-01", status: "COMPLETED", items: [] },
      { title: "Construction", date: "Current Stage", status: "CURRENT", items: ["Foundation work in progress"] },
      { title: "Commissioning", date: "Pending", status: "PENDING", items: [] },
      { title: "Net-Metering", date: "Pending", status: "PENDING", items: [] },
      { title: "Energized", date: "Pending", status: "PENDING", items: [] }
    ]
  },
  {
    id: "SITE-003",
    name: "GreenValley Township",
    location: "Siripuram",
    type: "Residential",
    stage: "CFA",
    progress: 90,
    capacity: "500 kW",
    gridHealth: "97.8%",
    installType: "Residential",
    vendor: {
      epc: "GreenHome Energy",
      license: "EPDCL-442-C",
      manager: "M. Lakshmi"
    },
    timeline: [
      { title: "Sanction", date: "2023-10-15", status: "COMPLETED", items: [] },
      { title: "Construction", date: "2023-12-20", status: "COMPLETED", items: [] },
      { title: "Commissioning", date: "2024-01-10", status: "COMPLETED", items: [] },
      { title: "Net-Metering", date: "2024-01-25", status: "COMPLETED", items: [] },
      { title: "Energized", date: "2024-02-01", status: "COMPLETED", items: [] },
      { title: "CFA", date: "Current Stage", status: "CURRENT", items: ["Subsidy processing"] }
    ]
  },
  {
    id: "SITE-004",
    name: "Eastern Grid Station",
    location: "Anakapalle",
    type: "Utility",
    stage: "NOT STARTED",
    progress: 0,
    capacity: "5.0 MW",
    gridHealth: "N/A",
    installType: "Utility Scale",
    vendor: {
      epc: "Pending Allocation",
      license: "N/A",
      manager: "N/A"
    },
    timeline: [
      { title: "Sanction", date: "Pending", status: "PENDING", items: [] },
      { title: "Construction", date: "Pending", status: "PENDING", items: [] },
      { title: "Commissioning", date: "Pending", status: "PENDING", items: [] },
      { title: "Net-Metering", date: "Pending", status: "PENDING", items: [] },
      { title: "Energized", date: "Pending", status: "PENDING", items: [] }
    ]
  }
];

export default function Sites({ initialSiteId }) {
  const [selectedSite, setSelectedSite] = useState(
    initialSiteId ? sitesData.find(s => s.id === initialSiteId) : null
  );

  if (selectedSite) {
    return <SiteDetail site={selectedSite} onBack={() => setSelectedSite(null)} />;
  }

  return <SiteList onSelect={setSelectedSite} />;
}

function SiteList({ onSelect }) {
  return (
    <div className="flex flex-col h-full bg-[#0F1011]">
      {/* Header */}
      <div className="flex-none p-6 pb-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-white mb-1">Site Registry</h2>
            <p className="text-sm text-gray-400">Registry of all sanctioned solar assets and field progress</p>
          </div>
          <div className="px-4 py-1.5 bg-[#151617] text-gray-400 text-sm border border-gray-800 rounded hover:text-white transition-colors">
            Total: {sitesData.length} Sites
          </div>
        </div>
      </div>

      {/* Scrollable Grid */}
      <div className="flex-1 overflow-y-auto p-6 pt-0 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sitesData.map((site) => (
          <div 
            key={site.id} 
            className="bg-[#151617] rounded-xl border border-gray-800 p-6 hover:border-gray-600 transition-colors cursor-pointer group"
            onClick={() => onSelect(site)}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">{site.id}</div>
              <div className="px-2 py-1 bg-[#1A1B1C] border border-gray-700 rounded text-[10px] font-bold text-gray-300 uppercase">
                {site.type}
              </div>
            </div>
            
            <h3 className="text-lg font-bold text-white mb-2">{site.name}</h3>
            
            <div className="flex items-center gap-2 text-gray-400 text-sm mb-8">
              <FiMapPin className="w-4 h-4" />
              <span>{site.location}</span>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-end mb-2">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">CURRENT STAGE</span>
                <span className="text-[10px] font-bold text-[#1CC8A0] uppercase tracking-wider">{site.stage}</span>
              </div>
              <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#1CC8A0] rounded-full"
                  style={{ width: `${site.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-gray-800 group-hover:border-gray-700 transition-colors">
              <span className="text-sm text-gray-400">Track progress</span>
              <FiChevronRight className="text-gray-400 group-hover:text-white transition-colors" />
            </div>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}

function SiteDetail({ site, onBack }) {
  return (
    <div className="p-6 h-full flex flex-col bg-[#0F1011] overflow-y-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={onBack}
          className="p-2 bg-[#151617] border border-gray-800 rounded-lg text-gray-400 hover:text-white hover:border-gray-600 transition-colors"
        >
          <FiArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-xl font-bold text-white">{site.name}</h2>
          <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
            <FiMapPin className="w-3 h-3" />
            <span>{site.location}</span>
            <span>•</span>
            <span>{site.capacity}</span>
            <span>•</span>
            <span>{site.id}</span>
          </div>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Left Column: Timeline */}
        <div className="flex-1">
          <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-4">LIFECYCLE TIMELINE</div>
          
          <div className="relative pl-4">
            {/* Vertical Line */}
            <div className="absolute left-[23px] top-4 bottom-4 w-px bg-gray-800"></div>

            <div className="space-y-4">
              {site.timeline.map((event, index) => {
                let statusColor = "text-gray-600";
                let borderColor = "border-gray-800";
                let icon = <FiClock className="w-4 h-4" />;
                let badge = null;

                if (event.status === "COMPLETED") {
                  statusColor = "text-[#1CC8A0]";
                  borderColor = "border-gray-800"; // Keep card border subtle
                  icon = <FiCheckCircle className="w-5 h-5 text-[#1CC8A0] bg-[#0F1011]" />;
                  badge = <span className="px-2 py-0.5 bg-[#112820] text-[#1CC8A0] text-[10px] font-bold rounded border border-[#112820]">COMPLETED</span>;
                } else if (event.status === "CURRENT") {
                  statusColor = "text-[#1CC8A0]";
                  borderColor = "border-[#1CC8A0]/50";
                  icon = <FiActivity className="w-5 h-5 text-[#1CC8A0] bg-[#0F1011]" />;
                  badge = <span className="px-2 py-0.5 bg-[#112820] text-[#1CC8A0] text-[10px] font-bold rounded border border-[#1CC8A0]/30">CURRENT</span>;
                } else {
                   icon = <FiClock className="w-5 h-5 text-gray-600 bg-[#0F1011]" />;
                }

                return (
                  <div key={index} className="relative flex gap-6">
                    {/* Timeline Icon */}
                    <div className="relative z-10 pt-6">
                      {icon}
                    </div>

                    {/* Card */}
                    <div className={`flex-1 bg-[#151617] rounded-lg border ${borderColor} p-5`}>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-base font-bold text-white">{event.title}</h3>
                        {badge}
                      </div>
                      <div className="text-xs text-gray-500 mb-3">{event.date}</div>
                      
                      {event.items.length > 0 && (
                        <ul className="space-y-1">
                          {event.items.map((item, i) => (
                            <li key={i} className="flex items-center gap-2 text-xs text-gray-400">
                              <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Info Cards */}
        <div className="w-96 space-y-6">
          {/* Site Intelligence */}
          <div className="bg-[#151617] rounded-xl border border-gray-800 p-6">
            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-6">SITE INTELLIGENCE</div>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center py-2 border-b border-gray-800">
                <span className="text-sm text-gray-400">Install Type</span>
                <span className="text-sm font-bold text-[#1CC8A0]">{site.installType}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-800">
                <span className="text-sm text-gray-400">Peak Output</span>
                <span className="text-sm font-bold text-white">{site.capacity}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-800">
                <span className="text-sm text-gray-400">Grid Health</span>
                <span className="text-sm font-bold text-[#1CC8A0]">{site.gridHealth}</span>
              </div>
            </div>

            <button className="w-full flex items-center justify-center gap-2 py-3 bg-[#1CC8A0] hover:bg-[#17a885] text-white font-bold text-sm rounded-lg transition-colors">
              <FiDownload className="w-4 h-4" />
              <span>Download Site Log</span>
            </button>
          </div>

          {/* Vendor Details */}
          <div className="bg-[#151617] rounded-xl border border-gray-800 p-6">
            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-6">VENDOR DETAILS</div>
            
            <div className="space-y-3">
              <div>
                <div className="text-[10px] text-gray-500 mb-1">Primary EPC: <span className="text-white font-bold">{site.vendor.epc}</span></div>
              </div>
              <div>
                <div className="text-[10px] text-gray-500 mb-1">License: <span className="text-white font-bold">{site.vendor.license}</span></div>
              </div>
              <div>
                <div className="text-[10px] text-gray-500 mb-1">Project Manager: <span className="text-white font-bold">{site.vendor.manager}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
