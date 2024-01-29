// Import useState, useDispatch
import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

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
            <h1 className='text-lg'>Chi tiết công việc</h1>
            <button className='p-2 bg-yellow-400 text-white' onClick={handlecomeback}>Quay lại</button>
            {isEditing ? (
                <form>
                    <input
                        type="text"
                        value={editedTask}
                        onChange={(e) => setEditedTask(e.target.value)}
                    />
                    <button type="button" onClick={handleEditSave}>
                        Lưu
                    </button>
                    <button type="button" onClick={handleEditCancel}>
                        Hủy
                    </button>
                </form>
            ) : (
                <>
                    <p className='mt-5 mb-5 text-base'>Công việc: <span className='text-red-600'> {task.content}</span></p>
                    <div className='flex items-center justify-between'>
                        {!task.completed && isCompletedVisible && (
                            <button className='p-2 bg-blue-500 text-white' onClick={() => handleMarkAsCompleted(task.id)}>Đánh dấu hoàn thành</button>
                        )}
                        {!task.completed && isProcessingVisible && (
                            <button className='p-2 bg-orange-600' onClick={() => handleMarkAsProcessing(task.id)}>Đánh dấu đang thực hiện</button>
                        )}
                        <button className='p-2 bg-yellow-400 text-white' onClick={startEditing}>Chỉnh sửa</button>
                    </div>
                    <div className="text-center">
                        <button onClick={handleDelete} className='p-2 bg-black text-white mt-2'>Xóa công việc</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default TaskDetails;
