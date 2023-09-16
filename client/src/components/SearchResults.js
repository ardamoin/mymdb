import { useState, useEffect } from "react";
import options from "../options";
import { useParams, Link } from "react-router-dom";

const SearchResults = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [resultMessage, setResultMessage] = useState(<p>Loading...</p>);
  const { searchTerm } = useParams();

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/search/multi?query=${searchTerm}&include_adult=false&language=en-US&page=1`,
      options
    )
      .then((response) => response.json())
      .then((response) => setSearchResults(response.results))
      .catch((err) => console.error(err));

    setTimeout(() => {
      setResultMessage(
        <p>No results were found for '{searchTerm.split("+").join(" ")}'</p>
      );
    }, 2000);
  }, []);

  return (
    <div>
      <h2>
        Following results were found for '{searchTerm.split("+").join(" ")}':
      </h2>
      <ul>
        {searchResults.length === 0 && resultMessage}
        {searchResults.length !== 0 &&
          searchResults.map((result) => {
            return (
              <li key={result.id}>
                <Link to={`/media/${result.media_type}/${result.id}`}>
                  "{result.name || result.title}", {result.media_type}
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default SearchResults;
