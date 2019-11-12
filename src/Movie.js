import React from "react";

const Movie = props => {
  const { title, rate, releaseDate, synopsis, image } = props;
  return (
    <li className="movie-card">
      <img
        src={"https://image.tmdb.org/t/p/w370_and_h556_bestv2/" + image}
        alt="movie poster"
        className="movie-poster"
      />
      <div className="movie-details">
        <h2 className="movie-title">{title}</h2>
        <p className="release-date">{releaseDate}</p>
        <p className="synopsis">{synopsis}</p>
      </div>
    </li>
  );
};

export default Movie;
