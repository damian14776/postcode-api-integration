import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import Results from './Results';

const App = () => {
  const [data, setData] = useState(null);

  const handleSearch = async (postcode) => {
    try {
        //API Connection
      const response = await axios.get(`https://api.postcodes.io/postcodes/${postcode}`);
      setData(response.data.result);
    } catch (error) {
      console.error('Error fetching postcode data:', error);
      setData(null);
    }
  };

  return (
    <div>
      <h1>Postcode Search</h1>
      <SearchBar onSearch={handleSearch} />
      <Results data={data} />
    </div>
  );
};

export default App;
