import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Navbar from "./Navbar";
import Movie from "./Movie";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [category, setCategory] = useState("popular");
  const [pageNumber, setPageNumber] = useState(1);
  const [api, setApi] = useState(
    "https://api-allocine.herokuapp.com/api/movies/popular"
  );

  const fetchData = async url => {
    const response = await axios.get(url);
    setMovies(response.data.results);
    setIsLoading(false);
    setPageNumber(response.data.page);
  };
  // UseEffect prevent the component to render in an infinite loop because of fetchData updating the state.
  // Instead, it only renders the first time it loads, unless we change the state of API
  useEffect(() => {
    fetchData(api + "?p=" + pageNumber);
  }, [api, pageNumber]);

  const handlePages = event => {
    if (event.target.value === "previous") {
      setPageNumber(pageNumber - 1);
    } else if (event.target.value === "next") {
      setPageNumber(pageNumber + 1);
    }
  };

  return (
    <div className="App">
      <Navbar />
      <div className="header-tab">
        <div className="tabs">
          <h3
            className={category === "popular" ? "current-tab" : "tab"}
            onClick={() => {
              setApi("https://api-allocine.herokuapp.com/api/movies/popular");
              setCategory("popular");
            }}
          >
            Popular Movies
          </h3>
          <h3
            className={category === "upcoming" ? "current-tab" : "tab"}
            onClick={() => {
              setApi("https://api-allocine.herokuapp.com/api/movies/upcoming");
              setCategory("upcoming");
            }}
          >
            Upcoming Movies
          </h3>
          <h3
            className={category === "top rated" ? "current-tab" : "tab"}
            onClick={() => {
              setApi("https://api-allocine.herokuapp.com/api/movies/top_rated");
              setCategory("top rated");
            }}
          >
            Top Rated Movies
          </h3>
        </div>
        {/* BUTTON FOR PAGE NUMBER */}
        <div className="page-buttons">
          {pageNumber > 1 && (
            <button
              value="previous"
              className="previous-page"
              onClick={handlePages}
            >
              ◀️
            </button>
          )}
          <button className="current-page">{pageNumber}</button>
          <button value="next" className="next-page" onClick={handlePages}>
            ▶️
          </button>
        </div>
      </div>
      <div>
        {isLoading ? (
          <p> fetching data...</p>
        ) : (
          <ul className="movies-list">
            {movies.map(movie => {
              return (
                <Movie
                  key={movie.id}
                  title={movie.title}
                  rate={movie.vote_average}
                  releaseDate={movie.release_date}
                  synopsis={movie.overview}
                  image={movie.poster_path}
                ></Movie>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
export default App;
