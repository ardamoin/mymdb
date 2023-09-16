import { useState, useEffect } from "react";
import options from "../options";

const Home = () => {
  const [topMovies, setTopMovies] = useState([]);
  const [topTvShows, setTopTvShows] = useState([]);

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
      <form method="get">
        <label htmlFor="media-query">
          Search trending movies and tv shows...
        </label>
        <br />
        <input type="text" id="media-query" name="media-query" />
        <input type="submit" value="Search" />
      </form>

      <br />

      <h3>Today's Trending Movies</h3>
      <ul>
        {topMovies.length === 0 && <p>Loading...</p>}
        {topMovies.length !== 0 &&
          topMovies.map((movie) => {
            return <li key={movie.id}>{movie.title}</li>;
          })}
      </ul>

      <h3>Today's Trending Tv Shows</h3>
      <ul>
        {topTvShows.length === 0 && <p>Loading...</p>}
        {topTvShows.length !== 0 &&
          topTvShows.map((tvshow) => {
            return <li key={tvshow.id}>{tvshow.name}</li>;
          })}
      </ul>
    </div>
  );
};

export default Home;
