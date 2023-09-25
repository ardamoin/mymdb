import { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/user-context";

const Header = () => {
  const ctx = useContext(UserContext);

  const signOutHandler = async () => {
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/logout`, {
      method: "GET",
      credentials: "include",
    }); // Deletes cookie
    ctx.setUser({});
    alert("Signed out");
  };

  return (
    <div className="p-4 w-100 bg-info text-light d-flex align-items-center justify-content-between">
      <Link className="fs-2 fw-bold text-decoration-none text-white " to="/">
        MyMDb
      </Link>
      {!ctx.username && (
        <div className="d-flex gap-4">
          <Link className="btn btn-primary" to="/login">
            Log In
          </Link>
          <Link className="btn btn-primary" to="/signup">
            Sign Up
          </Link>
        </div>
      )}

      {ctx.username && (
        <div className="d-flex gap-4 align-items-center ">
          <span className="fs-4 text-dark ">{ctx.username}</span>
          <Link className="text-dark " to="/favorites">
            Favorites
          </Link>
          <Link className="text-dark " to="/" onClick={signOutHandler}>
            Sign Out
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
