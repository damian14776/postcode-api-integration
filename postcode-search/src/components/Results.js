import React from 'react';
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';
import useGoogleMap from '../hooks/useGoogleMap'; // Import custom hook for map logic

// Google Maps API key
const GOOGLE_API_KEY = 'AIzaSyDGaktGeff7DfPh70FB3ntVs_1x9jmhhm0';

// Styles for the map container
const mapContainerStyle = {
  height: 'calc(100vh - 60px)', // Adjust height to fit the viewport minus header
  width: '100%', // Full width
};

// Container style for the map and its controls
const containerStyle = {
  display: 'flex', // Flexbox layout
  flexDirection: 'column', // Stack children vertically
  height: '100%', // Full height of parent
};

const Results = ({ data }) => {
  // Get map load handler from custom hook
  const { handleMapLoad } = useGoogleMap(data);

  // Check if data is valid
  if (!data || !data.latitude || !data.longitude) {
    return <div className="text-gray-700 p-4">Invalid location data</div>;
  }

  // Define the center of the map based on the data
  const center = {
    lat: data.latitude,
    lng: data.longitude,
  };

  return (
    <div className="bg-white rounded-lg shadow-lg flex-1 h-full" style={containerStyle}>
      {/* Load Google Maps API and render the map */}
      <LoadScript googleMapsApiKey={GOOGLE_API_KEY}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle} // Map container styles
          center={center} // Center map at the specified location
          zoom={15} // Set zoom level
          onLoad={handleMapLoad} // Handle map load event
        >
          {/* Place a marker at the center of the map */}
          <MarkerF position={center} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Results;
