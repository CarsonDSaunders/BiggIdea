import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const EditorContainer = styled.div`
    border: 3px solid black;
    width: 50vw;
    margin-left: 500px;
`

export default class BoardPanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            candy: 3
        }
    }
    render() {
        return (
            <div>
                <h2 style={{marginLeft: "500px"}}>Board Editor</h2>
                <EditorContainer> 
                    <div>
                        <p>
                            <strong>Board Title:</strong> {"Homepage Board"}
                        </p>
                        <p>
                            <strong>Board ID:</strong> {this.props.boardId}
                        </p>
                        <p>
                            <strong>Creation Date:</strong> {"7/4/21"}
                        </p>
                    </div>
                    <Link to={`/boards/${this.props.boardId}/preview`}>
                        <p>Preview Board</p>
                    </Link>
                </EditorContainer>
            </div>
        );
    }
}
