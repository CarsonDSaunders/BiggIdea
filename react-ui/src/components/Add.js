import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import {
    Form,
    Row,
    Col,
    Button,
    InputGroup,
    FormControl,
    DropdownButton,
    Dropdown,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
    displayAlert,
    hideAlert,
    changeAlertType,
    changeAlertMessage,
} from "../redux/alertSlice";

const BoardName = styled.span`
    margin-bottom: 1em;
`;

const Mode = styled(DropdownButton)`
    margin-right: 2em;
`;

const SaveChanges = styled(Button)`
    background-color: #2978a0;
    border-color: #2978a0;

    &:hover {
        background-color: #216080;
        border-color: #216080;
    }
`;

export default function Add(props) {
    const dispatch = useDispatch();
    const [boardName, setBoardName] = useState("");
    const [twitterQueryText, setTwitterQueryText] = useState("");
    const [twitterQueryMode, setTwitterQueryMode] = useState("hashtag");
    const [boardNameError, setBoardNameError] = useState(false);
    const [queryTextError, setQueryTextError] = useState(false);

    function handleInputChange(field, value) {
        switch (field) {
            case "boardName":
                setBoardName(value);
                break;
            case "queryText":
                setTwitterQueryText(value);
                break;
            case "mode":
                setTwitterQueryMode(value);
                break;
            default:
                return "Default";
        }
    }

    function handleAlerts(alert) {
        let message = "";
        let type = "";
        switch (alert[0]) {
            case "error":
                type = "danger";
                if (alert[1] === "name") {
                    message =
                        "Unable to add board: 'Board Name' field is empty!";
                } else if (alert[1] === "query") {
                    message =
                        "Unable to add board: 'Query Text' field is empty!";
                } else {
                    message = "Unable to add board: Unknown error!";
                }
                break;
            case "win":
                type = "success";
                message = "Board added! Reloading...";
                break;
            default:
                type = "warning";
                message = "Unable to find error. Sorry!";
                break;
        }
        dispatch(displayAlert());
        dispatch(changeAlertType(type));
        dispatch(changeAlertMessage(message));
        setTimeout(() => {
            dispatch(hideAlert());
        }, 3000);
    }

    function handleClickButton() {
        if (boardName === "") {
            handleAlerts(["error", "name"]);
            setBoardNameError(true);
            return;
        } else {
            setBoardNameError(false);
            if (twitterQueryText === "") {
                handleAlerts(["error", "query"]);
                setQueryTextError(true);
                return;
            } else {
                setQueryTextError(false);
                let payload = {
                    board_name: this.state.boardName,
                    platform_id: 0,
                    query_text: this.state.twitterQueryText,
                    capture_mode: this.state.twitterQueryMode,
                };
                axios
                    .post(`/api/boards/`, payload)
                    .then((response) => {
                        if (response.status === 200) {
                            handleAlerts(["win", "added"]);

                            setTimeout(() => {
                                window.location.reload();
                            }, 3500);
                        }

                        return;
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
        }
    }

    function capitalizeQueryMode() {
        let word = [...twitterQueryMode];
        word[0] = word[0].toUpperCase();
        return word.join("");
    }

    return (
        <div>
            <Form>
                <Row>
                    <Col>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">
                                <strong>Board Name</strong>
                            </InputGroup.Text>
                            <FormControl
                                value={boardName}
                                onChange={(e) =>
                                    handleInputChange(
                                        "boardName",
                                        e.target.value
                                    )
                                }
                                aria-label="Board Name"
                                aria-describedby="basic-addon1"
                            />
                        </InputGroup>
                    </Col>
                </Row>

                <Row>
                    <InputGroup className="mb-3">
                        <Col md="auto">
                            <Mode
                                variant="outline-secondary"
                                title={capitalizeQueryMode()}
                                id="input-group-dropdown-1">
                                <Dropdown.Item
                                    as="button"
                                    onClick={(e) =>
                                        handleInputChange("mode", "hashtag")
                                    }>
                                    Hashtag
                                </Dropdown.Item>
                                <Dropdown.Item
                                    as="button"
                                    onClick={(e) =>
                                        handleInputChange("mode", "account")
                                    }>
                                    Account
                                </Dropdown.Item>
                            </Mode>
                        </Col>
                        <Col md={6}>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1">
                                    {twitterQueryMode === "hashtag" ? "#" : "@"}
                                </InputGroup.Text>
                                <FormControl
                                    placeholder="Query Text"
                                    aria-label="Hashtag"
                                    aria-describedby="basic-addon1"
                                    value={twitterQueryText}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "queryText",
                                            e.target.value
                                        )
                                    }
                                />
                            </InputGroup>
                        </Col>
                        <Col />
                        <Col />
                    </InputGroup>
                </Row>

                <SaveChanges onClick={() => handleClickButton()}>
                    Save Changes
                </SaveChanges>
            </Form>
        </div>
    );
}
