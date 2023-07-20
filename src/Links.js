import React, { useState } from "react";
import "./Links.css";

function Links({ links }) {
  const [filter, setFilter] = useState("");
  const [randomMovie, setRandomMovie] = useState(null);

  const filteredLinks = links.filter((link) =>
    link.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleRandomMovieClick = () => {
    const randomIndex = Math.floor(Math.random() * links.length);
    const randomMovie = links[randomIndex];
    setRandomMovie(randomMovie);
    const targetDiv = document.getElementById("list-list-id");
    const targetDivSuggest = document.getElementById("a-random-movie-id");
    const targetButton = document.getElementById("a-button-id");
    if (targetDiv.style.display !== "none") {
      targetDiv.style.display = "none";
      targetButton.innerHTML = "Back to List";
      targetDivSuggest.style.display = "block";
    } else {
      targetDiv.style.display = "block";
      targetButton.innerHTML = "Suggest";
      targetDivSuggest.style.display = "none";
    }
  };

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
        <button className="abutton" onClick={handleRandomMovieClick} id="a-button-id">
          Suggest
        </button>
      </div>
      <br />
      <br />
      <br />
      <div className="a-random-movie-class" id="a-random-movie-id">
        {randomMovie && (
          <div>
            <p>Name: {randomMovie.name}</p>
            <p>Link: {randomMovie.url}</p>
            <p align="center"><iframe title={randomMovie.name} url={randomMovie.url} width="640px" height="320px"/></p>
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
    </div>
  );
}

export default Links;
