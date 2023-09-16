import React, { useEffect, useState } from "react";
import options from "../options";
import { useParams } from "react-router-dom";

const Media = () => {
  const [mediaInfo, setMediaInfo] = useState({});
  const [mediaVideoLink, setMediaVideoLink] = useState("");
  const { media_type, media_id } = useParams();

  useEffect(() => {
    let infoFetchURL;
    let videoFetchURL;

    switch (media_type) {
      case "tv":
        infoFetchURL = `https://api.themoviedb.org/3/tv/${media_id}?language=en-US`;
        videoFetchURL = `https://api.themoviedb.org/3/tv/${media_id}/videos`;
        break;

      case "movie":
        infoFetchURL = `https://api.themoviedb.org/3/movie/${media_id}?language=en-US`;
        videoFetchURL = `https://api.themoviedb.org/3/movie/${media_id}/videos`;
        break;

      case "person":
        infoFetchURL = `https://api.themoviedb.org/3/person/${media_id}?language=en-US`;
        break;

      default:
        return;
    }

    // Fetches general info about the media(title, overview, poster)
    fetch(infoFetchURL, options)
      .then((response) => response.json())
      .then((response) => {
        setMediaInfo(response);
      })
      .catch((err) => console.error(err));

    // Fetches a youtube video key and sets video link state with that key.
    if (media_type === "movie" || media_type === "tv") {
      fetch(videoFetchURL, options)
        .then((response) => response.json())
        .then((response) => {
          let results = response.results;
          for (let result of results) {
            if (result.type === "Trailer" && result.site === "YouTube") {
              setMediaVideoLink(`http://www.youtube.com/watch?v=${result.key}`);
              break;
            }
          }
        });
    }
  }, []);

  return (
    <div>
      <br />
      <img
        src={`https://image.tmdb.org/t/p/original${
          mediaInfo.poster_path || mediaInfo.profile_path
        }`}
        alt={`${mediaInfo.name || mediaInfo.title} poster`}
        width="200"
      />

      <br />
      <br />
      <h1>
        {mediaInfo.name || mediaInfo.title} ({media_type})
      </h1>
      <p>{mediaInfo.overview || mediaInfo.biography}</p>
      <br />
      {(media_type === "movie" || media_type === "tv") && (
        <a
          href={mediaVideoLink}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => {
            if (mediaVideoLink === "") {
              e.preventDefault();
            }
          }}
        >
          Watch here
        </a>
      )}

      <br />
      <br />
      <h1>Comments</h1>
      <ul>
        <li>User: TestUser1, Comment: This is a test comment</li>
        <li>User: TestUser2, Comment: This is also a test comment</li>
      </ul>

      <form method="POST" action="localhost:3000">
        <label htmlFor="comment">Leave a comment</label>
        <br />
        <input name="comment" type="text" placeholder="Comment..." />
        <input type="submit" value="Submit Comment" />
      </form>

      <br />
      <br />

      <button
        onClick={() => {
          alert("Added to favorites");
        }}
      >
        Add to favorites
      </button>

      <br />
      <br />
    </div>
  );
};

export default Media;
