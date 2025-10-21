import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", pass: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/login", formData);
      localStorage.setItem("token", res.data.token); // store JWT
      setMessage("Login successful");
      navigate("/Home");
    } catch (err) {
      setMessage(err.response.data.msg);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="password" name="pass" placeholder="Password" value={formData.pass} onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
      <p style={{ color: "red" }}>{message}</p>
    </div>
  );
}

export default Login;
