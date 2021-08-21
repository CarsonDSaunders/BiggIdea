import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
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

const ErrorMessage = styled.p`
    color: red;
    font-size: 2em;
`;
export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            usernameVal: "",
            passwordVal: "",
            passwordHidden: true,
            activeError: false,
            errorMessage: "",
        };

        this.updateUsername = this.updateUsername.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.togglePassword = this.togglePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    updateUsername(val) {
        this.setState({ usernameVal: val });
    }

    updatePassword(val) {
        this.setState({ passwordVal: val });
    }

    togglePassword(val) {
        if (val === false) {
            this.setState({ passwordHidden: true });
        } else {
            this.setState({ passwordHidden: false });
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({
            activeError: false,
            errorMessage: "",
        });
        axios
            .post("/api/authenticate", {
                username: this.state.usernameVal,
                password: this.state.passwordVal,
            })
            .then((response) => {
                this.setState({
                    activeError: false,
                    errorMessage: "",
                });
                const user = { ...response.data };
                this.props.history.push('/dashboard')
            })
            .catch((err) => {
                if (err.response.status === 406) {
                    this.setState({
                        activeError: true,
                        errorMessage: "Please complete all fields",
                    });
                } else if (err.response.status === 404) {
                    this.setState({
                        activeError: true,
                        errorMessage: "User not found",
                    });
                } else if (err.response.status === 403) {
                    this.setState({
                        activeError: true,
                        errorMessage: "Invalid login credentials",
                    });
                }
            });
    }

    render() {
        return (
            <LoginContainer>
                <div className="login-header">
                    <img
                        src="https://biggidea.s3.us-west-1.amazonaws.com/Bigg+Idea+-+Logo+Text.png"
                        alt="Logo"
                    />
                </div>
                <LoginForm>
                    <input
                        className="login-input"
                        type="text"
                        value={this.state.usernameVal}
                        placeholder="Username"
                        onChange={(e) => this.updateUsername(e.target.value)}
                    />
                    <input
                        className="login-input"
                        type={this.state.passwordHidden ? "password" : "text"}
                        value={this.state.passwordVal}
                        placeholder="Password"
                        onChange={(e) => this.updatePassword(e.target.value)}
                    />
                    <div>
                        <input
                            type="checkbox"
                            id="passwordHide"
                            name="passwordHide"
                            checked={this.state.passwordHidden ? false : true}
                            value={
                                this.state.passwordHidden ? "password" : "text"
                            }
                            onChange={(e) =>
                                this.togglePassword(e.target.checked)
                            }
                        />
                        <label htmlFor="passwordHide">Show password</label>
                    </div>
                    <button onClick={(e) => this.handleSubmit(e)}>Login</button>
                </LoginForm>
                <Link to="/create-account">
                    <h4>Create Account</h4>
                </Link>
                {this.state.activeError ? (
                    <ErrorMessage>{this.state.errorMessage}</ErrorMessage>
                ) : null}
            </LoginContainer>
        );
    }
}
