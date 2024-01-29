import React, { useState, useEffect } from 'react';

const Task = ({ task, onDelete, onMarkCompleted, onMarkAsProcessing, selectCategory, taskCategories }) => {
    const [isCompletedVisible, setIsCompletedVisible] = useState(true);
    const [isProcessingVisible, setIsProcessingVisible] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        if (task.category) {
            setSelectedCategory(task.category);
        }
    }, [task.category]);

    const handleMarkAsCompleted = (taskId) => {
        onMarkCompleted(taskId);
        setIsProcessingVisible(false);
    };

    const handleMarkAsProcessing = (taskId) => {
        onMarkAsProcessing(taskId);
        setIsCompletedVisible(false);
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        selectCategory(e.target.value);
    };
    const handleEditCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        selectCategory(e.target.value);
    };

    return (
        <div className={`pt-3 ${task.completed ? 'completed' : ''} `}>
            <div className='task '>
                <span>{task.content}</span>
                <select value={selectedCategory} onChange={handleCategoryChange}>
                    {taskCategories ? (
                        taskCategories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))
                    ) : (
                        <option value="" disabled>
                            Không có danh mục
                        </option>
                    )}
                </select>
            </div>
            {/* <div className='flex items-center justify-between'>
                {!task.completed && isCompletedVisible && (
                    <button className='p-2 bg-blue-500 text-white' onClick={() => handleMarkAsCompleted(task.id)}>Đánh dấu hoàn thành</button>
                )}
                {!task.completed && isProcessingVisible && (
                    <button className='p-2 bg-orange-600' onClick={() => handleMarkAsProcessing(task.id)}>Đánh dấu đang thực hiện</button>
                )}
                <button className='p-2 bg-red-600 text-white' onClick={() => onDelete(task.id)}>Xóa</button>
            </div> */}
        </div>
    );
};

export default Task;
