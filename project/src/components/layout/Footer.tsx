import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Car className="h-6 w-6 text-purple-400" />
            <span className="text-xl font-bold">ParkSpot</span>
          </div>
          
          <nav className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2 text-sm">
            <Link to="/" className="hover:text-purple-400 transition-colors">Home</Link>
            <Link to="/map" className="hover:text-purple-400 transition-colors">Find Parking</Link>
            <a href="#" className="hover:text-purple-400 transition-colors">About Us</a>
            <a href="#" className="hover:text-purple-400 transition-colors">How It Works</a>
            <a href="#" className="hover:text-purple-400 transition-colors">Contact</a>
            <a href="#" className="hover:text-purple-400 transition-colors">Privacy Policy</a>
          </nav>
        </div>
        
        <hr className="border-gray-700 my-4" />
        
        <div className="md:flex md:items-center md:justify-between text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} ParkSpot. All rights reserved.</p>
          
          <div className="flex items-center justify-center md:justify-end gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer
