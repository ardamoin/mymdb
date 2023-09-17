import Favorites from "./components/Favorites";
import Header from "./components/Header";
import Home from "./components/Home";
import LogIn from "./components/LogIn";
import Media from "./components/Media";
import SearchResults from "./components/SearchResults";
import SignUp from "./components/SignUp";

import { Routes, Route } from "react-router-dom";
import "./App.css";
import { useEffect, useState } from "react";
import UserContext from "./context/user-context";
import jwt from "jwt-decode";

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const accessTokenCookie = document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith("access-token="));

    if (accessTokenCookie) {
      const decodedCookie = jwt(accessTokenCookie.replace("access-token=", ""));
      const { email, id, username } = decodedCookie;

      setUser({
        id,
        email,
        username,
      });
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        id: user.id,
        email: user.email,
        username: user.username,
        setUser,
      }}
    >
      <div className="App">
        <Header />
        <div className="routes">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/search_results/:searchTerm"
              element={<SearchResults searchTerm={"brad pitt"} />}
            />
            <Route path="/media/:media_type/:media_id" element={<Media />} />
            <Route path="/favorites" element={<Favorites user="Mike" />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<LogIn />} />
          </Routes>
        </div>
      </div>
    </UserContext.Provider>
  );
}

export default App;
