import React from 'react';
import { FiCheckCircle, FiAlertTriangle, FiActivity } from 'react-icons/fi';

const SubstationCard = ({ id, name, load, voltage, uptime, status, barColor }) => {
    const getStatusIcon = () => {
        switch (status) {
            case 'critical':
                return <FiAlertTriangle className="text-red-500 text-xl" />;
            case 'warning':
                return <FiActivity className="text-yellow-500 text-xl" />;
            case 'normal':
            default:
                return <FiCheckCircle className="text-[#1CC8A0] text-xl" />;
        }
    };

    return (
        <div className="bg-[#151617] border border-[#2f2f2f] rounded-xl p-5 hover:border-gray-600 transition-colors">
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
                <div>
                    <div className="text-[10px] text-gray-500 font-mono uppercase mb-1">{id}</div>
                    <h3 className="text-white font-bold text-base">{name}</h3>
                </div>
                {getStatusIcon()}
            </div>

            {/* Active Load */}
            <div className="mb-6">
                <div className="flex justify-between items-end mb-2">
                    <span className="text-[10px] text-gray-500 uppercase">Active Load</span>
                    <span className="text-white font-bold text-lg">{load}%</span>
                </div>
                <div className="w-full h-1.5 bg-[#2a2d2f] rounded-full overflow-hidden">
                    <div 
                        className="h-full rounded-full transition-all duration-500"
                        style={{ 
                            width: `${load}%`,
                            backgroundColor: barColor 
                        }}
                    />
                </div>
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-[#2f2f2f] flex justify-between items-center">
                <div>
                    <div className="text-[10px] text-gray-500 uppercase mb-0.5">VOLTAGE</div>
                    <div className="text-gray-300 text-xs font-medium">{voltage}</div>
                </div>
                <div className="text-right">
                    <div className="text-[10px] text-gray-500 uppercase mb-0.5">UPTIME</div>
                    <div className="text-gray-300 text-xs font-medium">{uptime}</div>
                </div>
            </div>
        </div>
    );
};

export default SubstationCard;
