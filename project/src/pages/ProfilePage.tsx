import React, { useState } from 'react';
import { Car, Heart, Settings, Package, History, Star, LogOut, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { parkingSpots } from '../data/mockData';
import ParkingSpotCard from '../components/parking/ParkingSpotCard';

const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('favorites');
  
  // Filter spots for demo purposes
  const favoriteSpots = parkingSpots.filter(spot => spot.isFavorite);
  const contributedSpots = parkingSpots.slice(0, 2); // First 2 spots for demo
  
  const handleLogout = () => {
    logout();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fade-in">
      <div className="md:flex md:gap-8">
        {/* Sidebar */}
        <div className="md:w-64 flex-shrink-0 mb-6 md:mb-0">
          <div className="bg-white p-6 rounded-lg shadow-sm mb-4">
            <div className="flex items-center mb-4">
              <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="font-medium">{user?.name}</h3>
                <p className="text-sm text-gray-600">{user?.email}</p>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between text-sm">
                <div className="text-center">
                  <p className="font-bold text-blue-600">12</p>
                  <p className="text-gray-600">Spots Added</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-blue-600">42</p>
                  <p className="text-gray-600">Updates</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-blue-600">520</p>
                  <p className="text-gray-600">Points</p>
                </div>
              </div>
            </div>
          </div>
          
          <nav className="bg-white rounded-lg shadow-sm overflow-hidden">
            <button
              className={`w-full flex items-center px-4 py-3 gap-3 text-left ${
                activeTab === 'favorites' 
                  ? 'bg-blue-50 text-blue-700 font-medium border-l-4 border-blue-600' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab('favorites')}
            >
              <Heart className="h-5 w-5" />
              <span>Favorite Spots</span>
            </button>
            
            <button
              className={`w-full flex items-center px-4 py-3 gap-3 text-left ${
                activeTab === 'contributed' 
                  ? 'bg-blue-50 text-blue-700 font-medium border-l-4 border-blue-600' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab('contributed')}
            >
              <Car className="h-5 w-5" />
              <span>My Contributions</span>
            </button>
            
            <button
              className={`w-full flex items-center px-4 py-3 gap-3 text-left ${
                activeTab === 'activity' 
                  ? 'bg-blue-50 text-blue-700 font-medium border-l-4 border-blue-600' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab('activity')}
            >
              <History className="h-5 w-5" />
              <span>Recent Activity</span>
            </button>
            
            <button
              className={`w-full flex items-center px-4 py-3 gap-3 text-left ${
                activeTab === 'rewards' 
                  ? 'bg-blue-50 text-blue-700 font-medium border-l-4 border-blue-600' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab('rewards')}
            >
              <Star className="h-5 w-5" />
              <span>Rewards</span>
            </button>
            
            <button
              className={`w-full flex items-center px-4 py-3 gap-3 text-left ${
                activeTab === 'settings' 
                  ? 'bg-blue-50 text-blue-700 font-medium border-l-4 border-blue-600' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab('settings')}
            >
              <Settings className="h-5 w-5" />
              <span>Account Settings</span>
            </button>
            
            <button
              className="w-full flex items-center px-4 py-3 gap-3 text-left text-red-600 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-grow">
          {activeTab === 'favorites' && (
            <div>
              <h2 className="text-xl font-bold mb-4">Favorite Parking Spots</h2>
              {favoriteSpots.length > 0 ? (
                <div className="space-y-4">
                  {favoriteSpots.map(spot => (
                    <ParkingSpotCard 
                      key={spot.id} 
                      spot={spot} 
                      onClick={() => {}} 
                      isSelected={false}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                  <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No favorites yet</h3>
                  <p className="text-gray-600 mb-4">Save parking spots to quickly access them later</p>
                  <button className="btn-primary">Find Parking Spots</button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'contributed' && (
            <div>
              <h2 className="text-xl font-bold mb-4">Spots You've Added</h2>
              {contributedSpots.length > 0 ? (
                <div className="space-y-4">
                  {contributedSpots.map(spot => (
                    <ParkingSpotCard 
                      key={spot.id} 
                      spot={spot} 
                      onClick={() => {}} 
                      isSelected={false}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                  <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">You haven't added any spots yet</h3>
                  <p className="text-gray-600 mb-4">Help the community by adding parking spots you know about</p>
                  <button className="btn-primary">Add a Parking Spot</button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'activity' && (
            <div>
              <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                      <Star className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">You rated Downtown Parking Garage</p>
                      <p className="text-sm text-gray-600">4 stars - "Good location, easy to find"</p>
                      <p className="text-xs text-gray-500 mt-1">2 days ago</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 h-8 w-8 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                      <Car className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">You reported North Shopping Center as available</p>
                      <p className="text-sm text-gray-600">180 of 300 spots available</p>
                      <p className="text-xs text-gray-500 mt-1">1 week ago</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 h-8 w-8 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                      <Heart className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">You saved Central Station Parking to favorites</p>
                      <p className="text-xs text-gray-500 mt-1">2 weeks ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'rewards' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Your Rewards</h2>
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  520 Points
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Rewards Progress</h3>
                  <span className="text-sm text-gray-600">Level 3 - Contributor</span>
                </div>
                <div className="mt-2 h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: '65%' }}></div>
                </div>
                <p className="mt-1 text-sm text-gray-600">180 more points to reach Level 4</p>
              </div>
              
              <h3 className="font-medium mb-3">Available Rewards</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:border-blue-500 transition-colors">
                  <h4 className="font-medium mb-2">Free Parking Voucher</h4>
                  <p className="text-sm text-gray-600 mb-3">Get a free 2-hour parking voucher at any participating location</p>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-600 font-medium">300 points</span>
                    <button className="btn-primary text-sm py-1">Redeem</button>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:border-blue-500 transition-colors">
                  <h4 className="font-medium mb-2">Premium Badge</h4>
                  <p className="text-sm text-gray-600 mb-3">Get a premium badge for your profile to show off your contribution status</p>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-600 font-medium">200 points</span>
                    <button className="btn-primary text-sm py-1">Redeem</button>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:border-blue-500 transition-colors">
                  <h4 className="font-medium mb-2">$5 Gift Card</h4>
                  <p className="text-sm text-gray-600 mb-3">Redeem for a $5 gift card at select coffee shops</p>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-600 font-medium">500 points</span>
                    <button className="btn-secondary text-sm py-1 opacity-50" disabled>Need More Points</button>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:border-blue-500 transition-colors">
                  <h4 className="font-medium mb-2">Monthly Parking Discount</h4>
                  <p className="text-sm text-gray-600 mb-3">Get 15% off monthly parking at participating locations</p>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-600 font-medium">750 points</span>
                    <button className="btn-secondary text-sm py-1 opacity-50" disabled>Need More Points</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h2 className="text-xl font-bold mb-6">Account Settings</h2>
              
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-medium mb-4">Profile Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="input w-full"
                        defaultValue={user?.name || ''}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="input w-full"
                        defaultValue={user?.email || ''}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone (optional)
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="input w-full"
                        placeholder="(123) 456-7890"
                      />
                    </div>
                    
                    <button className="btn-primary">
                      Save Changes
                    </button>
                  </div>
                </div>
                
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-medium mb-4">Notification Preferences</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-gray-600">Receive updates about your favorite spots</p>
                      </div>
                      <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full cursor-pointer">
                        <input
                          type="checkbox"
                          id="toggle-email"
                          name="toggle-email"
                          className="absolute w-0 h-0 opacity-0"
                          defaultChecked
                        />
                        <label
                          htmlFor="toggle-email"
                          className="absolute top-0 left-0 right-0 bottom-0 bg-blue-600 rounded-full transition-all cursor-pointer"
                        >
                          <span className="absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform transform translate-x-6"></span>
                        </label>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Push Notifications</p>
                        <p className="text-sm text-gray-600">Get real-time updates on parking availability</p>
                      </div>
                      <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full cursor-pointer">
                        <input
                          type="checkbox"
                          id="toggle-push"
                          name="toggle-push"
                          className="absolute w-0 h-0 opacity-0"
                        />
                        <label
                          htmlFor="toggle-push"
                          className="absolute top-0 left-0 right-0 bottom-0 bg-gray-300 rounded-full transition-all cursor-pointer"
                        >
                          <span className="absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform"></span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-medium mb-4">Security</h3>
                  <button className="text-blue-600 hover:underline mb-4 block">
                    Change Password
                  </button>
                  <button className="text-red-600 hover:underline">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;