import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import '../assets/styles/dashboard.css';

const LoginContainer = styled.div`
    align-self: center;
    width: 40%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 3em;

    @media (max-width: 1024px) {
        width: 100%;
        margin: 0;
    }
`;

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;

    @media (max-width: 1024px) {
        width: 100vw;
        height: 100vh;
        margin: 0;
    }
`;

const LoginForm = styled.form`
    width: 100vw;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    @media (max-width: 1024px) {
        width: 100vw;
        margin: 0;
    }
`;

const ErrorMessage = styled.p`
    color: red;
    font-size: 2em;
`;

const InputField = styled.input`
    background: none;
    font-size: 1.2em;
    padding: 10px 10px 10px 5px;
    display: block;
    border: none;
    border-radius: 0;
    border-bottom: 1px solid lightgray;
    letter-spacing: 0.1em;
    margin-bottom: 1em;
`;

const VidContainer = styled.div`
    width: 100vw;
    height: 100vh;
    text-align: center;
    overflow: hidden;
    z-index: -1000;
    position: fixed;
`;

const Video = styled.video`
    width: inherit;
    height: inherit;
    -o-filter: blur(15px);
    filter: blur(15px);
    object-fit: cover;
    transform: scale(1.04);
`;
export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            usernameVal: '',
            passwordVal: '',
            passwordHidden: true,
            activeError: false,
            errorMessage: '',
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
        event.target.style = 'opacity: 40%';
        this.setState({
            activeError: false,
            errorMessage: '',
        });
        axios
            .post('/api/authenticate', {
                username: this.state.usernameVal,
                password: this.state.passwordVal,
            })
            .then((response) => {
                event.target.style = 'opacity: 100%';
                this.setState({
                    activeError: false,
                    errorMessage: '',
                });
                this.props.history.push({
                    pathname: '/dashboard',
                });
            })
            .catch((err) => {
                event.target.style = 'opacity: 100%';
                if (err.response.status === 406) {
                    this.setState({
                        activeError: true,
                        errorMessage: 'Please complete all fields',
                    });
                } else if (err.response.status === 404) {
                    this.setState({
                        activeError: true,
                        errorMessage: 'User not found',
                    });
                } else if (err.response.status === 403) {
                    this.setState({
                        activeError: true,
                        errorMessage: 'Invalid login credentials',
                    });
                }
            });
    }

    render() {
        return (
            <PageContainer>
                <VidContainer>
                    <Video loop muted autoPlay id='bgVideo'>
                        <source
                            src='https://biggidea.s3.us-west-1.amazonaws.com/Login_BG.mp4'
                            type='video/mp4'
                        />
                        Sorry, your browser does not support HTML5 video.
                    </Video>
                </VidContainer>
                <LoginContainer>
                    <div className='login-header'>
                        <img
                            src='https://biggidea.s3.us-west-1.amazonaws.com/Logo_Text_No_BG.png'
                            alt='Logo'
                        />
                    </div>
                    <LoginForm>
                        <InputField
                            className='login-input'
                            type='text'
                            value={this.state.usernameVal}
                            placeholder='Username'
                            onChange={(e) =>
                                this.updateUsername(e.target.value)
                            }
                        />
                        <InputField
                            className='login-input'
                            type={
                                this.state.passwordHidden ? 'password' : 'text'
                            }
                            value={this.state.passwordVal}
                            placeholder='Password'
                            onChange={(e) =>
                                this.updatePassword(e.target.value)
                            }
                        />
                        <div>
                            <input
                                type='checkbox'
                                id='passwordHide'
                                name='passwordHide'
                                checked={
                                    this.state.passwordHidden ? false : true
                                }
                                value={
                                    this.state.passwordHidden
                                        ? 'password'
                                        : 'text'
                                }
                                onChange={(e) =>
                                    this.togglePassword(e.target.checked)
                                }
                            />
                            <label htmlFor='passwordHide'>Show password</label>
                        </div>
                        <button
                            className='standard-btn'
                            onClick={(e) => this.handleSubmit(e)}>
                            Login
                        </button>
                    </LoginForm>
                    <Link to='/create-account'>
                        <h4>Create Account</h4>
                    </Link>
                    {this.state.activeError ? (
                        <ErrorMessage>{this.state.errorMessage}</ErrorMessage>
                    ) : null}
                </LoginContainer>
            </PageContainer>
        );
    }
}
