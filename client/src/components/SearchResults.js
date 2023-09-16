import { useState, useEffect } from "react";
import options from "../options";

const SearchResults = ({ searchTerm }) => {
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/search/multi?query=${searchTerm}&include_adult=false&language=en-US&page=1`,
      options
    )
      .then((response) => response.json())
      .then((response) => setSearchResults(response.results))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Following results were found for '{searchTerm}':</h2>
      <ul>
        {searchResults.length === 0 && <p>Loading...</p>}
        {searchResults.length !== 0 &&
          searchResults.map((result) => {
            return (
              <li key={result.id}>
                "{result.name || result.title}", {result.media_type}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

/**
 * Search term is currently set as a prop. Should be
 * changed to URL param.
 *
 * TODO: Make searchTerm accessible as a URL param once
 * client side routing is implemented.
 */

export default SearchResults;
