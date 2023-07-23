import React, { useState, useEffect } from 'react';
import "./Links.css";

function Links({ links, csvs }) {
  const [filter, setFilter] = useState("");
  const [randomMovieJson, setRandomMovieJson] = useState(null);
  const [randomMovieCsv, setRandomMovieCsv] = useState(null);

  const filteredLinks = links.filter((link) =>
    link.name.toLowerCase().includes(filter.toLowerCase()) ||
    link.director.toLowerCase().includes(filter.toLowerCase()) ||
    (link.rate+'').toLowerCase().includes(filter.toLowerCase())
  );

  const filteredCsvs = csvs.filter((row) =>
    row.Title.toLowerCase().includes(filter.toLowerCase()) ||
    (row['Your Rating']+'').toLowerCase().includes(filter.toLowerCase())
  );
  
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleRandomMovieClick = () => {
    const targetTitle = document.getElementById("myTitle");
    if (targetTitle.innerHTML === "Shorts") {
      handleRandomMovieClickJson();
    } else {
      handleRandomMovieClickCsv();
    }
  };

  const handleRandomMovieClickJson = () => {
    const randomIndex = Math.floor(Math.random() * links.length);
    const randomMovie = links[randomIndex];
    setRandomMovieJson(randomMovie);
    const targetDiv = document.getElementById("list-list-id");
    const targetDivSuggest = document.getElementById("a-random-short-id");
    const targetDivFilm = document.getElementById("csv-list-id");
    const targetButton = document.getElementById("a-button-id");
    if (targetDiv.style.display !== "none") {
      targetDiv.style.display = "none";
      targetButton.innerHTML = "Back to List";
      targetDivSuggest.style.display = "block";
      targetDivFilm.style.display = "none";
    } else {
      targetDiv.style.display = "block";
      targetButton.innerHTML = "Suggest";
      targetDivSuggest.style.display = "none";
    }
  };

  const handleRandomMovieClickCsv = () => {
    const randomIndex = Math.floor(Math.random() * csvs.length);
    const randomMovie = csvs[randomIndex];
    setRandomMovieCsv(randomMovie);
    const targetDiv = document.getElementById("csv-list-id");
    const targetDivSuggest = document.getElementById("a-random-film-id");
    const targetDivMovie = document.getElementById("list-list-id");
    const targetButton = document.getElementById("a-button-id");
    if (targetDiv.style.display !== "none") {
      targetDiv.style.display = "none";
      targetButton.innerHTML = "Back to List";
      targetDivSuggest.style.display = "block";
      targetDivMovie.style.display = "none";
    } else {
      targetDiv.style.display = "block";
      targetButton.innerHTML = "Suggest";
      targetDivSuggest.style.display = "none";
    }
  };

  const handleChanger = () => {
    const targetTitle = document.getElementById("myTitle");
    const targetDiv = document.getElementById("list-list-id");
    const targetDivSuggest = document.getElementById("a-random-short-id");
    const targetDivFilm = document.getElementById("csv-list-id");
    if (targetTitle.innerHTML === "Movies") {
      targetTitle.innerHTML = "Shorts";
      targetDiv.style.display = "block";
      targetDivSuggest.style.display = "none";
      targetDivFilm.style.display = "none";
    } else {
      targetTitle.innerHTML = "Movies";
      targetDiv.style.display = "none";
      targetDivSuggest.style.display = "none";
      targetDivFilm.style.display = "block";
    }
  };

  useEffect(() => {
    handleChanger();
    handleChanger();
  }, []);


  return (
    <div>
      <div>
        <input
          className="search-bar"
          type="text"
          placeholder="Search links..."
          value={filter}
          onChange={handleFilterChange}
        />
        <button
          className="abutton"
          onClick={handleRandomMovieClick}
          id="a-button-id"
        >
          Suggest
        </button>
        <form>
          <label className="switch">
            <input type="checkbox" />
            <span className="slider round"></span>
          </label>
        </form>
        <div className="toggle-button-cover">
          <div className="button-cover">
            <div className="button r" id="button-2">
              <input
                type="checkbox"
                className="checkbox"
                onClick={handleChanger}
              />
              <div className="knobs"></div>
              <div className="layer"></div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <div className="a-random-short-class" id="a-random-short-id">
        {randomMovieJson && (
          <div>
            <p>Name: {randomMovieJson.name}</p>
            <p>Link: {randomMovieJson.url}</p>
            <p>Director: {randomMovieJson.director}</p>
            <p>Rate: {randomMovieJson.rate}</p>
            <p>Description: {randomMovieJson.description}</p>
            <p align="center">
              <iframe
                title={randomMovieJson.name}
                src={"https://www.youtube.com/embed/" + randomMovieJson.youtubeid}
                width="640px"
                height="320px"
              />
            </p>
          </div>
        )}
      </div>
      <div className="a-random-film-class" id="a-random-film-id">
        {randomMovieCsv && (
          <div>
            <p>Name: {randomMovieCsv.Title}</p>
            <p>Link: {randomMovieCsv.URL}</p>
            <p><a href = {randomMovieCsv.URL}>IMDB</a></p>
            <p>Director: {randomMovieCsv['Director']}</p>
            <p>My Rate: {randomMovieCsv['Your Rating']}</p>
            <p>IMDB Rate: {randomMovieCsv['IMDb Rating']}</p>
          </div>
        )}
      </div>
      <div className="link-list-class" id="list-list-id">
        <ul>
          {filteredLinks.map((link, index) => (
            <li key={index}>
              <a href={link.url}>{link.name}</a>
            </li>
          ))}
        </ul>
      </div>
      <div className="csv-list-class" id="csv-list-id">
        <ul>
          {filteredCsvs.map((csv, index) => (
            <li key={index}>
              <a href={csv.URL}>{csv.Title}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Links;
