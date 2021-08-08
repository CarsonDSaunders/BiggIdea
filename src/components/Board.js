import React, { Component } from "react";
import BoardItem from "./BoardItem";
import axios from "axios";
import styled from "styled-components";

const BoardContainer = styled.div`
    height: auto;
    width: 90%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
`;
export default class Board extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: [],
        };

        this.getContent = this.getContent.bind(this);
    }

    getContent() {
        let term = "TakeNote";
        axios
            .get(`http://localhost:8000/api/social/twitter/${term}`, {
                params: { type: "hashtag" },
            })
            .then((response) => {
                console.log(response.data)
                this.setState({ content: response.data });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        return (
            <div>
                <button onClick={this.getContent}>Load</button>
                <BoardContainer>
                    {this.state.content.map((ele, i) => {
                        if (ele.lang !== 'en') {
                            return
                        } else {
                            return <BoardItem key={i} post={ele} />;
                        }
                        
                    })}
                </BoardContainer>
            </div>
        );
    }
}
