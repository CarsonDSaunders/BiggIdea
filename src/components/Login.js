import React, { Component } from "react";
import { Switch, Link, Route } from "react-router-dom";
import styled from "styled-components";

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
export default class Login extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             usernameVal: "",
             passwordVal: "",
        }

        this.updateUsername = this.updateUsername.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
         
    }

    updateUsername(val) {
        this.setState({ usernameVal: val })
    }

    updatePassword(val) {
        this.setState({ passwordVal: val })
    }

    render() {
        return (
            <LoginContainer>
                <div class="login-header">
                    <img src="https://biggidea.s3.us-west-1.amazonaws.com/Bigg+Idea+-+Logo+Text.png" alt="Logo" />
                </div>
                <LoginForm>
                    <input class="login-input" type="text" value={this.state.usernameVal} placeholder="Username" onChange={(e) => this.updateUsername(e.target.value)}></input>
                    <input class="login-input" type="text" value={this.state.passwordVal} placeholder="Password" onChange={(e) => this.updatePassword(e.target.value)}></input>
                    <Link to="/dashboard">
                        <button>Login</button>
                    </Link>
                </LoginForm>
                <Link to="/create-account">
                    <h4>Create Account</h4>
                </Link>
            </LoginContainer>
        );
    }
}
