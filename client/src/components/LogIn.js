import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import jwt from "jwt-decode";
import UserContext from "../context/user-context";

const LogIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const ctx = useContext(UserContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include",
        }
      );

      const responseData = await response.json();
      alert(responseData.message);

      if (response.ok) {
        const accessTokenCookie = document.cookie
          .split("; ")
          .find((cookie) => cookie.startsWith("access-token="));

        if (accessTokenCookie) {
          const accessToken = accessTokenCookie.replace("access-token=", "");
          const decodedCookie = jwt(accessToken);

          ctx.setUser({
            id: decodedCookie.id,
            email: decodedCookie.email,
            username: decodedCookie.username,
          });
          navigate("/");
        }
      } else {
        console.log("Login failed");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div>
      <h1>Log in to MyMDb</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <br />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <br />
        <br />
        <input type="submit" value="Log In" />
      </form>
    </div>
  );
};

export default LogIn;
