import { createSlice } from "@reduxjs/toolkit";

export const alertSlice = createSlice({
    name: "alert",
    initialState: {
        alert: false,
        type: "",
        message: "",
    },
    reducers: {
        displayAlert: (state) => {
            state.alert = true;
        },
        hideAlert: (state) => {
            state.alert = false;
        },
        changeAlertType: (state, action) => {
            state.type = action.payload;
        },
        changeAlertMessage: (state, action) => {
            state.message = action.payload;
        },
    },
});

export const { displayAlert, hideAlert, changeAlertType, changeAlertMessage } =
    alertSlice.actions;

export default alertSlice.reducer;
