import React, { Component } from "react";
import BoardItem from "./BoardItem";
import axios from "axios";
import styled from "styled-components";

const BoardContainer = styled.div`
    height: auto;
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
            media: [],
            term: "",
            type: "hashtag",
        };

        this.getContent = this.getContent.bind(this);
        this.updateInput = this.updateInput.bind(this);
        this.changeType = this.changeType.bind(this);
    }

    updateInput(val) {
        this.setState({ term: val });
    }

    changeType(val) {
        if (val === "hashtag") {
            this.setState({ type: "hashtag" });
        } else {
            this.setState({ type: "user" });
        }
    }

    getContent(e) {
        e.preventDefault();
        let term = this.state.term;
        if (term === "") {
            return;
        } else {
            axios
                .get(`http://localhost:8000/api/social/twitter/${term}`, {
                    params: { type: "hashtag" },
                })
                .then((response) => {
                    console.log(response);
                    this.setState({ content: response.data.data, media: response.data.includes.media });
                })
                
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    render() {
        return (
            <div>
                <form>
                    <input
                        type="text"
                        placeholder="Search Term"
                        onChange={(e) => this.updateInput(e.target.value)}
                        value={this.state.input}
                    />
                    <input
                        id="hashtag"
                        type="radio"
                        checked={this.state.type === 'hashtag' ? true : false}
                        value="hashtag"
                        onClick={(e) => this.changeType(e.target.id)}
                    />
                    <label>Hashtag</label>
                    <input
                        id="user"
                        type="radio"
                        value="user"
                        checked={this.state.type === 'user' ? true : false}
                        onClick={(e) => this.changeType(e.target.id)}
                    />
                    <label>User</label>
                    <button onClick={(e) => this.getContent(e)}>Load</button>
                </form>

                <BoardContainer>
                    {this.state.content.map((ele, i) => {
                        if (ele.lang === "en") {
                            if (ele.possibly_sensitive === false) {
                                if (i < 15) {
                                    return (
                                        <BoardItem
                                            key={i}
                                            post={ele}
                                            arrId={i}
                                            media={this.state.media}
                                        />
                                    );
                                }
                            }
                        }
                    })}
                </BoardContainer>
            </div>
        );
    }
}
