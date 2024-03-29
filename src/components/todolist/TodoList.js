
import React from 'react';
import Task from './Task';
import { Link } from 'react-router-dom';

const TodoList = ({ tasks, onDelete, onMarkCompleted, onMarkAsProcessing, taskCategories }) => {

    return (
        <div>
            <div className="todo-list">
                <h1 className='mb-2 text-lg'>Danh sách công việc</h1>
                {tasks.map(task => (
                    <div key={task.id}>
                        <Link to={`/task/${task.id}`}>
                            <Task task={task} onDelete={onDelete} onMarkCompleted={onMarkCompleted} onMarkAsProcessing={onMarkAsProcessing} taskCategories={taskCategories} />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TodoList;
