import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import { Search, Filter, Star, ArrowUpDown, X } from 'lucide-react';
import { parkingSpots, ParkingSpot } from '../data/mockData';
import ParkingSpotCard from '../components/parking/ParkingSpotCard';
import ParkingSpotDetails from '../components/parking/ParkingSpotDetails';

// Custom hook to handle map center updates
function ChangeMapView({ coords }: { coords: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(coords, map.getZoom());
  }, [coords, map]);
  return null;
}

const createIcon = (color: string) => {
  return new Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
};

const availableIcon = createIcon('green');
const limitedIcon = createIcon('orange');
const unavailableIcon = createIcon('red');

const MapPage: React.FC = () => {
  const [filteredSpots, setFilteredSpots] = useState<ParkingSpot[]>(parkingSpots);
  const [selectedSpot, setSelectedSpot] = useState<ParkingSpot | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([40.7128, -74.0060]); // Default to NYC
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10]);
  const [availabilityFilter, setAvailabilityFilter] = useState<string[]>(['available', 'limited', 'unavailable']);
  const [sortBy, setSortBy] = useState<string>('distance');

  // Simulate user location on mount
  useEffect(() => {
    // In a real app, we would use the browser's geolocation API
    const mockUserLocation: [number, number] = [40.7128, -74.0060];
    setMapCenter(mockUserLocation);
  }, []);

  // Handle search and filtering
  useEffect(() => {
    let result = [...parkingSpots];
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(spot => 
        spot.name.toLowerCase().includes(query) || 
        spot.address.toLowerCase().includes(query)
      );
    }
    
    // Filter by availability
    if (availabilityFilter.length < 3) {
      result = result.filter(spot => availabilityFilter.includes(spot.availability));
    }
    
    // Filter by price
    result = result.filter(spot => 
      spot.pricePerHour >= priceRange[0] && spot.pricePerHour <= priceRange[1]
    );
    
    // Sort results
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.pricePerHour - b.pricePerHour);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.pricePerHour - a.pricePerHour);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }
    // 'distance' sorting would require actual distance calculation from user's location
    
    setFilteredSpots(result);
  }, [searchQuery, availabilityFilter, priceRange, sortBy]);

  const handleSpotSelect = (spot: ParkingSpot) => {
    setSelectedSpot(spot);
    setMapCenter(spot.position);
  };

  const handleSpotClose = () => {
    setSelectedSpot(null);
  };

  const getMarkerIcon = (availability: string) => {
    switch (availability) {
      case 'available':
        return availableIcon;
      case 'limited':
        return limitedIcon;
      case 'unavailable':
        return unavailableIcon;
      default:
        return availableIcon;
    }
  };

  const toggleAvailabilityFilter = (status: string) => {
    if (availabilityFilter.includes(status)) {
      setAvailabilityFilter(availabilityFilter.filter(s => s !== status));
    } else {
      setAvailabilityFilter([...availabilityFilter, status]);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <div className="w-full md:w-96 md:h-full overflow-y-auto bg-white border-r border-gray-200 z-10">
        {/* Search and Filters */}
        <div className="sticky top-0 bg-white z-10 border-b border-gray-200 p-4">
          <div className="relative mb-3">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search locations..."
              className="pl-10 w-full input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <button 
              className="flex items-center gap-1 px-3 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </button>
            
            <div className="flex items-center gap-1 px-3 py-2 rounded-md bg-gray-100">
              <ArrowUpDown className="h-4 w-4 text-gray-700" />
              <select 
                className="bg-transparent text-gray-700 focus:outline-none"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="distance">Nearest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
          
          {/* Filter Panel */}
          {isFilterOpen && (
            <div className="mt-3 p-3 bg-gray-50 rounded-md animate-fade-in">
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Availability
                </label>
                <div className="flex gap-2">
                  <button 
                    className={`px-2 py-1 rounded-md text-xs font-medium ${
                      availabilityFilter.includes('available') 
                        ? 'bg-spot-available text-white' 
                        : 'bg-gray-200 text-gray-700'
                    }`}
                    onClick={() => toggleAvailabilityFilter('available')}
                  >
                    Available
                  </button>
                  <button 
                    className={`px-2 py-1 rounded-md text-xs font-medium ${
                      availabilityFilter.includes('limited') 
                        ? 'bg-spot-limited text-white' 
                        : 'bg-gray-200 text-gray-700'
                    }`}
                    onClick={() => toggleAvailabilityFilter('limited')}
                  >
                    Limited
                  </button>
                  <button 
                    className={`px-2 py-1 rounded-md text-xs font-medium ${
                      availabilityFilter.includes('unavailable') 
                        ? 'bg-spot-unavailable text-white' 
                        : 'bg-gray-200 text-gray-700'
                    }`}
                    onClick={() => toggleAvailabilityFilter('unavailable')}
                  >
                    Full
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price Range: ${priceRange[0]} - ${priceRange[1]}
                </label>
                <input
                  type="range"
                  min="0"
                  max="20"
                  step="0.5"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseFloat(e.target.value)])}
                  className="w-full"
                />
              </div>
            </div>
          )}
        </div>
        
        {/* Results List */}
        <div className="p-4">
          <h2 className="text-lg font-medium mb-3">
            {filteredSpots.length} parking spot{filteredSpots.length !== 1 ? 's' : ''} found
          </h2>
          
          <div className="space-y-4">
            {filteredSpots.length > 0 ? (
              filteredSpots.map(spot => (
                <ParkingSpotCard 
                  key={spot.id} 
                  spot={spot} 
                  onClick={() => handleSpotSelect(spot)}
                  isSelected={selectedSpot?.id === spot.id}
                />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No parking spots match your criteria.</p>
                <p>Try adjusting your filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="flex-grow relative">
        <MapContainer 
          center={mapCenter} 
          zoom={14} 
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          {filteredSpots.map(spot => (
            <Marker 
              key={spot.id}
              position={spot.position}
              icon={getMarkerIcon(spot.availability)}
              eventHandlers={{
                click: () => handleSpotSelect(spot),
              }}
            >
              <Popup>
                <div className="text-center">
                  <h3 className="font-medium">{spot.name}</h3>
                  <p className="text-sm text-gray-600">{spot.address}</p>
                  <div className="flex items-center justify-center mt-1 text-yellow-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="ml-1 text-sm">{spot.rating}</span>
                  </div>
                  <p className="mt-1">
                    ${spot.pricePerHour}/hr · {spot.availableSpots} spots
                  </p>
                  <button 
                    className="mt-2 text-sm text-blue-600 hover:underline"
                    onClick={() => handleSpotSelect(spot)}
                  >
                    View Details
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
          
          <ChangeMapView coords={mapCenter} />
        </MapContainer>
      </div>

      {/* Detailed Spot View (Mobile Overlay) */}
      {selectedSpot && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden flex items-end animate-fade-in">
          <div className="bg-white rounded-t-xl w-full max-h-[80vh] overflow-y-auto animate-slide-up">
            <div className="sticky top-0 bg-white p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-medium">Parking Details</h2>
              <button 
                className="p-1 rounded-full hover:bg-gray-100"
                onClick={handleSpotClose}
              >
                <X className="h-6 w-6 text-gray-500" />
              </button>
            </div>
            <div className="p-4">
              <ParkingSpotDetails spot={selectedSpot} onClose={handleSpotClose} />
            </div>
          </div>
        </div>
      )}

      {/* Detailed Spot View (Desktop Slide-in) */}
      {selectedSpot && (
        <div className="hidden md:block absolute top-0 right-0 h-full w-1/3 bg-white shadow-lg z-40 overflow-y-auto animate-slide-in-right">
          <div className="sticky top-0 bg-white p-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-medium">Parking Details</h2>
            <button 
              className="p-1 rounded-full hover:bg-gray-100"
              onClick={handleSpotClose}
            >
              <X className="h-6 w-6 text-gray-500" />
            </button>
          </div>
          <div className="p-4">
            <ParkingSpotDetails spot={selectedSpot} onClose={handleSpotClose} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MapPage;