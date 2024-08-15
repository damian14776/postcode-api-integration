import { useState, useEffect } from 'react';

// Custom hook to manage postcode list state and logic
const usePostcodeList = (postcodes) => {
  // State to control the visibility of the mobile dropdown menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // State to store postcodes from previous searches
  const [storedPostcodes, setStoredPostcodes] = useState([]);
  
  // State to store postcodes from the current search
  const [currentPostcodes, setCurrentPostcodes] = useState([]);
  
  // State to determine if a search has been performed
  const [hasSearched, setHasSearched] = useState(false);

  // Function to toggle the visibility of the mobile dropdown menu
  const handleToggleMenu = () => {
    setIsMenuOpen(prev => !prev); // Toggle the boolean state
  };

  // Effect to handle updates when postcodes change
  useEffect(() => {
    if (postcodes.length > 0) {
      // Filter out postcodes that are already in the stored list
      const newPostcodes = postcodes.filter(postcode =>
        !storedPostcodes.some(stored => stored.postcode === postcode.postcode)
      );

      if (hasSearched) {
        // Append new postcodes to the stored postcodes list if a search has been performed
        setStoredPostcodes(prevPostcodes => [
          ...prevPostcodes,
          ...newPostcodes
        ]);
      }

      // Update the current postcodes with the latest search results
      setCurrentPostcodes(postcodes);
      // Mark that a search has been performed
      setHasSearched(true);
    }
  }, [postcodes, hasSearched, storedPostcodes]); // Dependencies array

  // Return values and functions that can be used by components using this hook
  return {
    isMenuOpen,
    storedPostcodes,
    currentPostcodes,
    hasSearched,
    handleToggleMenu
  };
};

export default usePostcodeList;
