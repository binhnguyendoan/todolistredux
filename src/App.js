import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './App.css';
import { addTask, deleteTask, markCompleted, markProcessing, selectCategory, setSortOption, setFilterOption } from './app/actions';
import TodoList from './components/todolist/TodoList';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import TaskDetails from './components/todolist/TaskDetails';

const App = ({ tasks, addTask, deleteTask, selectCategory, taskCategories, }) => {
  const [newTask, setNewTask] = useState('');

  const handleAddTask = () => {
    if (newTask.trim() !== '' && selectCategory !== null) {
      const newTaskObj = {
        id: Date.now(),
        content: newTask,
      };
      addTask(newTaskObj);
      setNewTask('');
    }
  };
  const handleDeleteTask = (taskId) => {
    deleteTask(taskId);
  };

  const handleMarkAsCompleted = (taskId) => {
    markCompleted(taskId);
  };
  const handleMarkAsProcessing = (taskId) => {
    markProcessing(taskId);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      dispatch({ type: 'SET_TASKS', payload: JSON.parse(savedTasks) });
    }
  }, []);


  ;
  return (
    <div>
      <Router>
        <div className="app">
          <h1 className='p-2 text-lg'>React To-Do List</h1>
          <div className="add-task">
            <input
              className='p-2'
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Thêm công việc..."
            />
            <select className='rounded-md border-2 ml-2' onChange={(e) => selectCategory(e.target.value)}>
              <option value="" disabled selected>
                Chọn danh mục
              </option>
              {taskCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            <button className='p-2 bg-orange-600 m-2' onClick={handleAddTask}>Thêm</button>
          </div>
          <Routes>
            <Route path="/" element={
              tasks.length === 0 ? (
                <p>Danh sách công việc trống</p>
              ) : (
                <TodoList tasks={tasks} onDelete={handleDeleteTask} onMarkCompleted={handleMarkAsCompleted} onMarkAsProcessing={handleMarkAsProcessing} taskCategories={taskCategories} />
              )
            } />

            <Route path="/task/:taskId" element={<TaskDetails tasks={tasks} onDelete={handleDeleteTask} onMarkCompleted={handleMarkAsCompleted} onMarkAsProcessing={handleMarkAsProcessing} />} />

          </Routes>


        </div>

      </Router>



    </div>
  );

};


const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
    taskCategories: state.taskCategories,
  };
};

const mapDispatchToProps = {
  addTask,
  deleteTask,
  markCompleted,
  markProcessing,
  selectCategory,

};
export default connect(mapStateToProps, mapDispatchToProps)(App);
