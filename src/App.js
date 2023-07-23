import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import Links from './Links';
import './App.css';

const JsonParser = () => {
  const [jsonData, setJsonData] = useState([]);
  const [csvData, setCsvData] = useState([]);

  const jsonUrl = 'https://scavix.github.io/movies.json';      
  const csvUrl = 'https://scavix.github.io/myratings.csv';

  useEffect(() => {
    fetch(jsonUrl)
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

  useEffect(() => {
    fetch(csvUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then((data) => {
        setCsvData(Papa.parse(data, { header: true }).data);
      })
      .catch((error) => {
        console.error('Error fetching CSV:', error);
      });
  }, []);

  if (jsonData.length === 0 || csvData.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
        <h1 id='myTitle'>Shorts</h1>
        <div>
            <Links links={jsonData} csvs={csvData}/>
        </div>
    </div>
  );
};

export default JsonParser;
