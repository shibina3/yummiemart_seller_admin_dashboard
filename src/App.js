import React from "react";
import { BrowserRouter as Router } from "react-router-dom"; // Import BrowserRouter
import "./App.css";
import Login from "./components/Login";
import Home from "./components/Home";

export default function App() {
  // Wrap the entire application in Router
  return (
    <Router>
      {localStorage.getItem("mobile") ? <Home /> : <Login />}
    </Router>
  );
}
