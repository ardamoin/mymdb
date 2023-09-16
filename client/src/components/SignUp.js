import React from "react";

const SignUp = () => {
  return (
    <div>
      <h1>Sign up to MyMDb</h1>
      <form method="POST" action="localhost:3000">
        <input type="text" name="email" placeholder="Email" />
        <br />
        <br />
        <input type="text" name="username" placeholder="Username" />
        <br />
        <br />
        <input type="text" name="password" placeholder="Password" />
        <br />
        <br />
        <input type="submit" value='Sign Up'/>
      </form>
    </div>
  );
};

export default SignUp;
