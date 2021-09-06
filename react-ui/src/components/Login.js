import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LoadingOverlay from './LoadingOverlay.js';
import { Container, Image, Form, Button } from 'react-bootstrap';
import styled from 'styled-components';
import axios from 'axios';
import '../assets/styles/dashboard.css';

const PageContainer = styled.div`
    height: 100vh;
    width: 100vw;
    padding: 1em;
`;

const LoginContainer = styled(Container)`
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

const LoginForm = styled(Form)`
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

const VidContainer = styled(Container)`
    width: 100vw;
    height: 100vh;
    text-align: center;
    overflow: hidden;
    z-index: -1000;
    position: fixed;
    padding: 0;
    margin: 0;
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
            loading: false,
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
            loading: true,
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
                axios
                    .get(`/api/user/`)
                    .then((response) => {
                        this.setState({
                            loading: false,
                        });
                        this.props.history.push({
                            pathname: '/dashboard',
                        });
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            })
            .catch((err) => {
                event.target.style = 'opacity: 100%';
                if (err.response.status === 406) {
                    this.setState({
                        activeError: true,
                        errorMessage: 'Please complete all fields',
                        loading: false,
                    });
                } else if (err.response.status === 404) {
                    this.setState({
                        activeError: true,
                        errorMessage: 'User not found',
                        loading: false,
                    });
                } else if (err.response.status === 403) {
                    this.setState({
                        activeError: true,
                        errorMessage: 'Invalid login credentials',
                        loading: false,
                    });
                }
            });
    }
    render() {
        return (
            <div className='test'>
                {this.state.loading ? <LoadingOverlay /> : null}
                <VidContainer fluid>
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
                        <Image
                            src='https://biggidea.s3.us-west-1.amazonaws.com/Logo_Text_No_BG.png'
                            alt='Logo'
                            fluid
                        />
                    </div>
                    <LoginForm>
                        <Form fluid>
                            <Form.Group
                                className='mb-3'
                                controlId='loginUsername'>
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type='text'
                                    value={this.state.usernameVal}
                                    placeholder='Enter Username'
                                    onChange={(e) =>
                                        this.updateUsername(e.target.value)
                                    }
                                />
                            </Form.Group>

                            <Form.Group
                                className='mb-3'
                                controlId='loginPassword'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    placeholder='Enter Password'
                                    type={
                                        this.state.passwordHidden
                                            ? 'password'
                                            : 'text'
                                    }
                                    value={this.state.passwordVal}
                                    onChange={(e) =>
                                        this.updatePassword(e.target.value)
                                    }
                                />
                            </Form.Group>
                            <Form.Group
                                className='mb-3'
                                controlId='loginShowPassword'>
                                <Form.Check
                                    type='checkbox'
                                    label='Show Password'
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
                            </Form.Group>
                            <Button
                                variant='outline-primary'
                                type='submit'
                                onClick={(e) => this.handleSubmit(e)}>
                                Login
                            </Button>
                        </Form>
                    </LoginForm>
                    <Link to='/create-account'>
                        <h4>Create Account</h4>
                    </Link>
                    {this.state.activeError ? (
                        <ErrorMessage>{this.state.errorMessage}</ErrorMessage>
                    ) : null}
                </LoginContainer>
            </div>
        );
    }
}
