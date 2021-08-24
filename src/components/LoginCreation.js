import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

//styled-componenets
const LoginContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const LoginForm = styled.form`
    width: auto;
    height: 60vh;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    border: 3px solid lightgray;
    border-radius: 1em;
    padding: 1em 5em;
`;

const ErrorMessage = styled.p`
    color: red;
    font-size: 2em;
`;

const Field = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`;

const FieldName = styled.strong`
    font-size: 1.5em;
`;

const FieldInput = styled.input`
    margin-left: 2em;
`;
export default class LoginCreation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            emailVal: '',
            firstNameVal: '',
            lastNameVal: '',
            usernameVal: '',
            passwordVal: '',
            passwordConfirmVal: '',
            activeError: false,
            errorMessage: '',
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
        this.backToLogin = this.backToLogin.bind(this);
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
        axios
            .post('/api/login/create', {
                email: this.state.emailVal,
                firstName: this.state.firstNameVal,
                lastName: this.state.lastNameVal,
                username: this.state.usernameVal,
                password: this.state.passwordVal,
                passwordConfirm: this.state.passwordConfirmVal,
            })
            .then((response) => {
                if (response.status === 200) {
                    this.setState({
                        activeError: true,
                        errorMessage: 'Success',
                    });
                } else {
                    console.log(response);
                }
            });
    }

    validateInput() {
        let curState = { ...this.state };
        if (
            curState.emailVal === '' ||
            curState.firstNameVal === '' ||
            curState.lastNameVal === '' ||
            curState.usernameVal === '' ||
            curState.passwordVal === '' ||
            curState.passwordConfirmVal === ''
        ) {
            this.setState({
                activeError: true,
                errorMessage: 'Not all fields are properly filled out',
            });
            console.error(`ERROR: Not all fields are properly filled out`);
            return;
        } else if (curState.passwordVal !== curState.passwordConfirmVal) {
            this.setState({
                activeError: true,
                errorMessage: 'Passwords do not match',
            });
            console.error(`ERROR: Passwords do not match`);
            return;
        } else {
            this.setState({
                activeError: false,
                errorMessage: '',
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

    backToLogin() {
        this.props.history.push('/');
    }

    render() {
        return (
            <LoginContainer>
                <div className='login-creation-header'>
                    <img
                        style={{ cursor: 'pointer' }}
                        src='https://biggidea.s3.us-west-1.amazonaws.com/Logo_Header.png'
                        onClick={() => this.backToLogin()}
                    />
                </div>
                <LoginForm>
                    <Field>
                        <FieldName>Email:</FieldName>
                        <FieldInput
                            className='login-creation-input'
                            type='email'
                            placeholder='Email'
                            value={this.state.emailVal}
                            onChange={(e) => this.updateEmail(e.target.value)}
                        />
                    </Field>
                    <Field>
                        <FieldName>First Name:</FieldName>
                        <FieldInput
                            className='login-creation-input'
                            type='text'
                            placeholder='First Name'
                            value={this.state.firstNameVal}
                            onChange={(e) =>
                                this.updateFirstName(e.target.value)
                            }
                        />
                    </Field>
                    <Field>
                        <FieldName>Last Name:</FieldName>
                        <FieldInput
                            className='login-creation-input'
                            type='text'
                            placeholder='Last Name'
                            value={this.state.lastNameVal}
                            onChange={(e) =>
                                this.updateLastName(e.target.value)
                            }
                        />
                    </Field>
                    <Field>
                        <FieldName>Username:</FieldName>
                        <FieldInput
                            className='login-creation-input'
                            type='text'
                            placeholder='Username'
                            value={this.state.usernameVal}
                            onChange={(e) =>
                                this.updateUsername(e.target.value)
                            }
                        />
                    </Field>
                    <Field>
                        <FieldName>Password:</FieldName>
                        <FieldInput
                            className='login-creation-input'
                            type='text'
                            placeholder='Password'
                            value={this.state.passwordVal}
                            onChange={(e) =>
                                this.updatePassword(e.target.value)
                            }
                        />
                    </Field>
                    <Field>
                        <FieldName>Confirm Password:</FieldName>
                        <FieldInput
                            className='login-creation-input'
                            type='text'
                            placeholder='Confirm Password'
                            value={this.state.passwordConfirmVal}
                            onChange={(e) =>
                                this.updatePasswordConfirm(e.target.value)
                            }
                        />
                    </Field>

                    <Link to='/'>
                        <button
                            type='submit'
                            className='login-creation-submit standard-btn'
                            onClick={(e) => this.handleSubmit(e)}>
                            Create Account
                        </button>
                    </Link>
                    <ErrorMessage>{this.state.errorMessage}</ErrorMessage>
                </LoginForm>
            </LoginContainer>
        );
    }
}
