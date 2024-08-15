import React, { useState } from 'react';

// SearchBar component allows users to input a postcode and initiate a search
const SearchBar = ({ onSearch }) => {
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

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center w-full max-w-sm">
      {/* Input field for postcode */}
      <input
        type="text"
        value={postcode} // Bind the input value to the postcode state
        onChange={(e) => setPostcode(e.target.value)} // Update the postcode state on input change
        placeholder="Enter postcode" // Placeholder text for the input
        className={`border p-2 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 ${error ? 'border-red-500' : 'border-gray-300'} focus:ring-blue-500`}
      />
      {/* Display validation error */}
      {error && (
        <div className="text-red-500 text-sm mb-4">
          {error}
        </div>
      )}
      {/* Submit button to trigger the search */}
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Search
      </button>
      <caption className='py-4 text-gray-300'>
        Please enter UK Postcode to reveal results. Format "OX49 5NU", "OX495NU", "ox49 5nu".
      </caption>
    </form>
  );
};

export default SearchBar;
