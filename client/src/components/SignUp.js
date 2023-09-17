import { useState } from "react";

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("http://localhost:5000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        // Handle the response from the server
        if (response.ok) {
          alert("registration successful");
        } else {
          alert("failed to register");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>Sign up to MyMDb</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <br />
        <br />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleInputChange}
        />
        <br />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <br />
        <br />
        <input type="submit" value="Sign Up" />
      </form>
    </div>
  );
};

export default SignUp;
