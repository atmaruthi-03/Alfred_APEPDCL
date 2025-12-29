import React, { useState } from 'react';
import { FiActivity, FiCpu, FiAlertTriangle } from 'react-icons/fi';
import andhraMap from '../../assets/andhra.png';
import { sitesData } from '../../sites';

const TelemetryPoint = ({ top, left, status, pulse, siteId }) => {
    const [isHovered, setIsHovered] = useState(false);
    const site = sitesData.find(s => s.id === siteId);
    const siteName = site ? site.name : "Unknown Site";

    const colors = {
        healthy: 'bg-[#1CC8A0]',
        warning: 'bg-orange-500',
        error: 'bg-red-500',
        neutral: 'bg-gray-500'
    };

    const handleClick = () => {
        const event = new CustomEvent('navigate', { 
            detail: { tab: 'sites', siteId: siteId } 
        });
        window.dispatchEvent(event);
    };

    const getStatusLabel = (s) => {
        if (s === 'healthy') return 'Healthy';
        if (s === 'error') return 'Critical';
        if (s === 'warning') return 'Slow';
        return s;
    };

    const statusLabel = getStatusLabel(status);
    const statusColorText = status === 'healthy' ? 'text-[#1CC8A0]' : status === 'error' ? 'text-red-500' : 'text-orange-500';

    return (
        <div 
            className="absolute cursor-pointer group" 
            style={{ top, left }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleClick}
        >
            <div className={`w-3 h-3 rounded-full ${colors[status]} shadow-[0_0_10px_rgba(0,0,0,0.5)] relative`}>
                {pulse && (
                    <div className={`absolute inset-0 rounded-full ${colors[status]} animate-ping opacity-75`}></div>
                )}
            </div>
            
            {/* Tooltip */}
            {isHovered && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-[#1A1B1C] border border-gray-700 rounded-lg z-10 shadow-xl min-w-[100px] text-center pointer-events-none">
                    <div className="text-[10px] font-bold text-white mb-0.5 whitespace-nowrap">{siteName}</div>
                    <div className={`text-[9px] font-bold uppercase tracking-wider ${statusColorText}`}>
                        {statusLabel}
                    </div>
                </div>
            )}
        </div>
    );
};

const ZoneTelemetryMap = () => {
  return (
    <div className="bg-[#151617] rounded-xl p-6 h-full border border-[#2f2f2f] flex flex-col relative overflow-hidden">
      {/* Map Area */}
      <div className="flex-1 relative flex items-center justify-center bg-[#151617] rounded-lg border border-[#2f2f2f]/50 overflow-hidden">
        {/* Background Grid Effect */}
        <div className="absolute inset-0 opacity-10" 
             style={{ backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
        </div>

        {/* Map Image */}
        <div className="relative w-full h-full max-w-[800px] max-h-[900px] flex items-center justify-center">
            <img 
                src={andhraMap} 
                alt="Zone Map" 
                className="w-full h-full object-contain opacity-40 grayscale contrast-125 brightness-75 drop-shadow-[0_0_15px_rgba(28,200,160,0.1)]"
            />
            
            {/* Telemetry Points (Adjusted to be inside map outline) */}
            <TelemetryPoint top="38%" left="60%" status="error" pulse={true} siteId="SITE-004" />
            <TelemetryPoint top="48%" left="42%" status="healthy" pulse={true} siteId="SITE-001" />
            <TelemetryPoint top="59%" left="38%" status="healthy" siteId="SITE-002" />
            <TelemetryPoint top="64%" left="34%" status="warning" siteId="SITE-003" />
        </div>

        {/* Floating Badge */}
        <div className="absolute top-4 left-4 bg-[#0F1011]/80 backdrop-blur-sm border border-[#2f2f2f] px-3 py-1.5 rounded-full flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#1CC8A0] animate-pulse"></div>
            <span className="text-[10px] text-gray-300 uppercase tracking-wide">Real-time Telemetry</span>
        </div>

        {/* Bottom Controls/Legend */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-2 items-end">
             <div className="flex items-center gap-2 bg-[#0F1011]/80 px-3 py-1 rounded-full border border-[#2f2f2f]">
                <div className="w-2 h-2 rounded-full bg-[#1CC8A0]"></div>
                <span className="text-[10px] text-gray-400 uppercase">Healthy Cluster</span>
             </div>
             <div className="flex items-center gap-2 bg-[#0F1011]/80 px-3 py-1 rounded-full border border-[#2f2f2f]">
                <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                <span className="text-[10px] text-gray-400 uppercase">Optimization Required</span>
             </div>
             <div className="flex items-center gap-2 bg-[#0F1011]/80 px-3 py-1 rounded-full border border-[#2f2f2f]">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <span className="text-[10px] text-gray-400 uppercase">AI Risk Alert</span>
             </div>
        </div>

        {/* Bottom Actions */}
        <div className="absolute bottom-4 left-4 flex gap-2">
            <button className="bg-[#112820] text-[#1CC8A0] border border-[#1a4731] text-[10px] px-3 py-1.5 rounded-lg flex items-center gap-2 hover:bg-[#163328] transition-colors">
                <FiActivity /> Track Apex Manufacturing Hub
            </button>
            <button className="bg-[#1d1f20] text-gray-400 border border-[#2f2f2f] text-[10px] px-3 py-1.5 rounded-lg flex items-center gap-2 hover:text-white transition-colors">
                <FiActivity /> Energized sites?
            </button>
        </div>
      </div>
    </div>
  );
};

export default ZoneTelemetryMap;
