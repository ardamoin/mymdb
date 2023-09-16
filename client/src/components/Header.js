import React from "react";

const Header = ({ userName }) => {
  return (
    <div className="p-4 w-100 bg-info text-light d-flex align-items-center justify-content-between">
      <p className="fs-2 fw-bold ">MyMDb</p>
      {!userName && (
        <div className="d-flex gap-4">
          <button className="btn btn-primary">Log In</button>
          <button className="btn btn-primary">Sign Up</button>
        </div>
      )}

      {userName && (
        <div className="d-flex gap-4 align-items-center ">
          <p className="fs-4 text-dark ">{userName}</p>
          <p className="text-dark ">Favorites</p>
          <p className="text-dark ">Sign Out</p>
        </div>
      )}
    </div>
  );
};

export default Header;
