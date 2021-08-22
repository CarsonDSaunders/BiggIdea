import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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

    return (
        <Panel>
            <h2 style={{ marginLeft: '500px' }}>{renderPanelTitle()}</h2>
            {
                <EditorContainer>
                    <div>
                        <p>
                            <strong>Board Title:</strong> {'Homepage Board'}
                        </p>
                        <p>
                            <strong>Board ID:</strong> {props.boardId}
                        </p>
                        <p>
                            <strong>Creation Date:</strong> {'7/4/21'}
                        </p>
                    </div>
                    <Link to={`/boards/${props.boardId}/preview`}>
                        <p>Preview Board</p>
                    </Link>
                </EditorContainer>
            }
        </Panel>
    );
}
