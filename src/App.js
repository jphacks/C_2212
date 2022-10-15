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
  return (
    <Router>
      <Routes>
        <Route path="C_2212/" element={<Home/>}/>
        <Route path="C_2212/calendar/" element={<Calendar/>} />
        <Route path="C_2212/diagram/" element={<Diagram/>} />
      </Routes>
    </Router>
  );
}


export default App;
