import React, { useState, useRef, useMemo } from "react";
import { FiTrendingUp, FiFeather, FiDollarSign, FiCalendar } from "react-icons/fi";

export default function Analytics() {
  const [hoverData, setHoverData] = useState(null);
  const chartRef = useRef(null);

  // Configuration
  const width = 1000; // Internal SVG coordinate system width
  const height = 300; // Internal SVG coordinate system height
  const maxY = 600; // Max kW value corresponding to height 0 (top)

  // Helper to map value to Y coordinate
  const getY = (val) => height - (val / maxY) * height;

  // Math functions for curves
  const getGenValue = (xRatio) => {
    // Gaussian peak at 40% (12:00), max 450kW
    // xRatio is 0..1
    const peak = 450;
    const center = 0.4;
    const sigma = 0.18;
    return peak * Math.exp(-Math.pow(xRatio - center, 2) / (2 * sigma * sigma));
  };

  const getConsValue = (xRatio) => {
    // Linear increase from ~100 to ~300
    return 100 + (200 * xRatio);
  };

  // Generate SVG paths
  const { genPath, consPath, areaPath } = useMemo(() => {
    let genD = `M 0 ${getY(getGenValue(0))}`;
    let consD = `M 0 ${getY(getConsValue(0))}`;
    let areaD = `M 0 ${height}`; // Start at bottom-left

    const steps = 100;
    for (let i = 0; i <= steps; i++) {
      const xRatio = i / steps;
      const x = xRatio * width;
      const genY = getY(getGenValue(xRatio));
      const consY = getY(getConsValue(xRatio));
      
      genD += ` L ${x} ${genY}`;
      consD += ` L ${x} ${consY}`;
      areaD += ` L ${x} ${genY}`;
    }
    
    areaD += ` L ${width} ${height} Z`; // Close area path

    return { genPath: genD, consPath: consD, areaPath: areaD };
  }, []);

  const handleMouseMove = (e) => {
    if (!chartRef.current) return;
    const rect = chartRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const xRatio = Math.max(0, Math.min(1, x / rect.width));
    
    const gen = getGenValue(xRatio);
    const cons = getConsValue(xRatio);
    
    // Calculate time
    const totalMinutes = 15 * 60; // 06:00 to 21:00
    const minutes = Math.floor(xRatio * totalMinutes);
    const hour = Math.floor(6 + minutes / 60);
    const minute = minutes % 60;
    const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;

    setHoverData({
      xRatio,
      gen,
      cons,
      time: timeStr,
      left: x // Pixel position for tooltip
    });
  };

  const handleMouseLeave = () => {
    setHoverData(null);
  };

  return (
    <div className="p-6 h-full flex flex-col overflow-y-auto bg-[#0F1011]">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">System Performance Analytics</h2>
        <button className="px-4 py-1.5 bg-[#151617] text-gray-400 text-sm border border-gray-800 rounded hover:text-white transition-colors">
          Last 24 Hours
        </button>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        {/* Total Generation */}
        <div className="bg-[#151617] p-6 rounded-xl border border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-[#112820] rounded-lg">
              <FiTrendingUp className="w-5 h-5 text-[#1CC8A0]" />
            </div>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Generation</span>
          </div>
          <div className="text-3xl font-bold text-white mb-1">4.2 MWh</div>
          <div className="text-xs text-gray-500 font-medium">+12% VS PREV DAY</div>
        </div>

        {/* CO2 Offset */}
        <div className="bg-[#151617] p-6 rounded-xl border border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-[#112820] rounded-lg">
              <FiFeather className="w-5 h-5 text-[#1CC8A0]" />
            </div>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">CO2 Offset</span>
          </div>
          <div className="text-3xl font-bold text-white mb-1">2.8 Tons</div>
          <div className="text-xs text-gray-500 font-medium">CARBON CREDITS EARNED</div>
        </div>

        {/* Net Savings */}
        <div className="bg-[#151617] p-6 rounded-xl border border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-[#2A2215] rounded-lg">
              <FiDollarSign className="w-5 h-5 text-[#F59E0B]" />
            </div>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Net Savings</span>
          </div>
          <div className="text-3xl font-bold text-white mb-1">₹ 2.4L</div>
          <div className="text-xs text-gray-500 font-medium">UTILITY COST REDUCTION</div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="flex-1 bg-[#151617] rounded-xl border border-gray-800 p-6 flex flex-col">
        <div className="text-xs font-bold text-white uppercase tracking-wider mb-8">Generation vs. Consumption Profile</div>
        
        <div className="flex-1 relative w-full min-h-[300px]">
          {/* Y-Axis Labels */}
          <div className="absolute left-0 top-0 bottom-8 w-12 flex flex-col justify-between text-[10px] text-gray-600 font-medium text-right pr-2">
            <span>600kW</span>
            <span>450kW</span>
            <span>300kW</span>
            <span>150kW</span>
            <span>0kW</span>
          </div>

          {/* Chart Area */}
          <div 
            ref={chartRef}
            className="absolute left-12 right-0 top-0 bottom-8 cursor-crosshair"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Grid Lines */}
            <div className="w-full h-full flex flex-col justify-between pointer-events-none">
              <div className="w-full h-px bg-gray-800/50 border-t border-dashed border-gray-800"></div>
              <div className="w-full h-px bg-gray-800/50 border-t border-dashed border-gray-800"></div>
              <div className="w-full h-px bg-gray-800/50 border-t border-dashed border-gray-800"></div>
              <div className="w-full h-px bg-gray-800/50 border-t border-dashed border-gray-800"></div>
              <div className="w-full h-px bg-gray-700"></div>
            </div>

            {/* SVG Chart */}
            <svg 
              className="absolute inset-0 w-full h-full overflow-visible pointer-events-none" 
              viewBox={`0 0 ${width} ${height}`}
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1CC8A0" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#1CC8A0" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Green Area (Generation) */}
              <path
                d={areaPath}
                fill="url(#greenGradient)"
                className="w-full h-full"
                vectorEffect="non-scaling-stroke"
              />
              
              {/* Green Line (Generation) */}
              <path
                d={genPath}
                fill="none"
                stroke="#1CC8A0"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              />

              {/* Red Dashed Line (Consumption) */}
              <path
                d={consPath}
                fill="none"
                stroke="#EF4444"
                strokeWidth="2"
                strokeDasharray="4 4"
                vectorEffect="non-scaling-stroke"
              />

              {/* Interactive Elements */}
              {hoverData && (
                <>
                  {/* Vertical Line */}
                  <line
                    x1={hoverData.xRatio * width}
                    y1="0"
                    x2={hoverData.xRatio * width}
                    y2={height}
                    stroke="white"
                    strokeWidth="1"
                    strokeOpacity="0.5"
                    vectorEffect="non-scaling-stroke"
                  />

                  {/* Points on Line */}
                  <circle 
                    cx={hoverData.xRatio * width} 
                    cy={getY(hoverData.gen)} 
                    r="4" 
                    fill="#151617" 
                    stroke="#1CC8A0" 
                    strokeWidth="2" 
                    vectorEffect="non-scaling-stroke"
                  />
                  <circle 
                    cx={hoverData.xRatio * width} 
                    cy={getY(hoverData.cons)} 
                    r="4" 
                    fill="#151617" 
                    stroke="#EF4444" 
                    strokeWidth="2" 
                    vectorEffect="non-scaling-stroke"
                  />
                </>
              )}
            </svg>

            {/* Tooltip */}
            {hoverData && (
              <div 
                className="absolute top-[50%] -translate-y-1/2 bg-[#1A1B1C] border border-gray-700 p-3 rounded-lg shadow-xl z-10 w-32 pointer-events-none"
                style={{ 
                  left: hoverData.left + 20,
                  transform: `translate(${hoverData.left > chartRef.current?.clientWidth - 150 ? '-100%' : '0'}, -50%)`
                }}
              >
                <div className="text-xs text-gray-400 mb-2">{hoverData.time}</div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] text-[#1CC8A0] font-bold">Gen:</span>
                  <span className="text-[10px] text-white font-bold">{Math.round(hoverData.gen)} kW</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-[#EF4444] font-bold">Cons:</span>
                  <span className="text-[10px] text-white font-bold">{Math.round(hoverData.cons)} kW</span>
                </div>
              </div>
            )}
          </div>

          {/* X-Axis Labels */}
          <div className="absolute left-12 right-0 bottom-0 h-8 flex justify-between items-end text-[10px] text-gray-600 font-medium px-2">
            <span>06:00</span>
            <span>09:00</span>
            <span>12:00</span>
            <span>15:00</span>
            <span>18:00</span>
            <span>21:00</span>
          </div>
        </div>
      </div>
    </div>
  );
}
