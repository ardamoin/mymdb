import { useState, useEffect } from "react";
import options from "../options";

import { Link } from "react-router-dom";

const Home = () => {
  const [topMovies, setTopMovies] = useState([]);
  const [topTvShows, setTopTvShows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const searchTermHandler = (event) => {
    setSearchTerm(event.target.value);
  };

  document.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  });

  useEffect(() => {
    // Fetch top movies
    fetch(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
      options
    )
      .then((response) => response.json())
      .then((response) => setTopMovies(response.results))
      .catch((err) => console.error(err));

    // Fetch top Tv shows
    fetch(
      "https://api.themoviedb.org/3/trending/tv/day?language=en-US",
      options
    )
      .then((response) => response.json())
      .then((response) => setTopTvShows(response.results))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <br />
      <form>
        <label htmlFor="media-query">
          Search trending movies and tv shows...
        </label>
        <br />
        <input
          type="text"
          id="media-query"
          name="media-query"
          onChange={searchTermHandler}
        />
        {searchTerm === "" ? (
          <Link
            className="btn btn-primary m-4 "
            to={`/search_results/${searchTerm.split(" ").join("+")}`}
            onClick={(e) => e.preventDefault()}
          >
            Search
          </Link>
        ) : (
          <Link
            className="btn btn-primary m-4 "
            to={`/search_results/${searchTerm.split(" ").join("+")}`}
          >
            Search
          </Link>
        )}
      </form>

      <br />

      <h3>Today's Trending Movies</h3>
      <ul>
        {topMovies.length === 0 && <p>Loading...</p>}
        {topMovies.length !== 0 &&
          topMovies.map((movie) => {
            return (
              <li key={movie.id}>
                <Link to={`/media/movie/${movie.id}`}>{movie.title}</Link>
              </li>
            );
          })}
      </ul>

      <h3>Today's Trending Tv Shows</h3>
      <ul>
        {topTvShows.length === 0 && <p>Loading...</p>}
        {topTvShows.length !== 0 &&
          topTvShows.map((tvshow) => {
            return (
              <li key={tvshow.id}>
                <Link to={`/media/tv/${tvshow.id}`}>{tvshow.name}</Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Home;
