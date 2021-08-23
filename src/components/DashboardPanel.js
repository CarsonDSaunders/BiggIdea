import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Manage from './Manage';
import Usage from './Usage';
import Editor from './Editor';

const EditorContainer = styled.div`
    border: 3px solid black;
    width: 50vw;
    margin-left: 500px;
`;

const Panel = styled.div`
    height: 80vh;
    width: auto;
`;

export default function DashboardPanel(props) {
    function renderPanelTitle() {
        switch (props.activePanel) {
            case 'manage':
                return 'Manage Account';
            case 'usage':
                return 'Account Usage';
            case 'add':
                return 'Add New Board';
            case 'board':
                return 'Board Editor';
            default:
                return 'Manage Account';
                break;
        }
    }

    function renderPanelContent() {
        switch (props.activePanel) {
            case 'manage':
                return (
                    <Manage
                        userData={props.activeUser}
                        loading={props.loading}
                    />
                );
            case 'usage':
                return <Usage userData={props.activeUser} />;
            case 'add':
                return 'Add';
            case 'board':
                return (
                    <Editor
                        userBoards={props.userBoards}
                        userData={props.activeUser}
                        activeBoard={props.activeBoard}
                        loading={props.loading}
                    />
                );
            default:
                return 'Manage Account';
                break;
        }
    }

    return (
        <Panel>
            <h2 style={{ marginLeft: '500px' }}>{renderPanelTitle()}</h2>
            <EditorContainer>{renderPanelContent()}</EditorContainer>
        </Panel>
    );
}
