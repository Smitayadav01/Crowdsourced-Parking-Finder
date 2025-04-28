import React from 'react';
import { Star, CircleDollarSign } from 'lucide-react';
import { ParkingSpot } from '../../data/mockData';

interface ParkingSpotCardProps {
  spot: ParkingSpot;
  onClick: () => void;
  isSelected: boolean;
}

const ParkingSpotCard: React.FC<ParkingSpotCardProps> = ({ spot, onClick, isSelected }) => {
  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available':
        return 'bg-spot-available';
      case 'limited':
        return 'bg-spot-limited';
      case 'unavailable':
        return 'bg-spot-unavailable';
      default:
        return 'bg-gray-400';
    }
  };

  const getAvailabilityText = (availability: string) => {
    switch (availability) {
      case 'available':
        return 'Available';
      case 'limited':
        return 'Limited';
      case 'unavailable':
        return 'Full';
      default:
        return 'Unknown';
    }
  };

  return (
    <div 
      className={`card cursor-pointer transition-all ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      onClick={onClick}
    >
      <div className="flex gap-3">
        {/* Image */}
        <div className="w-24 h-24 flex-shrink-0 rounded-md overflow-hidden">
          <img
            src={spot.images[0]}
            alt={spot.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Content */}
        <div className="flex-grow">
          <h3 className="font-medium">{spot.name}</h3>
          <p className="text-sm text-gray-600 mb-2">{spot.address}</p>
          
          <div className="flex items-center text-sm mb-1">
            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium text-white ${getAvailabilityColor(spot.availability)}`}>
              {getAvailabilityText(spot.availability)}
            </span>
            <span className="mx-2 text-gray-400">•</span>
            <div className="flex items-center text-yellow-500">
              <Star className="h-4 w-4 fill-current" />
              <span className="ml-1">{spot.rating}</span>
            </div>
            <span className="mx-2 text-gray-400">•</span>
            <div className="flex items-center text-gray-700">
              <CircleDollarSign className="h-4 w-4" />
              <span className="ml-1">${spot.pricePerHour}/hr</span>
            </div>
          </div>
          
          <p className="text-sm text-gray-600">
            {spot.availableSpots} of {spot.totalSpots} spots available
          </p>
        </div>
      </div>
    </div>
  );
};

export default ParkingSpotCard;