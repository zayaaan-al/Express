import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/register.jsx";
import Login from "./pages/login.jsx";
import Home from "./components/Home.jsx";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/" element={<Register />} />
        
        <Route path="/login" element={<Login />} />
       
      </Routes>
    </Router>
  );
}

export default App;
