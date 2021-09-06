import React, { Component } from 'react';
import BoardItem from './BoardItem';
import axios from 'axios';
import styled from 'styled-components';
import { Modal, Button } from 'react-bootstrap';

const BoardContainer = styled.div`
    height: auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    padding: 2em;
    border: 3px solid lightgray;
    border-radius: 1em;
`;

const BoardPage = styled.div`
    height: auto;
    padding: 2em;
    background-color: #ffffff;
`;

const BoardName = styled.h1`
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    text-align: center;
`;

export default class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            boardName: '',
            content: [],
            media: [],
            loading: true,
            modalOpen: false,
        };

        this.passMedia = this.passMedia.bind(this);
        this.expandTweet = this.expandTweet.bind(this);
        this.checkLoading = this.checkLoading.bind(this);
    }

    async componentDidMount() {
        let boardId = this.props.match.params.id;
        axios.get(`/api/boards/${boardId}`).then((response) => {
            let { board_name, capture_mode, query_text } = response.data[0];
            axios
                .get(`/api/social/twitter/${query_text}`, {
                    params: { type: capture_mode },
                })
                .then((response) => {
                    if (response.data.includes.media) {
                        this.setState({
                            media: response.data.includes.media,
                        });
                    }
                    this.setState({
                        content: response.data.data,
                        boardName: board_name,
                        loading: false,
                    });
                })

                .catch((error) => {
                    console.error(error);
                });
        });
    }

    passMedia(mediaKey) {
        let media = this.state.media.find((ele) => ele.media_key === mediaKey);
        return media;
    }

    expandTweet(tweet) {
        let url = `https://twitter.com/${tweet.author_id}/status/${tweet.id}`;
        axios.post('/api/embed/', { url: url }).then((response) => {
            console.log(response.data);
        });
    }

    handleOpenModal() {
        this.setState({ modalOpen: true });
    }

    handleCloseModal() {
        this.setState({ modalOpen: false });
    }

    checkLoading() {
        if (this.state.content.length > 0) {
            return true;
        } else {
            return false;
        }
    }

    render() {
        return (
            <BoardPage className='board-page'>
                <BoardName>{this.state.boardName}</BoardName>

                <Modal show={this.state.modalOpen} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Woohoo, you're reading this text in a modal!
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant='primary' onClick={handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>

                <BoardContainer>
                    {this.state.loading ? (
                        <h2>Loading Board...</h2>
                    ) : (
                        this.state.content.map((ele, i) => {
                            if (ele.possibly_sensitive === false) {
                                return (
                                    <BoardItem
                                        expandTweet={this.expandTweet}
                                        key={ele.id}
                                        post={ele}
                                        arrId={i}
                                        media={
                                            ele.attachments
                                                ? this.passMedia(
                                                      ele.attachments
                                                          .media_keys[0]
                                                  )
                                                : null
                                        }
                                    />
                                );
                            }
                        })
                    )}
                </BoardContainer>
            </BoardPage>
        );
    }
}
