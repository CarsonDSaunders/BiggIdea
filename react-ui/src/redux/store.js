import { configureStore } from "@reduxjs/toolkit";
import alertReducer from "./alertSlice";

export default configureStore({
    reducer: {
        alert: alertReducer,
    },
});
