import React, { useState } from 'react';
import { FiSearch, FiUser, FiBell } from 'react-icons/fi';
import alfredLogo from './assets/Alfred.png';

const Header = () => {
    return (
        <header className="bg-[#1D1F20] h-16 w-full px-6 border-b border-gray-800 flex items-center justify-between gap-4">
            {/* Left Section: Logo */}
            <div className="flex items-center gap-6 min-w-0">
                <img
                    src={alfredLogo}
                    alt="Alfred Logo"
                    className="h-7 w-auto cursor-pointer"
                />
            </div>

            {/* Center Section: Global Search */}
            <div className="flex flex-1 justify-center max-w-xl">
                <div className="relative w-full group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiSearch className="text-gray-500 text-lg" />
                    </div>
                    <input
                        type="text"
                        placeholder="Ask Alfred"
                        className="bg-[#1e1e1e] text-gray-300 text-sm rounded-full pl-10 pr-16 py-2.5 w-full focus:outline-none focus:ring-1 focus:ring-gray-600 border border-gray-700 placeholder-gray-500 transition-all"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <span className="text-xs text-gray-500 border border-gray-600 rounded px-1.5 py-0.5 bg-[#262626]">Ctrl+K</span>
                    </div>
                </div>
            </div>

            {/* Right Section: Notification & Profile */}
            <div className="flex items-center justify-end gap-x-6 min-w-[100px]">
                <button className="relative text-[#D1D5DB] hover:text-white transition-colors">
                    <FiBell size="1.25rem" />
                </button>

                <button className="text-[#D1D5DB] hover:scale-110 transition-transform">
                    <FiUser size="1.5rem" />
                </button>
            </div>
        </header>
    );
};

export default Header;
