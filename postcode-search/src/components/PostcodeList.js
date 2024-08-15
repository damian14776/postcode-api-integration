import React from 'react';
import usePostcodeList from '../hooks/usePostcodeList'; // Import the custom hook

// Main component for displaying postcode search results
const PostcodeList = ({ postcodes, onSelect }) => {
  // Destructure values returned by the usePostcodeList hook
  const {
    isMenuOpen,
    storedPostcodes,
    currentPostcodes,
    hasSearched,
    handleToggleMenu
  } = usePostcodeList(postcodes);

  // Render nothing if no search has been done yet
  if (!hasSearched) {
    return null;
  }

  return (
    <div className="relative bg-white p-4 rounded-lg shadow-lg h-full overflow-y-auto transition-opacity duration-500 ease-in-out">
      
      {/* Mobile Dropdown Menu Button */}
      {/* Only show the button if there are stored postcodes and it's a mobile view */}
      {storedPostcodes.length > 0 && (
        <button
          className="block md:hidden bg-blue-500 text-white p-2 rounded-md shadow-md focus:outline-none mb-4"
          onClick={handleToggleMenu} // Toggle the dropdown menu on click
        >
          {isMenuOpen ? 'Hide Previous Results' : 'Show Previous Results'}
        </button>
      )}

      {/* Main Container for Current Search Results */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Postcode Location Search Results:</h2>
        {currentPostcodes.length > 0 ? (
          <ul className="space-y-4">
            {/* Map through the current postcodes and display them */}
            {currentPostcodes.map((postcode, index) => (
              <li key={index} className="mb-4 p-4 border border-gray-200 rounded-md">
                <h3 className="text-lg font-medium text-gray-700 mb-2">Postcode: {postcode.postcode}</h3>
                <ul className="space-y-2">
                  {/* Map through the addresses for the current postcode */}
                  {postcode.addresses.map((address, i) => (
                    <li
                      key={i}
                      className="cursor-pointer hover:bg-gray-100 p-2 rounded-md transition-colors duration-200 ease-in-out"
                      onClick={() => onSelect(address)} // Call onSelect with the selected address
                    >
                      {address.formatted_address}
                    </li>
                  ))}
                </ul>
                {/* Display geographical information if addresses are available */}
                {postcode.addresses.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-md font-medium text-gray-700">Geographical Information</h4>
                    <p><strong>Latitude:</strong> {postcode.addresses[0].latitude}</p>
                    <p><strong>Longitude:</strong> {postcode.addresses[0].longitude}</p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-gray-700 p-4">No postcodes available</div>
        )}
      </div>

      {/* Previous Results for Desktop and Tablet */}
      {storedPostcodes.length > 0 && (
        <div className="mt-8 hidden md:block">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Previous Search Results:</h2>
          <ul className="space-y-4">
            {/* Map through the stored postcodes and display them */}
            {storedPostcodes.map((postcode, index) => (
              <li key={index} className="mb-4 p-4 border border-gray-200 rounded-md">
                <h3 className="text-lg font-medium text-gray-700 mb-2">Postcode: {postcode.postcode}</h3>
                <ul className="space-y-2">
                  {/* Map through the addresses for each stored postcode */}
                  {postcode.addresses.map((address, i) => (
                    <li
                      key={i}
                      className="cursor-pointer hover:bg-gray-100 p-2 rounded-md transition-colors duration-200 ease-in-out"
                      onClick={() => onSelect(address)} // Call onSelect with the selected address
                    >
                      {address.formatted_address}
                    </li>
                  ))}
                </ul>
                {/* Display geographical information if addresses are available */}
                {postcode.addresses.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-md font-medium text-gray-700">Geographical Information</h4>
                    <p><strong>Latitude:</strong> {postcode.addresses[0].latitude}</p>
                    <p><strong>Longitude:</strong> {postcode.addresses[0].longitude}</p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Mobile Dropdown Menu Content */}
      {/* Display previous results in a dropdown menu on mobile view if the menu is open */}
      {isMenuOpen && storedPostcodes.length > 0 && (
        <div className="absolute top-12 left-0 bg-white p-4 rounded-lg shadow-lg w-full z-10 md:hidden">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Previous Search Results:</h2>
          <ul className="space-y-4">
            {/* Map through the stored postcodes and display them */}
            {storedPostcodes.map((postcode, index) => (
              <li key={index} className="mb-4 p-4 border border-gray-200 rounded-md">
                <h3 className="text-lg font-medium text-gray-700 mb-2">Postcode: {postcode.postcode}</h3>
                <ul className="space-y-2">
                  {/* Map through the addresses for each stored postcode */}
                  {postcode.addresses.map((address, i) => (
                    <li
                      key={i}
                      className="cursor-pointer hover:bg-gray-100 p-2 rounded-md transition-colors duration-200 ease-in-out"
                      onClick={() => onSelect(address)} // Call onSelect with the selected address
                    >
                      {address.formatted_address}
                    </li>
                  ))}
                </ul>
                {/* Display geographical information if addresses are available */}
                {postcode.addresses.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-md font-medium text-gray-700">Geographical Information</h4>
                    <p><strong>Latitude:</strong> {postcode.addresses[0].latitude}</p>
                    <p><strong>Longitude:</strong> {postcode.addresses[0].longitude}</p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PostcodeList;
