import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    pass: "",
    cpass: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/adduser", formData);
      setMessage(res.data.msg);
      setFormData({ name: "", email: "", pass: "", cpass: "" });
      navigate("/login"); // go to login page after registration
    } catch (err) {
      setMessage(err.response.data.msg);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="password" name="pass" placeholder="Password" value={formData.pass} onChange={handleChange} required />
        <input type="password" name="cpass" placeholder="Confirm Password" value={formData.cpass} onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
      <p style={{ color: "red" }}>{message}</p>
    </div>
  );
}

export default Register;
