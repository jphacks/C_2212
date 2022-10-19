// Navbar.js
import React from "react";

import { Link } from "react-router-dom";
import "./navbar.css"

const sample_tasks = [
  "shakou", "TOEIC", "ababa"
]


const NavTaskList = ({tasks}: {tasks: Array<string>}) => {
  return (
    <div className="dropdown-lists">
      {tasks.map((task) => {
        return (
          <li key={task} className="dropdown-list">
            <Link style={{height: "100%"}} to={`/tasks?task_class_name=${task}`}>{task}</Link>
          </li>
        )
      })}
    </div>
  );
};

const Navbar = () => {

  return (
    <nav className="navigation">
      <Link to="/" className="brand-name">
        JunSche
      </Link>
      <div className="navigation-menu">
        <ul>
          <li>
            <Link to="/today-tasks">
              Today
            </Link>
          </li>
          <li>
            <Link to="/calendar">
              Calendar
            </Link>
          </li>
        </ul>
      </div>
      <div className="navigation-tasks">
        <Link to="/tasks" className="navogation-task-title">Tasks</Link>
        <NavTaskList tasks={sample_tasks} />
      </div>
    </nav>
  );
}



export default Navbar