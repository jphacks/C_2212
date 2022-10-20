// Navbar.js
import React from "react";

import { Link } from "react-router-dom";
import "./navbar.css";
import task_ls from "../lib/data/task_ls.json"

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
  let tasks_name = [];
  for(let i=0;i !== task_ls.tasks.length;i++){
    tasks_name[i] = task_ls.tasks[i].name
  }
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
        <div onClick={() => {window.location.href = "/C_2212/tasks";}} className="navogation-task-title">Tasks</div>
        <NavTaskList tasks={tasks_name} />
      </div>
    </nav>
  );
}

export default Navbar