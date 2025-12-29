import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-[#1D1F20] border-t border-gray-800 py-2 px-6 text-xs text-gray-600 flex justify-center items-center gap-4 w-full z-10">
            <div>
                Alfred by <span className="text-gray-500 font-medium">Pathsetter AI</span> © 2025. All rights reserved.
            </div>
            <a href="#" className="hover:text-gray-400 transition-colors">
                About us
            </a>
        </footer>
    );
};

export default Footer;
