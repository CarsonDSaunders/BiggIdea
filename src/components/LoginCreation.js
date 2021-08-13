import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

//styled-componenets
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
export default class LoginCreation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            emailVal: "",
            firstNameVal: "",
            lastNameVal: "",
            usernameVal: "",
            passwordVal: "",
            passwordConfirmVal: "",
            activeError: false,
            errorMessage: "",
        };

        this.updateEmail = this.updateEmail.bind(this);
        this.updateFirstName = this.updateFirstName.bind(this);
        this.updateLastName = this.updateLastName.bind(this);
        this.updateUsername = this.updateUsername.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.updatePasswordConfirm = this.updatePasswordConfirm.bind(this);
        this.sendRequest = this.sendRequest.bind(this);
        this.validateInput = this.validateInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    updateEmail(val) {
        this.setState({ emailVal: val });
    }

    updateFirstName(val) {
        this.setState({ firstNameVal: val });
    }

    updateLastName(val) {
        this.setState({ lastNameVal: val });
    }

    updateUsername(val) {
        this.setState({ usernameVal: val });
    }

    updatePassword(val) {
        this.setState({ passwordVal: val });
    }

    updatePasswordConfirm(val) {
        this.setState({ passwordConfirmVal: val });
    }

    sendRequest() {
        axios.post("/api/login/create", {
            email: this.state.emailVal,
            firstName: this.state.firstNameVal,
            lastName: this.state.lastNameVal,
            username: this.state.usernameVal,
            password: this.state.passwordVal,
            passwordConfirm: this.state.passwordConfirmVal,
        });
    }

    validateInput() {
        let curState = { ...this.state };
        if (
            curState.emailVal === "" ||
            curState.firstNameVal === "" ||
            curState.lastNameVal === "" ||
            curState.usernameVal === "" ||
            curState.passwordVal === "" ||
            curState.passwordConfirmVal === ""
        ) {
            this.setState({
                activeError: true,
                errorMessage: "Not all fields are properly filled out",
            });
            console.error(`ERROR: Not all fields are properly filled out`);
            return;
        } else if (curState.passwordVal !== curState.passwordConfirmVal) {
            this.setState({
                activeError: true,
                errorMessage: "Passwords do not match",
            });
            console.error(`ERROR: Passwords do not match`);
            return;
        } else {
            this.setState({
                activeError: false,
                errorMessage: "",
            });
            return;
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        this.validateInput();
        if (this.state.activeError === false) {
            this.sendRequest();
        }
    }

    render() {
        return (
            <LoginContainer>
                <div className="login-creation-header">
                    <h1 className="logo">Bigg Idea</h1>
                </div>
                <LoginForm>
                    <p>Email:</p>
                    <input
                        className="login-creation-input"
                        type="text"
                        placeholder="Email"
                        value={this.state.emailVal}
                        onChange={(e) => this.updateEmail(e.target.value)}
                    />
                    <p>First Name:</p>
                    <input
                        className="login-creation-input"
                        type="text"
                        placeholder="First Name"
                        value={this.state.firstNameVal}
                        onChange={(e) => this.updateFirstName(e.target.value)}
                    />
                    <p>Last Name:</p>
                    <input
                        className="login-creation-input"
                        type="text"
                        placeholder="Last Name"
                        value={this.state.lastNameVal}
                        onChange={(e) => this.updateLastName(e.target.value)}
                    />
                    <p>Username:</p>
                    <input
                        className="login-creation-input"
                        type="text"
                        placeholder="Username"
                        value={this.state.usernameVal}
                        onChange={(e) => this.updateUsername(e.target.value)}
                    />
                    <p>Password:</p>
                    <input
                        className="login-creation-input"
                        type="text"
                        placeholder="Password"
                        value={this.state.passwordVal}
                        onChange={(e) => this.updatePassword(e.target.value)}
                    />
                    <p>Confirm Password:</p>
                    <input
                        className="login-creation-input"
                        type="text"
                        placeholder="Confirm Password"
                        value={this.state.passwordConfirmVal}
                        onChange={(e) =>
                            this.updatePasswordConfirm(e.target.value)
                        }
                    />
                    <Link to="/">
                        <button
                            type="submit"
                            className="login-creation-submit"
                            onClick={(e) => this.handleSubmit(e)}
                        >
                            Create Account
                        </button>
                    </Link>
                    <ErrorMessage>{this.state.errorMessage}</ErrorMessage>
                </LoginForm>
            </LoginContainer>
        );
    }
}
