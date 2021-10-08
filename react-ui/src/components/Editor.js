import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

const Mode = styled(DropdownButton)`
    margin-right: 2em;
`;

const Preview = styled.span`
    margin-bottom: 2em;
`;

const SaveChanges = styled(Button)`
    background-color: #2978a0;
    border-color: #2978a0;

    &:hover {
        background-color: #216080;
        border-color: #216080;
    }
`;

export default function Editor(props) {
    const alert = useSelector((state) => state.alert.alert);
    const dispatch = useDispatch();

    const [boardName, setBoardName] = useState(props.board["board_name"]);
    const [twitterQueryText, setTwitterQueryText] = useState(
        props.board.queries[0]["query_text"]
    );
    const [twitterQueryMode, setTwitterQueryMode] = useState(
        props.board.queries[0]["capture_mode"]
    );
    const [boardNameError, setBoardNameError] = useState(false);
    const [queryTextError, setQueryTextError] = useState(false);

    useEffect(() => {
        setBoardName(props.board["board_name"]);
        setTwitterQueryText(props.board.queries[0]["query_text"]);
        setTwitterQueryMode(props.board.queries[0]["capture_mode"]);
    }, [props.board]);

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
                        "Unable to save changes: 'Board Name' field is empty!";
                } else if (alert[1] === "query") {
                    message =
                        "Unable to save changes: 'Query Text' field is empty!";
                } else {
                    message = "Unable to save changes: Unknown error!";
                }
                break;
            case "win":
                type = "success";
                message = "Changes saved successfully! Reloading...";
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

                let updatedBoard = { ...props.board };
                updatedBoard["board_name"] = boardName;
                updatedBoard.queries[0]["query_text"] = twitterQueryText;
                updatedBoard.queries[0]["capture_mode"] = twitterQueryMode;

                axios
                    .put(
                        `/api/boards/${updatedBoard["board_id"]}`,
                        updatedBoard
                    )
                    .then((response) => {
                        if (response.status === 200) {
                            handleAlerts(["win", "saved"]);

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

    function toDate(date) {
        let newDate = new Date(date);
        return newDate.toLocaleDateString();
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
                    <Col>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">
                                <strong>Board ID</strong>
                            </InputGroup.Text>
                            <FormControl
                                disabled
                                value={props.board["board_id"]}
                                aria-label="Board ID"
                                aria-describedby="basic-addon1"
                            />
                        </InputGroup>
                    </Col>

                    <Col>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">
                                <strong>Creation Date</strong>
                            </InputGroup.Text>
                            <FormControl
                                disabled
                                value={toDate(props.board["creation_date"])}
                                aria-label="Creation Date"
                                aria-describedby="basic-addon1"
                            />
                        </InputGroup>
                    </Col>
                    <Col />
                </Row>

                <Row>
                    <Preview>
                        <Link
                            to={{
                                pathname: `/boards/${props.board["board_id"]}/preview`,
                                state: { board: props.board },
                            }}>
                            Preview Board
                        </Link>
                    </Preview>
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
