import React from "react";
import { Link } from "react-router-dom";

const Header = ({ userName }) => {
  return (
    <div className="p-4 w-100 bg-info text-light d-flex align-items-center justify-content-between">
      <Link className="fs-2 fw-bold text-decoration-none text-white " to="/">
        MyMDb
      </Link>
      {!userName && (
        <div className="d-flex gap-4">
          <Link className="btn btn-primary" to='/login'>Log In</Link>
          <Link className="btn btn-primary" to='/signup'>Sign Up</Link>
        </div>
      )}

      {userName && (
        <div className="d-flex gap-4 align-items-center ">
          <span className="fs-4 text-dark ">{userName}</span>
          <Link className="text-dark " to="/favorites">
            Favorites
          </Link>
          <span className="text-dark ">Sign Out</span>
        </div>
      )}
    </div>
  );
};

export default Header;
