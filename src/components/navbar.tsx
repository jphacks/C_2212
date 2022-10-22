// React Hookをロード
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// CSSをロード
import "./navbar.css";

// ローカルファイルをロード
import { localStorageManager } from "../lib/localstorage/manager";

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

  const navigate = useNavigate();

  if (!localStorageManager) {
    console.warn("lsmanager is undefined")
    return <></>
  }
  const TaskData = localStorageManager.getData();
  let tasks_name = [];
  for(let i=0;i < TaskData.task_groups.length;i++){
    tasks_name[i] = TaskData.task_groups[i].task_group_name;
  }
  return (
    <nav className="navigation">
      <Link to="/" className="brand-name">
        JunSche
      </Link>
      <div className="navigation-menu">
        <ul>
          {/* <li>
            <Link to="/today-tasks">
              Today
            </Link>
          </li> */}
          <li>
            <Link to="/calendar">
              Calendar
            </Link>
          </li>
        </ul>
      </div>
      <div className="navigation-tasks" style={{cursor: 'pointer'}}>
        <div onClick={() => {navigate("/tasks");}} className="navogation-task-title">Tasks</div>
        <NavTaskList tasks={tasks_name} />
      </div>
    </nav>
  );
}


export default Navbar