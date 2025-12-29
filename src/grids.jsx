import React from 'react';
import SubstationCard from './components/Grids/SubstationCard';

const Grids = () => {
    const substations = [
        {
            id: 'SS-01',
            name: 'Harbor City Grid',
            load: 88,
            voltage: '33kV',
            uptime: '99.9%',
            status: 'normal',
            barColor: '#fbbf24' // Amber/Yellow
        },
        {
            id: 'SS-02',
            name: 'Steel Plant Zone',
            load: 94,
            voltage: '132kV',
            uptime: '98.2%',
            status: 'critical',
            barColor: '#ef4444' // Red
        },
        {
            id: 'SS-03',
            name: 'Valley West Feeder',
            load: 45,
            voltage: '11kV',
            uptime: '99.9%',
            status: 'normal',
            barColor: '#1CC8A0' // Green
        },
        {
            id: 'SS-04',
            name: 'Northern Hills Link',
            load: 72,
            voltage: '33kV',
            uptime: '94.5%',
            status: 'warning',
            barColor: '#fbbf24' // Amber/Yellow
        },
        {
            id: 'SS-05',
            name: 'Cyber Valley Station',
            load: 60,
            voltage: '33kV',
            uptime: '99.9%',
            status: 'normal',
            barColor: '#1CC8A0' // Green
        }
    ];

    return (
        <div className="h-full w-full p-8 bg-[#0F1011] overflow-y-auto custom-scrollbar">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-white font-bold text-xl">Substation Telemetry</h2>
                <div className="flex gap-3">
                    <div className="bg-[#1d1f20] border border-[#2f2f2f] px-3 py-1.5 rounded text-[10px] text-gray-400 font-medium">
                        Total Nodes: <span className="text-white">142</span>
                    </div>
                    <div className="bg-red-500/10 border border-red-500/20 px-3 py-1.5 rounded text-[10px] text-red-500 font-medium">
                        Active Alerts: <span className="text-red-500">3</span>
                    </div>
                </div>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {substations.map((sub, index) => (
                    <SubstationCard 
                        key={index}
                        {...sub}
                    />
                ))}
            </div>
        </div>
    );
};

export default Grids;
