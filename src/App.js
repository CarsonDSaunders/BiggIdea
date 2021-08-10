import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import LoginCreation from "./components/LoginCreation";
import Dashboard from "./components/Dashboard";
import Board from "./components/Board";
import './App.css'

export class App extends React.Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route path="/create-account" component={LoginCreation} />
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/boards/:id/preview" component={Board} />
                </Switch>
            </div>
        );
    }
}

export default App;
