import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-14rem)] flex items-center justify-center px-4 py-12 animate-fade-in">
      <div className="text-center">
        <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-blue-100 mb-6">
          <MapPin className="h-12 w-12 text-blue-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
        <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
          Looks like we've taken a wrong turn. The page you're looking for doesn't exist.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/" className="btn-primary">
            Go Home
          </Link>
          <Link to="/map" className="btn-secondary">
            Find Parking
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;