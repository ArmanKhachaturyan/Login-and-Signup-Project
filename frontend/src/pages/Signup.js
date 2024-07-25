import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { handleError, handleSuccess } from "../handleSuccessError";

function Signup() {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setSignupInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      return handleError("name, email and password are required");
    }
    try {
      const url = `http://localhost:8080/auth/signup`;
      const response = await axios.post(url, signupInfo, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { success, message, error } = response.data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
      console.log(response.data);
    } catch (err) {
      handleError(err.message);
    }
  };

  return (
    <div className="container">
      <h1>Signup</h1>
      <form onSubmit={handleSignup}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            onChange={handleChange}
            type="text"
            name="name"
            autoFocus
            placeholder="Enter your name..."
            value={signupInfo.name}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="Enter your email..."
            value={signupInfo.email}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Enter your password..."
            value={signupInfo.password}
          />
        </div>
        <button type="submit">Signup</button>
        <span>
          Already have an account ?
          <Link to="/login" className="link">
            Login
          </Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Signup;
