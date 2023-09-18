import { useContext, useEffect, useState } from "react";
import UserContext from "../context/user-context";
import options from "../options";
import { Link } from "react-router-dom";

const Favorites = () => {
  const [mediaInfo, setMediaInfo] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const ctx = useContext(UserContext);

  useEffect(() => {
    const getFavoritesFromBackend = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/favorites`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: ctx.id }),
        });
        const data = await response.json();
        setFavorites(data.favorites);
        setLoading(false); // Set loading to false when data is fetched
      } catch (err) {
        console.error(err);
      }
    };

    const setMediaInfoUsingBackendData = async () => {
      if (ctx.id && !loading) {
        // Check if it's not loading
        try {
          const mediaInfoArray = await Promise.all(
            favorites.map(async (favorite) => {
              const fetchURL = `https://api.themoviedb.org/3/${favorite.media_type}/${favorite.media_id}?language=en-US`;
              const response = await fetch(fetchURL, options);
              const data = await response.json();

              return {
                name: data.title || data.name,
                img: data.poster_path || data.profile_path,
                media: favorite.media_type,
                id: favorite.media_id,
              };
            })
          );

          setMediaInfo(mediaInfoArray);
        } catch (err) {
          console.error(err);
        }
      }
    };

    if (ctx.id && loading) {
      getFavoritesFromBackend();
    }

    setMediaInfoUsingBackendData();
  }, [ctx.id, favorites, loading]);

  const removeFavHandler = async (media_id, media_type) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/favorites/remove`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: ctx.id, media_id, media_type }),
      });

      const data = await response.json();

      const newFavorites = favorites.filter((favorite) => {
        if (favorite.media_type === media_type) {
          return favorite.media_id !== media_id;
          // if media type is a match, filter out if media id doesn't match
        } else {
          return favorite;
          // otherwise just filter out.
        }
      });
      setFavorites(newFavorites);

      alert(data.message);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <br />
      <h1>
        Hi {ctx.username}! Here are some of your favorite movies and tv shows:
      </h1>
      <ul className="d-flex flex-column gap-3 ">
        {mediaInfo.map((media) => {
          return (
            <li key={media.id}>
              <img
                src={`https://image.tmdb.org/t/p/original${media.img}`}
                alt={`poster`}
                width="100"
                className="mx-3"
              />
              <Link to={`/media/${media.media}/${media.id}`}>
                {media.name} ({media.media})
              </Link>
              <button
                style={{ marginLeft: "30px" }}
                onClick={() => {
                  removeFavHandler(media.id, media.media);
                }}
              >
                Remove
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Favorites;
