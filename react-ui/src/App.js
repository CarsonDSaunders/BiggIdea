import React from "react";
import { Route, Switch } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Board from "./components/Board";
import Login from "./components/Login";
import LoginCreation from "./components/LoginCreation";
import withAuth from "./components/withAuth";

export default function App() {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/create-account" component={LoginCreation} />
                <Route path="/dashboard" component={withAuth(Dashboard)} />
                <Route path="/boards/:id/preview" component={withAuth(Board)} />
            </Switch>
        </div>
    );
}
