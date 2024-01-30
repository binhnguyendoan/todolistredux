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
        <div>
            <div className={`pt-3 ${task.completed ? 'completed' : ''}`}>
                <div className='task  hover:bg-black hover:text-white'>
                    <span>{task.content}</span>
                    <div>
                        {taskCategories ? (
                            taskCategories.map((category) => (
                                <span key={category.id}>
                                    {selectedCategory === category.id && category.name}
                                </span>
                            ))
                        ) : (
                            <span>Không có danh mục</span>
                        )}
                    </div>
                </div>
                {/* Add your additional UI or actions here */}
            </div>
        </div>
    );
};

export default Task;
