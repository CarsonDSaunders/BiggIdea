import React, { Component } from 'react';
import BoardItem from './BoardItem';
import axios from 'axios';
import styled from 'styled-components';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

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
        };

        this.passMedia = this.passMedia.bind(this);
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.expandTweet = this.expandTweet.bind(this);
    }

    openModal() {
        this.setState({ modalOpen: true });
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
    }

    closeModal() {
        this.setState({ modalOpen: true });
    }

    async componentDidMount() {
        let boardId = this.props.match.params.id;
        axios.get(`/api/boards/${boardId}`).then((response) => {
            console.log(response);
            let { board_name, capture_mode, query_text } = response.data[0];
            axios
                .get(`http://localhost:8000/api/social/twitter/${query_text}`, {
                    params: { type: capture_mode },
                })
                .then((response) => {
                    this.setState({
                        content: response.data.data,
                        boardName: board_name,
                    });
                    if (response.data.includes.media) {
                        this.setState({
                            media: response.data.includes.media,
                        });
                    }
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
        this.openModal();
        console.log(tweet);
        let tweetUrl = `https://twitter.com/${tweet.author_id}/status/${tweet.id}`;
        axios
            .get('/api/social/twitter/embed', { url: tweetUrl })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.error(error);
            });
        return;
    }

    render() {
        return (
            <BoardPage className='board-page'>
                <Modal
                    isOpen={this.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel='Tweet'>
                    <button onClick={this.closeModal}>close</button>
                    <div>I am a modal</div>
                    <form>
                        <input />
                        <button>tab navigation</button>
                        <button>stays</button>
                        <button>inside</button>
                        <button>the modal</button>
                    </form>
                </Modal>
                <BoardName>{this.state.boardName}</BoardName>
                <BoardContainer>
                    {this.state.content.map((ele, i) => {
                        if (ele.possibly_sensitive === false) {
                            return (
                                <BoardItem
                                    key={i}
                                    post={ele}
                                    arrId={i}
                                    media={
                                        ele.attachments
                                            ? this.passMedia(
                                                  ele.attachments.media_keys[0]
                                              )
                                            : null
                                    }
                                    expandTweet={this.expandTweet}
                                />
                            );
                        }
                    })}
                </BoardContainer>
            </BoardPage>
        );
    }
}
