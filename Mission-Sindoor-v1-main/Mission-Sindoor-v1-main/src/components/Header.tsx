
import React from 'react';
import { Flag } from 'lucide-react';
import { cn } from '@/lib/utils';

const Header = () => {
  return (
    <header className="py-4 border-b border-gray-200 bg-white sticky top-0 z-40">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Flag className="h-6 w-6 text-saffron" />
          <h1 className="text-xl md:text-2xl font-playfair font-bold text-navy">Mission Sindoor</h1>
        </div>
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            <li><a href="#mission" className="text-gray-700 hover:text-saffron transition-colors">Mission</a></li>
            <li><a href="#recognition" className="text-gray-700 hover:text-saffron transition-colors">Recognition</a></li>
            <li><a href="#timeline" className="text-gray-700 hover:text-saffron transition-colors">Timeline</a></li>
            <li><a href="#statements" className="text-gray-700 hover:text-saffron transition-colors">Statements</a></li>
            <li><a href="#gallery" className="text-gray-700 hover:text-saffron transition-colors">Gallery</a></li>
            <li><a href="#gratitude" className="text-gray-700 hover:text-saffron transition-colors">Gratitude</a></li>
          </ul>
        </nav>
        <button className="md:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu">
            <line x1="4" x2="20" y1="12" y2="12"></line>
            <line x1="4" x2="20" y1="6" y2="6"></line>
            <line x1="4" x2="20" y1="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
