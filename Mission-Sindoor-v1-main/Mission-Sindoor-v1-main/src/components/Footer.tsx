
import React from 'react';
import { Flag } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-navy text-white py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Flag className="h-6 w-6 text-saffron" />
              <h2 className="text-xl font-playfair font-bold">Mission Sindoor</h2>
            </div>
            <p className="text-gray-300">
              Honoring India's precision strike operation and the brave personnel who executed it.
            </p>
          </div>
          
          <div>
            <h3 className="font-playfair font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#mission" className="text-gray-300 hover:text-white transition-colors">Mission Context</a></li>
              <li><a href="#recognition" className="text-gray-300 hover:text-white transition-colors">Recognition</a></li>
              <li><a href="#timeline" className="text-gray-300 hover:text-white transition-colors">Timeline</a></li>
              <li><a href="#statements" className="text-gray-300 hover:text-white transition-colors">Official Statements</a></li>
              <li><a href="#gallery" className="text-gray-300 hover:text-white transition-colors">Gallery</a></li>
              <li><a href="#gratitude" className="text-gray-300 hover:text-white transition-colors">Gratitude Wall</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-playfair font-semibold text-lg mb-4">Official Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Defense Ministry</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Indian Armed Forces</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Government Press Release</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-700 text-center text-gray-400">
          <div className="h-2 bg-gradient-to-r from-saffron via-white to-indian-green mb-6"></div>
          <p>© {new Date().getFullYear()} Mission Sindoor: A Salute to India's Precision Strike</p>
          <p className="mt-2 text-sm">Information presented for commemorative purposes. Official details subject to national security protocols.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
