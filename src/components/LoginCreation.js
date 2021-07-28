import React, { Component } from "react";
import { Switch, Link, Route } from "react-router-dom";
import styled from "styled-components";

//styled-componenets
const LoginContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const LoginForm = styled.form`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
`
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
        };

        this.updateUsername = this.updateUsername.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
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

    render() {
        return (
            <LoginContainer>
                <div class="login-creation-header">
                    <h1 class="logo">Bigg Idea</h1>
                </div>
                <LoginForm>
                    <input
                        class="login-creation-input"
                        type="text"
                        placeholder="Email"
                        value={this.state.emailVal}
                        onChange={(e) => this.updateUsername(e.target.value)}
                    ></input>
                    <input
                        class="login-creation-input"
                        type="text"
                        placeholder="First Name"
                        value={this.state.firstNameVal}
                        onChange={(e) => this.updateFirstName(e.target.value)}
                    ></input>
                    <input
                        class="login-creation-input"
                        type="text"
                        placeholder="Last Name"
                        value={this.state.lastNameVal}
                        onChange={(e) => this.updateLastName(e.target.value)}
                    ></input>
                    <input
                        class="login-creation-input"
                        type="text"
                        placeholder="Username"
                        value={this.state.usernameVal}
                        onChange={(e) => this.updateUsername(e.target.value)}
                    ></input>
                    <input
                        class="login-creation-input"
                        type="text"
                        placeholder="Password"
                        value={this.state.passwordVal}
                        onChange={(e) => this.updatePassword(e.target.value)}
                    ></input>
                    <input
                        class="login-creation-input"
                        type="text"
                        placeholder="Confirm Password"
                        value={this.state.passwordConfirmVal}
                        onChange={(e) =>
                            this.updatePasswordConfirm(e.target.value)
                        }
                    ></input>
                    <Link to="/">
                        <button type="submit" class="login-creation-submit">
                            Create Account
                        </button>
                    </Link>
                </LoginForm>
            </LoginContainer>
        );
    }
}
