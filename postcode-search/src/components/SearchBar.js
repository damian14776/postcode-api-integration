import React, { useState } from 'react';

// SearchBar component allows users to input a postcode and initiate a search
const SearchBar = ({ onSearch }) => {
  // State to hold the value of the postcode input
  const [postcode, setPostcode] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    onSearch(postcode); // Call the onSearch function passed as a prop with the current postcode
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center w-full max-w-sm">
      {/* Input field for postcode */}
      <input
        type="text"
        value={postcode} // Bind the input value to the postcode state
        onChange={(e) => setPostcode(e.target.value)} // Update the postcode state on input change
        placeholder="Enter postcode" // Placeholder text for the input
        className="border border-gray-300 p-2 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {/* Submit button to trigger the search */}
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
