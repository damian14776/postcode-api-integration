import { useState, useEffect } from 'react';

const useGoogleMap = (data) => {
  // State to store the Google Maps instance
  const [mapInstance, setMapInstance] = useState(null);

  // Update map position and zoom level when data or mapInstance changes
  useEffect(() => {
    if (mapInstance && data && data.latitude && data.longitude) {
      const { latitude, longitude } = data;
      
      // Move the map to the new position
      mapInstance.panTo({ lat: latitude, lng: longitude });
      // Set the zoom level
      mapInstance.setZoom(15);
    }
  }, [data, mapInstance]);

  // Function to handle map load event and store the map instance
  const handleMapLoad = (map) => {
    setMapInstance(map);
  };

  // Return the map load handler and the current map instance
  return { handleMapLoad, mapInstance };
};

export default useGoogleMap;
