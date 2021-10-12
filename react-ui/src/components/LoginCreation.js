import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";
import { Form, Button, Row, Col, Image } from "react-bootstrap";

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
`;

const LoginContainer = styled.div`
    align-self: center;
    width: 60vw;
    height: 90vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 3em;

    @media (min-width: 768px) {
        width: 60vw;
        height: 70vh;
    }

    @media (min-width: 1024px) {
        width: 40vw;
    }
`;

const LoginForm = styled(Form)`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    @media (min-width: 768px) {
        width: 60vw;
    }

    @media (min-width: 1024px) {
        width: 40vw;
    }
`;

const ErrorMessage = styled.p`
    color: red;
    font-size: 2em;
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

const HeaderImg = styled(Image)`
    height: auto;
    width: 15em;
    margin: 0 auto;
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
            activeMessage: false,
            message: "",
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
            .post("/api/login/create", {
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
                        activeMessage: true,
                        message: "Success",
                    });
                } else {
                    console.log(response);
                }
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
                activeMessage: true,
                message: "Not all fields are properly filled out",
            });
            console.error(`ERROR: Not all fields are properly filled out`);
            return;
        } else if (curState.passwordVal !== curState.passwordConfirmVal) {
            this.setState({
                activeMessage: true,
                message: "Passwords do not match",
            });
            console.error(`ERROR: Passwords do not match`);
            return;
        } else {
            this.setState({
                activeMessage: false,
                message: "",
            });
            return;
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        this.validateInput();
        if (this.state.activeMessage === false) {
            this.sendRequest();
        }
    }

    backToLogin() {
        this.props.history.push("/");
    }

    render() {
        return (
            <PageContainer>
                <VidContainer>
                    <Video loop muted autoPlay id="bgVideo">
                        <source
                            src="https://biggidea.s3.us-west-1.amazonaws.com/Login_BG.mp4"
                            type="video/mp4"
                        />
                        Sorry, your browser does not support HTML5 video.
                    </Video>
                </VidContainer>
                <LoginContainer>
                    <div className="login-creation-header">
                        <Image
                            src="https://biggidea.s3.us-west-1.amazonaws.com/Logo_Header.png"
                            style={{ cursor: "pointer" }}
                            alt="Logo"
                            onClick={() => this.backToLogin()}
                        />
                    </div>
                    <LoginForm>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="jim@dundermiflin.com"
                                        value={this.state.emailVal}
                                        onChange={(e) =>
                                            this.updateEmail(e.target.value)
                                        }
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group
                                    className="mb-3"
                                    controlId="userName">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="papersalesman2"
                                        value={this.state.usernameVal}
                                        onChange={(e) =>
                                            this.updateUsername(e.target.value)
                                        }
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group
                                    className="mb-3"
                                    controlId="firstName">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={this.state.firstNameVal}
                                        placeholder="Jim"
                                        onChange={(e) =>
                                            this.updateFirstName(e.target.value)
                                        }
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group
                                    className="mb-3"
                                    controlId="lastName">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Halpert"
                                        value={this.state.lastNameVal}
                                        onChange={(e) =>
                                            this.updateLastName(e.target.value)
                                        }
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Group
                                    className="mb-3"
                                    controlId="loginPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        placeholder="Enter Password"
                                        type={"text"}
                                        value={this.state.passwordVal}
                                        onChange={(e) =>
                                            this.updatePassword(e.target.value)
                                        }
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group
                                    className="mb-3"
                                    controlId="confirmPassword">
                                    <Form.Label>Confirm</Form.Label>
                                    <Form.Control
                                        placeholder="Confirm Password"
                                        type={"text"}
                                        value={this.state.confirmPasswordVal}
                                        onChange={(e) =>
                                            this.updatePasswordConfirm(
                                                e.target.value
                                            )
                                        }
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Button
                            variant="outline-primary"
                            type="submit"
                            onClick={(e) => this.handleSubmit(e)}>
                            Create Account
                        </Button>
                    </LoginForm>

                    {this.state.activeError ? (
                        <ErrorMessage>{this.state.errorMessage}</ErrorMessage>
                    ) : null}
                </LoginContainer>
            </PageContainer>
        );
    }
}
