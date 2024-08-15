import React from 'react';
import SearchBar from './components/SearchBar';
import PostcodeList from './components/PostcodeList';
import Results from './components/Results';
import usePostcode from './hooks/usePostcode';

const App = () => {
  // Destructure values and functions from the custom hook usePostcode
  const {
    data,
    postcodes,
    showContainers,
    handleSearch,
    handleSelectPostcode
  } = usePostcode();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header Section */}
      <header className="bg-white shadow-md p-4">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">UK Postcode Lookup</h1>
          <div className="flex justify-center w-full max-w-3xl">
            {/* SearchBar Component: Pass the handleSearch function as a prop */}
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </header>

      {/* Main Content Section */}
      <main className={`flex-1 flex flex-col md:flex-row gap-4 transition-opacity duration-500 ease-in-out py-8 px-8 ${showContainers ? 'opacity-100' : 'opacity-0'}`}>
        {/* PostcodeList Component: Pass the postcodes and handleSelectPostcode function as props */}
        <PostcodeList postcodes={postcodes} onSelect={handleSelectPostcode} />
        <div className="flex-1">
          {/* Results Component: Pass the data object as a prop */}
          <Results data={data} />
        </div>
      </main>
    </div>
  );
};

export default App;
