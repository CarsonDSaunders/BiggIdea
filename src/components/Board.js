import React, { Component } from 'react';
import BoardItem from './BoardItem';
import axios from 'axios';
import styled from 'styled-components';

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
            media: [],
        };
    }

    async componentDidMount() {
        axios
            .get(`http://localhost:8000/api/social/twitter/${1}`, {
                params: { type: 'hashtag' },
            })
            .then((response) => {
                console.log(response);
                this.setState({ media: response.data.media });
            })

            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        return (
            <div>
                <BoardContainer>
                    {/* {this.state.content.map((ele, i) => {
                        if (ele.lang === 'en') {
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
                    })} */}
                </BoardContainer>
            </div>
        );
    }
}
