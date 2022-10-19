// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom"
import React from 'react';

import Task from "./pages/task"
import Home from "./pages/home"
import Calendar from "./pages/calendar"
import Diagram from "./pages/diagram"
import Todolist from "./pages/tasks"

import Navbar from "./components/navbar"

function App() {
  const ROUTER_BASENAME = "/C_2212"

  return (
    <Router basename={ROUTER_BASENAME}>
      <Navbar />
      <Link to="/diagram">diagram</Link>
      <br></br>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/calendar" element={<Calendar/>}/>
        <Route path="/diagram" element={<Diagram/>}/>
        <Route path="/tasks" element={<Todolist/>}/>
      </Routes> 
    </Router>
  );
}


export default App;
