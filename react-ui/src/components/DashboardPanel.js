import React from 'react';
import styled from 'styled-components';
import Manage from './Manage';
import Usage from './Usage';
import Editor from './Editor';
import Add from './Add';
import { Container } from 'react-bootstrap';

const EditorContainer = styled(Container)`
    border: 3px solid gray;
    border-radius: 2em;
    width: 50vw;
    margin-left: 500px;
    padding: 1em;
`;

const Panel = styled(Container)`
    height: 80vh;
    width: auto;
`;

const PanelTitle = styled.h2`
    margin: 0 0 0 500px;
    font-size: 3em;
    color: #2978a0;
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
                return <Add />;
            case 'board':
                return props.loading ? (
                    <h2>Loading Board</h2>
                ) : (
                    <Editor board={props.userBoards[props.activeBoard]} />
                );

            default:
                return 'Manage Account';
        }
    }

    return (
        <Panel>
            <PanelTitle style={{ marginLeft: '500px' }}>
                {renderPanelTitle()}
            </PanelTitle>
            <EditorContainer>{renderPanelContent()}</EditorContainer>
        </Panel>
    );
}
