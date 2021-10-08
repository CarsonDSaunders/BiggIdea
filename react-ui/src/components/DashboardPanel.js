import React from "react";
import styled from "styled-components";
import Manage from "./Manage";

import Editor from "./Editor";
import Add from "./Add";
import { Container } from "react-bootstrap";

const PanelContainer = styled.div`
    height: 100%;
    width: 80%;
    padding: 1em 2em;
`;

const EditorContainer = styled.div`
    border: 3px solid gray;
    border-radius: 2em;
    padding: 1em;
`;

const PanelTitle = styled.h2`
    font-size: 3em;
    color: #2978a0;
`;

export default function DashboardPanel(props) {
    function renderPanelTitle() {
        switch (props.activePanel) {
            case "manage":
                return "Manage Account";
            case "usage":
                return "Account Usage";
            case "add":
                return "Add New Board";
            case "board":
                return "Board Editor";
            default:
                return "Manage Account";
        }
    }

    function renderPanelContent() {
        switch (props.activePanel) {
            case "manage":
                return (
                    <Manage
                        userData={props.activeUser}
                        loading={props.loading}
                    />
                );
            case "add":
                return <Add />;
            case "board":
                return props.loading ? (
                    <h2>Loading Board</h2>
                ) : (
                    <Editor board={props.userBoards[props.activeBoard]} />
                );

            default:
                return "Manage Account";
        }
    }

    return (
        <PanelContainer>
            <PanelTitle>{renderPanelTitle()}</PanelTitle>
            <EditorContainer>{renderPanelContent()}</EditorContainer>
        </PanelContainer>
    );
}
