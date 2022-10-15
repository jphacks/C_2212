// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
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
    process.env.NODE_ENV === "development" ? "/" : "C_2212"

  return (
    <Router basename={ROUTER_BASENAME}>
      <Routes>
        <Route index element={<Home/>}/>
        <Route path="calendar/" element={<Calendar/>} />
        <Route path="diagram/" element={<Diagram/>} />
      </Routes>
    </Router>
  );
}


export default App;
