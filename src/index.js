import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { HashRouter, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import LoginCreation from "./components/LoginCreation";
import Dashboard from "./components/Dashboard";
import Board from "./components/Board";

ReactDOM.render(
    <HashRouter>
        <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/create-account" component={LoginCreation} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/boards/:id/preview" component={Board} />
        </Switch>
    </HashRouter>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
