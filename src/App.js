// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom"
import React from 'react';

import Home from "./pages/home"
import Calendar from "./pages/calendar"
import Diagram from "./pages/diagram"


function App() {
  const ROUTER_BASENAME = "/C_2212"

  return (
    <Router basename={ROUTER_BASENAME}>
      <Link to="/">home</Link>
      <br></br>
      <Link to="/calendar">calendar</Link>
      <br></br>
      <Link to="/diagram">diagram</Link>
      <br></br>
      <Routes>
        <Route path="/" exact={true} element={<Home/>}/>
        <Route path="/calendar" element={<Calendar/>}/>
        <Route path="/diagram" element={<Diagram/>}/>
      </Routes> 
    </Router>
  );
}


export default App;
