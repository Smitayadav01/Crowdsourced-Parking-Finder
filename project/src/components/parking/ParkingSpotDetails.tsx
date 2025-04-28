import React from 'react';
import { Star, CircleDollarSign, Clock, Car, Shield, Zap, Wifi, Warehouse, Users } from 'lucide-react';
import { ParkingSpot } from '../../data/mockData';

interface ParkingSpotDetailsProps {
  spot: ParkingSpot;
  onClose: () => void;
}

const ParkingSpotDetails: React.FC<ParkingSpotDetailsProps> = ({ spot, onClose }) => {
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
        return 'Spots Available';
      case 'limited':
        return 'Limited Spots';
      case 'unavailable':
        return 'Currently Full';
      default:
        return 'Unknown';
    }
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case '24/7':
        return <Clock className="h-5 w-5" />;
      case 'security':
        return <Shield className="h-5 w-5" />;
      case 'ev charging':
        return <Zap className="h-5 w-5" />;
      case 'wifi':
        return <Wifi className="h-5 w-5" />;
      case 'covered':
        return <Warehouse className="h-5 w-5" />;
      default:
        return <Car className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Image Gallery */}
      <div className="relative h-48 rounded-lg overflow-hidden">
        <img 
          src={spot.images[0]} 
          alt={spot.name} 
          className="w-full h-full object-cover"
        />
        <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-white text-sm font-medium ${getAvailabilityColor(spot.availability)}`}>
          {getAvailabilityText(spot.availability)}
        </div>
      </div>
      
      {/* Basic Information */}
      <div>
        <h2 className="text-xl font-semibold mb-1">{spot.name}</h2>
        <p className="text-gray-600 mb-3">{spot.address}</p>
        
        <div className="flex items-center space-x-4 mb-3">
          <div className="flex items-center text-yellow-500">
            <Star className="h-5 w-5 fill-current" />
            <span className="ml-1 font-medium">{spot.rating}</span>
            <span className="ml-1 text-gray-500">({spot.reviews})</span>
          </div>
          
          <div className="flex items-center text-gray-700">
            <CircleDollarSign className="h-5 w-5" />
            <span className="ml-1 font-medium">${spot.pricePerHour}/hr</span>
          </div>
        </div>
        
        <div className="py-2 px-3 bg-blue-50 text-blue-800 rounded-md mb-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">{spot.availableSpots} of {spot.totalSpots} spots available</p>
              <p className="text-sm text-blue-600">Updated 5 minutes ago</p>
            </div>
            <Users className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mb-4">
          <button className="btn-primary">
            Get Directions
          </button>
          <button className="btn-secondary">
            Save for Later
          </button>
        </div>
      </div>
      
      {/* Amenities */}
      <div>
        <h3 className="text-lg font-medium mb-3">Amenities</h3>
        <div className="grid grid-cols-2 gap-3">
          {spot.amenities.map((amenity, index) => (
            <div key={index} className="flex items-center p-2 bg-gray-50 rounded-md">
              <div className="mr-2 text-blue-600">
                {getAmenityIcon(amenity)}
              </div>
              <span>{amenity}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Reviews Summary */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-medium">Reviews</h3>
          <button className="text-sm text-blue-600 hover:underline">
            See all {spot.reviews} reviews
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="p-3 bg-gray-50 rounded-md">
            <div className="flex items-center mb-2">
              <div className="flex items-center text-yellow-500">
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4" />
              </div>
              <p className="ml-2 text-sm text-gray-500">2 days ago</p>
            </div>
            <p className="text-sm">"Great location, easy to find and plenty of space. The payment system was simple to use."</p>
            <p className="text-xs text-gray-500 mt-1">- Michael J.</p>
          </div>
          
          <div className="p-3 bg-gray-50 rounded-md">
            <div className="flex items-center mb-2">
              <div className="flex items-center text-yellow-500">
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
              </div>
              <p className="ml-2 text-sm text-gray-500">1 week ago</p>
            </div>
            <p className="text-sm">"I've used this spot multiple times. Always clean and secure. Highly recommend!"</p>
            <p className="text-xs text-gray-500 mt-1">- Sarah T.</p>
          </div>
        </div>
      </div>
      
      {/* Added By */}
      <div className="text-sm text-gray-500">
        <p>Added by {spot.addedBy} on {spot.addedOn}</p>
      </div>
    </div>
  );
};

export default ParkingSpotDetails;