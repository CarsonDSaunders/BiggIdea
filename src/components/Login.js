import React, { Component } from "react";
import { Switch, Link, Route } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const LoginContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const LoginForm = styled.form`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
`;
export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            usernameVal: "",
            passwordVal: "",
        };

        this.updateUsername = this.updateUsername.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    updateUsername(val) {
        this.setState({ usernameVal: val });
    }

    updatePassword(val) {
        this.setState({ passwordVal: val });
    }

    handleSubmit(event) {
        event.preventDefault();
        axios
            .post("/api/login", {
                username: this.state.usernameVal,
                password: this.state.passwordVal,
            })
            .then((response) => {
                const user = { ...response.data };
                // let now = new Date().toISOString();
                // let nowArr = now.split("")
                // nowArr.splice(10, 1, " ")
                // nowArr.splice(19, 24, "")
                // now = nowArr.join("")
                // user.last_login = now
                console.log(user);
                axios.get(`/api/user/${user.user_id}`)
                .then( (response) => {
                    console.log(response);
                    this.props.history.push('/dashboard');
                })
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        return (
            <LoginContainer>
                <div class="login-header">
                    <img src="https://biggidea.s3.us-west-1.amazonaws.com/Bigg+Idea+-+Logo+Text.png" alt="Logo" />
                </div>
                <LoginForm>
                    <input
                        class="login-input"
                        type="text"
                        value={this.state.usernameVal}
                        placeholder="Username"
                        onChange={(e) => this.updateUsername(e.target.value)}
                    ></input>
                    <input
                        class="login-input"
                        type="password"
                        value={this.state.passwordVal}
                        placeholder="Password"
                        onChange={(e) => this.updatePassword(e.target.value)}
                    ></input>
                    <button onClick={(e) => this.handleSubmit(e)}>Login</button>
                </LoginForm>
                <Link to="/create-account">
                    <h4>Create Account</h4>
                </Link>
            </LoginContainer>
        );
    }
}
