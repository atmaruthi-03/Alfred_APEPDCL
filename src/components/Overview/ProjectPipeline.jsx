import React from 'react';

const PipelineStage = ({ label, value, width, color, opacity }) => (
  <div className="flex flex-col items-center mb-4 w-full group cursor-pointer">
    <div className="flex justify-between w-full text-[10px] text-gray-400 mb-1 px-2 uppercase tracking-wider">
      <span>{label}</span>
      <span className="text-[#1CC8A0]">{value}</span>
    </div>
    <div 
      className="h-12 relative transition-all duration-300 hover:brightness-110"
      style={{ width: width }}
    >
        {/* Trapezoid shape using clip-path */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{ 
            backgroundColor: color,
            opacity: opacity,
            clipPath: 'polygon(0 0, 100% 0, 95% 100%, 5% 100%)'
        }}
      />
    </div>
  </div>
);

const ProjectPipeline = () => {
  const stages = [
    { label: 'Sanction', value: 500, width: '100%', opacity: 1 },
    { label: 'Construction', value: 350, width: '85%', opacity: 0.9 },
    { label: 'Net-Metering', value: 120, width: '50%', opacity: 0.8 },
    { label: 'Energized', value: 80, width: '35%', opacity: 0.7 },
    { label: 'CFA Released', value: 45, width: '20%', opacity: 0.6 },
  ];

  return (
    <div className="bg-[#151617] rounded-xl p-6 h-full border border-[#2f2f2f] flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center space-y-2">
        {stages.map((stage, index) => (
          <PipelineStage 
            key={index}
            label={stage.label}
            value={stage.value}
            width={stage.width}
            color="#1CC8A0" // Using the primary green
            opacity={stage.opacity}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectPipeline;
