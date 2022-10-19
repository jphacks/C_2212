import { useSearchParams } from 'react-router-dom';
import './task.css';

const Task = () => {
    const [parms] = useSearchParams();
    let target = parms.get('task_class_name');
    return(
        <div>
            <h1 className='title'>{target}の計画表</h1>
        </div>
    )
    
}

export default Task;