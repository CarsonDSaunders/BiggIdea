import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { HashRouter, BrowserRouter } from "react-router-dom";
import App from "./App.js";

import store from "./redux/store";
import { Provider } from "react-redux";
const Router =
    process.env.NODE_ENV !== "development" ? HashRouter : BrowserRouter;

ReactDOM.render(
    <HashRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </HashRouter>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
