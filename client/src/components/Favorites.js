import React from "react";

const Favorites = ({ user }) => {
  return (
    <div>
      <br />
      <h1>Hi {user}! Here are some of your favorite movies and tv shows:</h1>
      <div>
        <img
          src={`https://image.tmdb.org/t/p/original/gmECX1DvFgdUPjtio2zaL8BPYPu.jpg`}
          alt={`poster`}
          width="300"
        />
        <h4>Jujutsu Kaisen(tv)</h4>
      </div>
      <div>
        <img
          src={`https://image.tmdb.org/t/p/original/gmECX1DvFgdUPjtio2zaL8BPYPu.jpg`}
          alt={`poster`}
          width="300"
        />
        <h4>Jujutsu Kaisen(tv)</h4>
      </div>
    </div>
  );
};

/*
User name should be passed in through context, not props.
If no user is logged in, app should prompt log in or sign up
*/

export default Favorites;
