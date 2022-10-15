// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom"
import React from 'react';

const Home = () => {
  return (
    <p>this is <b>Home</b> page.</p>
  )
}

const Calendar = () => {
  return (
    <p>this is <b>Calendar</b> page.</p>
  )
}

const Diagram = () => {
  return (
    <p>this is <b>Diagram</b> page</p>
  )
}

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
