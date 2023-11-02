import React, { useState, useEffect } from 'react';
import Loader from './Loader';
import PhotoFrame from './PhotoFrame';

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [photoData, setPhotoData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    if (inputValue) {
      setLoading(true);
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/photos/${inputValue}`);
        const data = await response.json();
        setPhotoData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [inputValue]);

  return (
    <div className="App">
      <input
        type="number"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter a number between 1 and 5000"
      />
      {loading && <Loader />}
      {photoData && <PhotoFrame url={photoData.url} title={photoData.title} />}
    </div>
  );
};

export default App;
