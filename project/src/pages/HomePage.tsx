import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, ParkingSquare, Users, ThumbsUp, Navigation } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative bg-blue-600 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 opacity-90"></div>
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{
              backgroundImage: "url('https://images.pexels.com/photos/808910/pexels-photo-808910.jpeg')",
              backgroundBlendMode: "overlay",
              filter: "brightness(50%)"
            }}
          ></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Find the perfect parking spot in seconds
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              ParkSpot helps you discover available parking spaces shared by our community of users in real-time.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/map" className="btn-primary bg-white text-blue-600 hover:bg-blue-50">
                <MapPin className="inline-block mr-2 h-5 w-5" />
                Find Parking
              </Link>
              <Link to="/register" className="btn-primary bg-transparent border-2 border-white hover:bg-white/10">
                Join Our Community
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4">
              <p className="text-3xl font-bold text-blue-600 mb-2">10,000+</p>
              <p className="text-gray-600">Parking Spots</p>
            </div>
            <div className="p-4">
              <p className="text-3xl font-bold text-blue-600 mb-2">50,000+</p>
              <p className="text-gray-600">Happy Users</p>
            </div>
            <div className="p-4">
              <p className="text-3xl font-bold text-blue-600 mb-2">500+</p>
              <p className="text-gray-600">Cities Covered</p>
            </div>
            <div className="p-4">
              <p className="text-3xl font-bold text-blue-600 mb-2">4.8/5</p>
              <p className="text-gray-600">User Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How ParkSpot Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Finding parking has never been easier with our crowdsourced approach
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                <MapPin className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Locate Spots</h3>
              <p className="text-gray-600">
                Use our interactive map to find available parking spots near your destination
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                <Navigation className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Navigate & Park</h3>
              <p className="text-gray-600">
                Get directions to your chosen spot and real-time availability updates
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                <ThumbsUp className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Share & Rate</h3>
              <p className="text-gray-600">
                Report spot availability and rate your experience to help other drivers
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose ParkSpot</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform offers unique features designed to make parking stress-free
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 mt-1">
                <div className="flex items-center justify-center h-10 w-10 rounded-md bg-blue-600 text-white">
                  <Users className="h-6 w-6" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Community-Powered</h3>
                <p className="text-gray-600">
                  Our users help each other by sharing real-time parking availability
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 mt-1">
                <div className="flex items-center justify-center h-10 w-10 rounded-md bg-blue-600 text-white">
                  <ParkingSquare className="h-6 w-6" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Comprehensive Details</h3>
                <p className="text-gray-600">
                  View pricing, hours, amenities, and photos before arriving
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 mt-1">
                <div className="flex items-center justify-center h-10 w-10 rounded-md bg-blue-600 text-white">
                  <Star className="h-6 w-6" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Ratings & Reviews</h3>
                <p className="text-gray-600">
                  Read honest feedback from other drivers about each parking location
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 mt-1">
                <div className="flex items-center justify-center h-10 w-10 rounded-md bg-blue-600 text-white">
                  <MapPin className="h-6 w-6" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Smart Filtering</h3>
                <p className="text-gray-600">
                  Find parking that matches your preferences for price, distance, and amenities
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 mt-1">
                <div className="flex items-center justify-center h-10 w-10 rounded-md bg-blue-600 text-white">
                  <Navigation className="h-6 w-6" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Navigation</h3>
                <p className="text-gray-600">
                  Get turn-by-turn directions to your selected parking spot
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 mt-1">
                <div className="flex items-center justify-center h-10 w-10 rounded-md bg-blue-600 text-white">
                  <ThumbsUp className="h-6 w-6" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Contribution Rewards</h3>
                <p className="text-gray-600">
                  Earn points and rewards for reporting spot availability and adding new locations
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to find parking?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of users who save time and reduce stress with ParkSpot
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/map" className="btn-primary bg-white text-blue-600 hover:bg-blue-50">
              Find Parking Now
            </Link>
            <Link to="/register" className="btn-primary bg-transparent border-2 border-white hover:bg-white/10">
              Create an Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;