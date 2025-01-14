import { createSlice } from "@reduxjs/toolkit";

const articlesSlice = createSlice({
    name: "tasks",
    initialState: {
        tasks: [],
    },
    reducers: {
        addTask: (state, action) => {
            state.tasks.push(action.payload);
        },
        updateTask: (state, action) => {
            const { index, updatedTask } = action.payload;
            state.tasks[index] = updatedTask; 
        },
        removeTask: (state, action) => {
            state.tasks.splice(action.payload, 1);
        }
    },
});

export const { addTask , updateTask, removeTask} = articlesSlice.actions;
export default articlesSlice.reducer;