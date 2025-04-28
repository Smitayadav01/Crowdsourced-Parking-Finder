import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Upload, Plus, Minus, Check } from 'lucide-react';

interface FormData {
  name: string;
  address: string;
  latitude: string;
  longitude: string;
  pricePerHour: string;
  totalSpots: number;
  availableSpots: number;
  description: string;
  amenities: string[];
  images: File[];
}

const availableAmenities = [
  '24/7',
  'Security',
  'EV Charging',
  'Covered',
  'Uncovered',
  'Wheelchair Accessible',
  'Well Lit',
  'Valet',
  'Self-Park',
  'Monthly Available'
];

const AddSpotPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    address: '',
    latitude: '',
    longitude: '',
    pricePerHour: '',
    totalSpots: 1,
    availableSpots: 1,
    description: '',
    amenities: [],
    images: []
  });
  
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleNumberChange = (field: 'totalSpots' | 'availableSpots', increment: boolean) => {
    const currentValue = formData[field];
    const newValue = increment ? currentValue + 1 : Math.max(1, currentValue - 1);
    
    setFormData({
      ...formData,
      [field]: newValue,
      // Ensure availableSpots doesn't exceed totalSpots
      ...(field === 'totalSpots' && newValue < formData.availableSpots 
        ? { availableSpots: newValue } 
        : {})
    });
  };

  const handleAmenityToggle = (amenity: string) => {
    const currentAmenities = [...formData.amenities];
    
    if (currentAmenities.includes(amenity)) {
      setFormData({
        ...formData,
        amenities: currentAmenities.filter(a => a !== amenity)
      });
    } else {
      setFormData({
        ...formData,
        amenities: [...currentAmenities, amenity]
      });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    const newFiles = Array.from(files);
    const newImages = [...formData.images, ...newFiles];
    
    // Generate preview URLs for new images
    const newPreviewUrls = newFiles.map(file => URL.createObjectURL(file));
    
    setFormData({
      ...formData,
      images: newImages
    });
    
    setImagePreviewUrls([...imagePreviewUrls, ...newPreviewUrls]);
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...formData.images];
    const newPreviewUrls = [...imagePreviewUrls];
    
    newImages.splice(index, 1);
    
    // Release object URL to avoid memory leaks
    URL.revokeObjectURL(newPreviewUrls[index]);
    newPreviewUrls.splice(index, 1);
    
    setFormData({
      ...formData,
      images: newImages
    });
    
    setImagePreviewUrls(newPreviewUrls);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('submitting');
    
    // In a real app, this would send data to the server
    // For now, we'll simulate a submission
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      
      // Show success status briefly before redirecting
      setTimeout(() => {
        navigate('/map');
      }, 1500);
    } catch (error) {
      setSubmitStatus('error');
    }
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData({
            ...formData,
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString()
          });
        },
        (error) => {
          console.error("Error getting current location:", error);
        }
      );
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 animate-fade-in">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold mb-6">Add a New Parking Spot</h1>
        
        {submitStatus === 'success' && (
          <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-md flex items-center">
            <Check className="h-5 w-5 mr-2" />
            <span>Parking spot successfully added! Redirecting to map...</span>
          </div>
        )}
        
        {submitStatus === 'error' && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-md">
            Something went wrong. Please try again.
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div>
            <h2 className="text-lg font-medium mb-4">Basic Information</h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Parking Spot Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="input w-full"
                  placeholder="e.g., Downtown Garage, Main Street Parking"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  required
                  className="input w-full"
                  placeholder="123 Main St, City, State, Zip"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="latitude" className="block text-sm font-medium text-gray-700 mb-1">
                    Latitude
                  </label>
                  <input
                    type="text"
                    id="latitude"
                    name="latitude"
                    required
                    className="input w-full"
                    placeholder="e.g., 40.7128"
                    value={formData.latitude}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div>
                  <label htmlFor="longitude" className="block text-sm font-medium text-gray-700 mb-1">
                    Longitude
                  </label>
                  <input
                    type="text"
                    id="longitude"
                    name="longitude"
                    required
                    className="input w-full"
                    placeholder="e.g., -74.0060"
                    value={formData.longitude}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <button
                type="button"
                onClick={handleUseCurrentLocation}
                className="flex items-center text-blue-600 hover:text-blue-800"
              >
                <MapPin className="h-4 w-4 mr-1" />
                <span>Use my current location</span>
              </button>
            </div>
          </div>
          
          {/* Pricing & Capacity */}
          <div>
            <h2 className="text-lg font-medium mb-4">Pricing & Capacity</h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="pricePerHour" className="block text-sm font-medium text-gray-700 mb-1">
                  Price per Hour ($)
                </label>
                <input
                  type="number"
                  id="pricePerHour"
                  name="pricePerHour"
                  required
                  min="0"
                  step="0.01"
                  className="input w-full"
                  placeholder="e.g., 5.50"
                  value={formData.pricePerHour}
                  onChange={handleInputChange}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Spots
                </label>
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => handleNumberChange('totalSpots', false)}
                    className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="mx-4 text-lg font-medium">{formData.totalSpots}</span>
                  <button
                    type="button"
                    onClick={() => handleNumberChange('totalSpots', true)}
                    className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Currently Available Spots
                </label>
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => handleNumberChange('availableSpots', false)}
                    className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
                    disabled={formData.availableSpots <= 0}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="mx-4 text-lg font-medium">{formData.availableSpots}</span>
                  <button
                    type="button"
                    onClick={() => handleNumberChange('availableSpots', true)}
                    className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
                    disabled={formData.availableSpots >= formData.totalSpots}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Details */}
          <div>
            <h2 className="text-lg font-medium mb-4">Spot Details</h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  className="input w-full"
                  placeholder="Provide details about the parking spot, such as entrance information, payment methods, etc."
                  value={formData.description}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              
              <div>
                <p className="block text-sm font-medium text-gray-700 mb-2">
                  Amenities
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {availableAmenities.map((amenity) => (
                    <div key={amenity} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`amenity-${amenity}`}
                        checked={formData.amenities.includes(amenity)}
                        onChange={() => handleAmenityToggle(amenity)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`amenity-${amenity}`} className="ml-2 text-sm text-gray-700">
                        {amenity}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Photos */}
          <div>
            <h2 className="text-lg font-medium mb-4">Photos</h2>
            
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <div className="flex flex-col items-center">
                  <Upload className="h-10 w-10 text-gray-400 mb-3" />
                  <p className="text-sm text-gray-600 mb-2">
                    Drag and drop images here, or click to select files
                  </p>
                  <p className="text-xs text-gray-500 mb-3">
                    (JPG, PNG, max 5MB each)
                  </p>
                  <input
                    type="file"
                    id="images"
                    name="images"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  <label
                    htmlFor="images"
                    className="btn-primary cursor-pointer"
                  >
                    Select Files
                  </label>
                </div>
              </div>
              
              {imagePreviewUrls.length > 0 && (
                <div className="grid grid-cols-3 gap-3">
                  {imagePreviewUrls.map((url, index) => (
                    <div key={index} className="relative rounded-md overflow-hidden h-24">
                      <img
                        src={url}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-1 right-1 p-1 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-70"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={submitStatus === 'submitting'}
              className="btn-primary w-full"
            >
              {submitStatus === 'submitting' ? 'Adding Parking Spot...' : 'Add Parking Spot'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSpotPage;