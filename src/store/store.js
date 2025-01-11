import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./articlesSlice"

const store = configureStore({
    reducer: {
        tasks: taskReducer,
    },
});

export default store;