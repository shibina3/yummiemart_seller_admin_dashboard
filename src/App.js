import React from 'react'
import "./App.css"; 
import Login from './components/Login';
import Home from './components/Home';

export default function App() {
  return localStorage.getItem("mobile") ? <Home /> : <Login />
}
