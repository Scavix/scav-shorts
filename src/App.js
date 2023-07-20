import React, { useState, useEffect } from 'react';
import Links from './Links';
import './App.css';

const JsonParser = () => {
  const [jsonData, setJsonData] = useState([]);
  console.log("fratm");
  useEffect(() => {
    const url = 'https://scavix.github.io/movies.json';      

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setJsonData(data);
      })
      .catch((error) => {
        console.error('Error fetching JSON:', error);
      });
  }, []);

  if (jsonData.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
        <h1>Shorts</h1>
        <div>
            <Links links={jsonData} />
        </div>
    </div>
  );
};

export default JsonParser;
