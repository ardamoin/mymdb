import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt from "jwt-decode";

const LogIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: 'include'
      });

      const accessTokenCookie = document.cookie
        .split("; ")
        .find((cookie) => cookie.startsWith("access-token="))
        .replace("access-token=", "");
      console.log(jwt(accessTokenCookie));

      // console.log(document.cookie)

      const responseData = await response.json();
      alert(responseData.message);

      if (response.ok) {
        return navigate("/");
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
