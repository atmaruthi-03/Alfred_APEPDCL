import React, { useState } from "react";
import {
  FiGrid,
  FiMap,
  FiLayers,
  FiPieChart,
  FiChevronLeft,
  FiChevronRight,
  FiHome,
  FiActivity
} from "react-icons/fi";
import Overview from "./overview";
import Grids from "./grids";
import Projects from "./projects";
import Analytics from "./analytics";
import Sites from "./sites";

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [refreshKey, setRefreshKey] = useState(0);
  const [initialSiteId, setInitialSiteId] = useState(null);

  React.useEffect(() => {
    const handleNavigate = (event) => {
      if (event.detail && event.detail.tab) {
        setActiveTab(event.detail.tab);
        if (event.detail.siteId) {
          setInitialSiteId(event.detail.siteId);
        } else {
          setInitialSiteId(null);
        }
        setRefreshKey(prev => prev + 1);
      }
    };

    window.addEventListener('navigate', handleNavigate);
    return () => window.removeEventListener('navigate', handleNavigate);
  }, []);

  const navigationItems = [
    {
      id: "overview",
      text: "Overview",
      icon: <FiActivity />,
      component: <Overview />
    },
    {
      id: "grids",
      text: "Grids",
      icon: <FiGrid />,
      component: <Grids />
    },
    {
      id: "sites",
      text: "Sites",
      icon: <FiMap />,
      component: <Sites initialSiteId={initialSiteId} />
    },
    {
      id: "projects",
      text: "Projects",
      icon: <FiLayers />,
      component: <Projects />
    },
    {
      id: "analytics",
      text: "Analytics",
      icon: <FiPieChart />,
      component: <Analytics />
    },
  ];

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleTabClick = (id) => {
    setInitialSiteId(null);
    if (activeTab === id) {
      setRefreshKey(prev => prev + 1);
    } else {
      setActiveTab(id);
      setRefreshKey(0);
    }
  };

  const activeComponent = navigationItems.find(item => item.id === activeTab)?.component;

  return (
    <div className="flex h-full bg-[#0F1011] text-white">
      {/* Sidebar */}
      <div
        className={`bg-[#151617] transition-all duration-300 ease-in-out flex flex-col border-r border-gray-800 ${
          sidebarOpen ? "w-64" : "w-16"
        }`}
      >
        {/* Project Title */}
        <div className="p-4 mb-2">
          <div className={`font-bold text-xl truncate transition-opacity duration-300 text-[#1CC8A0] ${sidebarOpen ? "opacity-100" : "opacity-0"}`}>
            APEPDCL
          </div>
          <div className={`text-sm text-gray-400 truncate transition-opacity duration-300 ${sidebarOpen ? "opacity-100" : "opacity-0"}`}>
            Solar Command
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-2">
          {navigationItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 cursor-pointer mb-1 transition-all duration-200 group rounded-lg ${
                activeTab === item.id
                  ? "bg-[#112820] text-[#1CC8A0]"
                  : "text-slate-400 hover:text-white hover:bg-[#2f2f2f]"
              }`}
            >
              <div className="flex-shrink-0">
                {React.cloneElement(item.icon, {
                  className: `w-6 h-6 ${
                    activeTab === item.id ? "text-[#1CC8A0]" : "text-slate-400 group-hover:text-white"
                  }`,
                })}
              </div>
              <span
                className={`text-base font-medium transition-all duration-300 ${
                  sidebarOpen ? "opacity-100 w-auto" : "opacity-0 w-0"
                } overflow-hidden whitespace-nowrap`}
              >
                {item.text}
              </span>
            </div>
          ))}
        </nav>

        {/* Collapse Toggle */}
        <div className="p-4 border-t border-[#2f2f2f]">
          <div
            onClick={handleSidebarToggle}
            className="w-full flex items-center gap-3 text-slate-400 cursor-pointer hover:text-white transition-colors duration-200"
            title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            {sidebarOpen ? (
              <FiChevronLeft className="w-6 h-6" />
            ) : (
              <FiChevronRight className="w-6 h-6" />
            )}
            <span
              className={`text-base font-medium transition-all duration-300 ${
                sidebarOpen ? "opacity-100 w-auto" : "opacity-0 w-0"
              } overflow-hidden whitespace-nowrap`}
            >
              Collapse
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Area Placeholder */}
      <div className="flex-1 flex flex-col bg-[#0a0a0a] overflow-hidden">
        {activeComponent && React.cloneElement(activeComponent, { key: `${activeTab}-${refreshKey}` })}
      </div>
    </div>
  );
}
