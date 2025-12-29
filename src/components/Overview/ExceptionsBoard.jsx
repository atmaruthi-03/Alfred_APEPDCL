import React from 'react';
import { FiGrid, FiArrowRight, FiFileText, FiAlertCircle, FiCheckCircle, FiClock } from 'react-icons/fi';

const ExceptionCard = ({ id, title, description, status, actionText, icon: Icon }) => {
    const statusStyles = {
        blocked: { bg: 'bg-red-500/10', text: 'text-red-500', border: 'border-red-500/20', label: 'BLOCKED' },
        highRisk: { bg: 'bg-orange-500/10', text: 'text-orange-500', border: 'border-orange-500/20', label: 'HIGH RISK' },
        normal: { bg: 'bg-[#1CC8A0]/10', text: 'text-[#1CC8A0]', border: 'border-[#1CC8A0]/20', label: 'NORMAL' }
    };

    const style = statusStyles[status];

    return (
        <div className="bg-[#151617] border border-[#2f2f2f] rounded-lg p-4 mb-3 hover:border-gray-600 transition-colors group">
            <div className="flex justify-between items-start mb-2">
                <div>
                    <span className="text-[10px] text-gray-500 font-mono">{id}</span>
                    <h4 className="text-sm font-semibold text-gray-200 mt-0.5">{title}</h4>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${style.bg} ${style.text} border ${style.border}`}>
                    {style.label}
                </span>
            </div>
            
            <p className="text-[11px] text-gray-400 mb-4 leading-relaxed">
                {description}
            </p>

            <button className="w-full flex items-center justify-between bg-[#1d1f20] hover:bg-[#252728] border border-[#2f2f2f] rounded px-3 py-2 text-xs text-gray-300 transition-colors group-hover:border-gray-600">
                <div className="flex items-center gap-2">
                    {Icon && <Icon className="text-gray-500" />}
                    <span>{actionText}</span>
                </div>
                <FiArrowRight className="text-gray-500 group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
    );
};

const ExceptionsBoard = () => {
  return (
    <div className="bg-[#151617] rounded-xl p-6 h-full border border-[#2f2f2f] flex flex-col">
      <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar">
        <ExceptionCard 
            id="OBL-006"
            title="Missing Tax Evidence"
            description="Project stalled due to pending GST validation for Phase II."
            status="blocked"
            actionText="Auto-Fetch from Email"
            icon={FiFileText}
        />
        <ExceptionCard 
            id="OBL-009"
            title="Grid Approval Late"
            description="Escalation required: 14 days past standard response window."
            status="highRisk"
            actionText="Draft Regulatory Notice"
            icon={FiAlertCircle}
        />
        <ExceptionCard 
            id="OBL-012"
            title="Inverter Mismatch"
            description="Field report suggests discrepancy in technical capacity."
            status="normal"
            actionText="Verify Spec Sheet"
            icon={FiCheckCircle}
        />
      </div>

      <div className="mt-4 pt-4 border-t border-[#2f2f2f] flex justify-between items-center text-[10px] text-gray-500">
        <div className="flex items-center gap-1">
            <FiClock /> LAST UPDATE: 2M AGO
        </div>
        <button className="hover:text-white transition-colors uppercase font-medium">Clear All</button>
      </div>
    </div>
  );
};

export default ExceptionsBoard;
