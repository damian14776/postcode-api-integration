import { useState } from 'react';
import axios from 'axios';

// Google Maps API key
const GOOGLE_API_KEY = 'AIzaSyDGaktGeff7DfPh70FB3ntVs_1x9jmhhm0';

const usePostcode = () => {
  // State to store the postcode and address data
  const [data, setData] = useState(null);
  
  // State to store the list of postcodes fetched from the search
  const [postcodes, setPostcodes] = useState([]);
  
  // State to control the visibility of containers (for animation purposes)
  const [showContainers, setShowContainers] = useState(false);

  // Function to search for postcode and fetch address details
  const handleSearch = async (postcode) => {
    try {
      // Fetch postcode data from Postcodes.io API
      const response = await axios.get(`https://api.postcodes.io/postcodes/${postcode}`);
      const postcodeData = response.data.result;

      // Fetch address details from Google Maps Geocoding API
      const googleResponse = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${postcode}&key=${GOOGLE_API_KEY}`);
      const addresses = googleResponse.data.results.map(result => ({
        formatted_address: result.formatted_address,
        latitude: result.geometry.location.lat,
        longitude: result.geometry.location.lng,
      }));

      // Update the state with the new postcode and address data
      setPostcodes([{ postcode, addresses }]);
      setData({
        ...postcodeData,
        addresses
      });
      setShowContainers(true); // Show containers (e.g., trigger animations) after successful search
    } catch (error) {
      // Handle errors from API requests
      console.error('Error fetching postcode data:', error);
      setData(null); // Clear data on error
      setPostcodes([]); // Clear postcodes on error
      setShowContainers(false); // Hide containers on error
    }
  };

  // Function to handle address selection
  const handleSelectPostcode = async (address) => {
    try {
      // Fetch address details from Google Maps Geocoding API
      const googleResponse = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address.formatted_address}&key=${GOOGLE_API_KEY}`);
      const addressData = googleResponse.data.results[0];

      // Update state with the selected address's data
      setData({
        latitude: addressData.geometry.location.lat,
        longitude: addressData.geometry.location.lng,
        addresses: [address]
      });

      setShowContainers(true); // Show containers (e.g., trigger animations) after address selection
    } catch (error) {
      // Handle errors from API requests
      console.error('Error fetching address data:', error);
      setData(null); // Clear data on error
      setShowContainers(false); // Hide containers on error
    }
  };

  // Return the current state and functions for use in components
  return {
    data,
    postcodes,
    showContainers,
    handleSearch,
    handleSelectPostcode,
  };
};

export default usePostcode;
