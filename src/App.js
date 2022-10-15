// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"
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
  const ROUTER_BASENAME = 
    process.env.NODE_ENV === "development" ? "/" : "/C_2212"
  console.log(ROUTER_BASENAME)

  return (
    <Router basename={ROUTER_BASENAME}>
      <Routes>
        <Route path="/" exact={true} element={<Home/>}/>
        <Route path="/calendar" element={<Calendar/>}/>
        <Route path="/diagram" element={<Diagram/>}/>
      </Routes> 
    </Router>
  );
}


export default App;
