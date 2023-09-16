import React from "react";

const LogIn = () => {
  return (
    <div>
      <h1>Log in to MyMDb</h1>
      <form method="GET" action="localhost:3000">
        <input type="text" name="username" placeholder="Username" />
        <br />
        <br />
        <input type="text" name="password" placeholder="Password" />
        <br />
        <br />
        <input type="submit" value="Log In" />
      </form>
    </div>
  );
};

export default LogIn;
