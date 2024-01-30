// Import useState, useDispatch
import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import CheckIcon from '@mui/icons-material/Check';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, TextField, FormControl } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
const TaskDetails = ({ tasks, onDelete, onMarkCompleted, onMarkAsProcessing }) => {
    const [isCompletedVisible, setIsCompletedVisible] = useState(true);
    const [isProcessingVisible, setIsProcessingVisible] = useState(true);
    const [editedTask, setEditedTask] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { taskId } = useParams();

    const task = tasks.find((t) => t.id === parseInt(taskId, 10));

    if (!task) {
        return <p>Công việc không tồn tại</p>;
    }

    const startEditing = () => {
        setIsEditing(true);
        setEditedTask(task.content);
    };

    const handleEditSave = () => {
        dispatch({ type: 'EDIT_TASK', payload: { taskId: task.id, newContent: editedTask } });
        setIsEditing(false);
    };

    const handleEditCancel = () => {
        setIsEditing(false);
    };

    const handleMarkAsCompleted = (taskId) => {
        onMarkCompleted(taskId);
        setIsProcessingVisible(false);
    };

    const handleMarkAsProcessing = (taskId) => {
        onMarkAsProcessing(taskId);
        setIsCompletedVisible(false);
    };

    const handleDelete = () => {
        onDelete(task.id);
        navigate('/');
    };

    const handlecomeback = () => {
        navigate('/');
    };

    return (
        <div>
            <Button
                variant="contained"
                className='p-2 bg-yellow-400 text-white'
                startIcon={<KeyboardBackspaceIcon />}
                style={{ backgroundColor: '#000' }}
                onClick={handlecomeback}
            >
                Quay lại
            </Button>
            <h1 className='text-lg mb-3'>Chi tiết công việc</h1>
            {isEditing ? (
                <div className='text-center '>
                    <FormControl fullWidth>
                        <TextField
                            type="text"
                            value={editedTask}
                            onChange={(e) => setEditedTask(e.target.value)}
                            style={{ marginBottom: '10px', textAlign: 'center' }}
                        />
                    </FormControl>
                    <div className='flex center justify-center'>
                        <Button startIcon=<SaveIcon /> variant="contained" color="primary" onClick={handleEditSave} style={{ margin: '0 10px', textAlign: 'center' }} >
                            Lưu
                        </Button>
                        <Button startIcon=<CloseIcon /> variant="contained" color="secondary" onClick={handleEditCancel}>
                            Hủy
                        </Button>

                    </div>

                </div>
            ) : (
                <>
                    <p className='mt-5 mb-5 text-base text-center'>Công việc: <span className='text-red-600'> {task.content}</span></p>
                    <div className='flex items-center justify-between'>
                        {!task.completed && isCompletedVisible && (
                            <Button startIcon={<CheckIcon />} style={{ backgroundColor: 'blue', color: 'white' }} onClick={() => handleMarkAsCompleted(task.id)}> Hoàn thành</Button>
                        )}
                        {!task.completed && isProcessingVisible && (
                            <Button startIcon={<CheckIcon />} style={{ backgroundColor: 'gray', color: 'white' }} className='p-2 bg-orange-600' onClick={() => handleMarkAsProcessing(task.id)}>Đang thực hiện</Button>
                        )}
                        <Button startIcon={<EditNoteIcon />} style={{ backgroundColor: 'orange', color: 'white' }} onClick={startEditing}>Chỉnh sửa</Button>
                    </div>
                    <div className="text-center m-2">
                        <Button onClick={handleDelete} startIcon={<DeleteIcon />} style={{ backgroundColor: 'red', color: 'white' }}>Xóa công việc</Button>
                    </div>
                </>
            )}
        </div>
    );
};

export default TaskDetails;
