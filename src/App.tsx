// import logo from './logo.svg';
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import Home from "./pages/home"
// import Calendar from "./pages/calendar"
// import Tasks from "./pages/tasks"
import Tasks from "./pages/tasks"

function App() {
  const ROUTER_BASENAME = "/C_2212"

  return (
    <Router basename={ROUTER_BASENAME}>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Tasks/>}/>
        {/* <Route path="/calendar" element={<Calendar/>}/> */}
        {/* <Route path="/diagram" element={<Diagram/>}/> */}
        {/* <Route path="/tasks" element={<Tasks/>}/> */}
      </Routes> 
    </Router>
  );
}


export default App;
