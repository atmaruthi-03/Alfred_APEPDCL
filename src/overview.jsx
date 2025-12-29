import React from 'react';
import { FiCpu, FiGrid } from 'react-icons/fi';
import ProjectPipeline from './components/Overview/ProjectPipeline';
import ZoneTelemetryMap from './components/Overview/ZoneTelemetryMap';
import ExceptionsBoard from './components/Overview/ExceptionsBoard';

const Overview = () => {
  return (
    <div className="h-full w-full p-6 grid grid-cols-12 gap-6 bg-[#0F1011] overflow-y-auto">
      {/* Left Column: Pipeline (3 cols) */}
      <div className="col-span-3 flex flex-col">
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-white font-bold text-sm tracking-wider flex items-center gap-2">
                <span className="text-[#1CC8A0]">⚡</span> PROJECT PIPELINE
            </h3>
            <span className="text-[10px] text-gray-500 uppercase border border-gray-700 px-2 py-1 rounded">Q3 Active</span>
        </div>
        <div className="flex-1">
            <ProjectPipeline />
        </div>
      </div>

      {/* Center Column: Map (6 cols) */}
      <div className="col-span-6 flex flex-col min-h-[600px]">
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-white font-bold text-sm tracking-wider flex items-center gap-2">
                <FiCpu className="text-[#1CC8A0]" /> ZONE TELEMETRY MAP
            </h3>
            <div className="flex gap-4 text-[10px] font-medium">
                <div className="flex items-center gap-1.5 text-[#1CC8A0]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#1CC8A0]"></div>
                    ONLINE: 1,402
                </div>
                <div className="flex items-center gap-1.5 text-red-500">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                    ERROR: 15
                </div>
            </div>
        </div>
        <div className="flex-1 relative">
            <ZoneTelemetryMap />
        </div>
      </div>

      {/* Right Column: Exceptions (3 cols) */}
      <div className="col-span-3 flex flex-col">
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-white font-bold text-sm tracking-wider flex items-center gap-2">
                <FiGrid className="text-orange-500" /> EXCEPTIONS BOARD
            </h3>
            <span className="text-[10px] bg-orange-500 text-black font-bold px-2 py-1 rounded">Action Req.</span>
        </div>
        <div className="flex-1">
            <ExceptionsBoard />
        </div>
      </div>
    </div>
  );
};

export default Overview;
