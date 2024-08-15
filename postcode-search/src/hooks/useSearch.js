// usePostcodeSearch.js
import { useState } from 'react';

// Custom hook to manage postcode search logic
const usePostcodeSearch = (onSearch) => {
  // State to hold the value of the postcode input
  const [postcode, setPostcode] = useState('');
  // State to handle validation error
  const [error, setError] = useState('');

  // Function to validate postcode format
  const validatePostcode = (postcode) => {
    // Simple regex to match common UK postcode formats
    const postcodeRegex = /^([A-Z]{1,2}[0-9][A-Z0-9]?|[A-Z][0-9]{2}|[A-Z]{2}[0-9]{2})[ ]?[0-9][A-Z]{2}$/i;
    return postcodeRegex.test(postcode);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Validate postcode format
    if (validatePostcode(postcode)) {
      setError(''); // Clear any previous errors
      onSearch(postcode); // Call the onSearch function passed as a prop with the current postcode
    } else {
      setError('Please enter a valid postcode'); // Set validation error message
    }
  };

  // Handle input change
  const handleChange = (e) => {
    setPostcode(e.target.value); // Update the postcode state on input change
  };

  return {
    postcode,
    error,
    handleSubmit,
    handleChange
  };
};

export default usePostcodeSearch;
