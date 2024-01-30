import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './App.css';
import { addTask, deleteTask, markCompleted, markProcessing, selectCategory, setSortOption, setFilterOption } from './app/actions';
import TodoList from './components/todolist/TodoList';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import TaskDetails from './components/todolist/TaskDetails';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel, NativeSelect } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

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
          <h1 className='p-2 text-lg mb-3'>React To-Do List Redux</h1>
          <div className="add-task justify-between gap-2">
            <TextField label="Thêm công việc"
              className='p-2'
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Thêm công việc..."
            />
            <FormControl className='w-[200px] p-2' >
              <InputLabel htmlFor="category" id="demo-simple-select-label">Chọn danh mục</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                onChange={(e) => selectCategory(e.target.value)}
                label="Chọn danh mục"
                inputProps={{
                  name: 'category',
                  id: 'category',
                }}
              >
                <MenuItem value="" disabled>
                  Chọn danh mục
                </MenuItem>
                {taskCategories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button variant="contained" size='medium' endIcon={<AddCircleIcon />} onClick={handleAddTask}>Thêm</Button>
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
