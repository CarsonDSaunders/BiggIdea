import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Editor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            boardName: this.props.board['board_name'],
            twitterQueryText: this.props.board.queries[0]['query_text'],
            twitterQueryMode: this.props.board.queries[0]['capture_mode'],
            boardNameError: false,
            queryTextError: false,
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.board['board_id'] !== this.props.board['board_id']) {
            this.setState({
                boardName: this.props.board['board_name'],
                twitterQueryText: this.props.board.queries[0]['query_text'],
                twitterQueryMode: this.props.board.queries[0]['capture_mode'],
            });
        }
    }

    handleInputChange(field, value) {
        switch (field) {
            case 'boardName':
                this.setState({ boardName: value });
                break;
            case 'queryText':
                this.setState({ twitterQueryText: value });
                break;
            case 'mode':
                this.setState({ twitterQueryMode: value });
                break;
            default:
                return 'Default';
        }
    }

    handleClickButton() {
        if (this.state.boardName === '') {
            this.setState({ bordNameError: true });
            return;
        } else {
            this.setState({ bordNameError: false });
            if (this.state.twitterQueryText === '') {
                this.setState({ queryTextError: true });
                return;
            } else {
                this.setState({ queryTextError: false });
                let updatedBoard = { ...this.props.board };
                updatedBoard['board_name'] = this.state.boardName;
                updatedBoard.queries[0]['query_text'] =
                    this.state.twitterQueryText;
                updatedBoard.queries[0]['capture_mode'] =
                    this.state.twitterQueryMode;

                axios
                    .put(
                        `/api/boards/${updatedBoard['board_id']}`,
                        updatedBoard
                    )
                    .then((response) => {
                        window.location.reload();
                        return;
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
        }
    }

    render() {
        return (
            <div>
                <span>
                    <strong>Board Name: </strong>
                    <input
                        value={this.state.boardName}
                        type='text'
                        onChange={(e) =>
                            this.handleInputChange('boardName', e.target.value)
                        }
                    />
                    <br />
                </span>
                <span>
                    <strong>Board ID: </strong>
                    <p>{this.props.board['board_id']}</p>
                </span>
                <br />
                <span>
                    <strong>Creation Date: </strong>
                    <p>{this.props.board['creation_date']}</p>
                </span>
                <br />
                <span>
                    <Link
                        to={{
                            pathname: `/boards/${this.props.board['board_id']}/preview`,
                            state: { board: this.props.board },
                        }}>
                        Preview Board
                    </Link>
                </span>
                <br />
                <form>
                    <strong>Twitter: </strong>
                    <input
                        value={this.state.twitterQueryText}
                        type='text'
                        onChange={(e) =>
                            this.handleInputChange('queryText', e.target.value)
                        }
                    />
                    <div>
                        <input
                            type='radio'
                            id='hashtag'
                            name='mode'
                            value='hashtag'
                            checked={this.state.twitterQueryMode === 'hashtag'}
                            onChange={(e) =>
                                this.handleInputChange('mode', e.target.value)
                            }
                        />
                        <label htmlFor='hashtag'>Hashtag</label>
                        <br />
                        <input
                            type='radio'
                            id='account'
                            name='mode'
                            value='account'
                            checked={this.state.twitterQueryMode === 'account'}
                            onChange={(e) =>
                                this.handleInputChange('mode', e.target.value)
                            }
                        />
                        <label htmlFor='account'>Account</label>
                    </div>
                </form>
                <button onClick={() => this.handleClickButton()}>
                    Save Changes
                </button>
            </div>
        );
    }
}
