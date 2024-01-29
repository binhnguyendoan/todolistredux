
const intitialSate = {
    tasks: [],
    completedTaks: [],
    processingTaks: [],
    taskCategories: [
        { id: 1, name: 'Công việc cá nhân' },
        { id: 2, name: 'Công việc công ty' },
    ],
    selectedCategory: null,
    sortOption: 'default',
    filterOption: 'all',
};
const rootReducer = (state = intitialSate, action) => {
    switch (action.type) {
        case 'ADD_TASK':
            return {
                ...state,
                tasks: [...state.tasks, { ...action.payload, category: state.selectedCategory }],
                processingTaks: [...state.processingTaks, { ...action.payload, category: state.selectedCategory }],
            };
        case 'DELETE_TASK':
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.payload),
            }
        case 'MARK_COMPLETED':
            const updatedTasksCompleted = state.tasks.map(task => {
                if (task.id === action.payload) {
                    return { ...task, completed: true };
                }
                return task;
            });
            localStorage.setItem('tasks', JSON.stringify(updatedTasksCompleted));
            return { ...state, tasks: updatedTasksCompleted };
        case 'MARK_PROCESSING':
            const processing = state.completedTaks.find(task => task.id === action.payload);
            return {
                ...state,
                processingTaks: [...state.processingTaks, processing],
                completedTaks: state.completedTaks.filter(task => task.id !== action.payload),
            }

        case 'SELECT_CATEGORY':
            return {
                ...state,
                selectedCategory: action.payload,
            };
        case 'ADD_CATEGORY':
            return {
                ...state,
                taskCategories: [...state.taskCategories, { id: Date.now(), name: action.payload }],
            };
        case 'SET_SORT_OPTION':
            return {
                ...state,
                sortOption: action.payload,
            };
        case 'SET_FILTER_OPTION':
            return {
                ...state,
                filterOption: action.payload,
            };
        case 'EDIT_TASK':
            return {
                ...state,
                tasks: state.tasks.map((task) =>
                    task.id === action.payload.taskId
                        ? { ...task, content: action.payload.newContent }
                        : task
                ),
            };
        default:
            return {
                ...state,
                processingTasks: state.processingTaks || [],
                completedTasks: state.completedTaks || [],

            };
    }
}
export default rootReducer;