import React from 'react';
import usePostcodeSearch from '../hooks/useSearch'; 

// SearchBar component allows users to input a postcode and initiate a search
const SearchBar = ({ onSearch }) => {
  // Use the custom hook to manage postcode search logic
  const { postcode, error, handleSubmit, handleChange } = usePostcodeSearch(onSearch);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center w-full max-w-sm">
      {/* Input field for postcode */}
      <input
        type="text"
        value={postcode} // Bind the input value to the postcode state
        onChange={handleChange} // Update the postcode state on input change
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
