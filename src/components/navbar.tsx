// Navbar.js


import { useState } from "react";
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

  // const [isExpand, setIsExpand] = useState<Boolean>(false);

  // const hExpandButton = () => {
  //   setIsExpand(prev => !prev);
  // }

  return (
    <nav className="navigation">
      <a href="/" className="brand-name">
        JunSche
      </a>
      <div className="navigation-menu">
        <ul>
          <li>
            <a href="/home">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
        </ul>
      </div>
      <div className="navigation-tasks">
        <div>Tasks</div>
        <NavTaskList tasks={sample_tasks} />
      </div>
    </nav>
  );
}



export default Navbar