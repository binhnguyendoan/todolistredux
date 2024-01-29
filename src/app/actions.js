export const addTask = (newTask) => {
    return {
        type: 'ADD_TASK',
        payload: newTask,
    };
};

export const deleteTask = (taskId) => {
    return {
        type: 'DELETE_TASK',
        payload: taskId,
    };
};
export const markCompleted = (taskId) => {
    return {
        type: 'MARK_COMPLETED',
        payload: { taskId },
    };
};
export const markProcessing = (taskId) => {
    return {
        type: 'MARK_PROCESSING',
        payload: { taskId },
    };
};
export const selectCategory = (categoryId) => {
    return {
        type: 'SELECT_CATEGORY',
        payload: categoryId,
    };
};
export const addCategory = (newCategory) => {
    return {
        type: 'ADD_CATEGORY',
        payload: newCategory,
    };
};
export const setSortOption = (option) => {
    return {
        type: 'SET_SORT_OPTION',
        payload: option,
    };
};

export const setFilterOption = (option) => {
    return {
        type: 'SET_FILTER_OPTION',
        payload: option,
    };
};

export const editTask = (taskId, newContent) => ({
    type: 'EDIT_TASK',
    payload: { taskId, newContent },
});