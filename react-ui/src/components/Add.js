import React, { Component } from 'react';
import axios from 'axios';

export default class Editor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            boardName: '',
            twitterQueryText: '',
            twitterQueryMode: 'hashtag',
            boardNameError: false,
            queryTextError: false,
        };

        this.handleInputChange = this.handleInputChange.bind(this);
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
                let payload = {
                    board_name: this.state.boardName,
                    platform_id: 0,
                    query_text: this.state.twitterQueryText,
                    capture_mode: this.state.twitterQueryMode,
                };
                axios.post(`/api/boards/`, payload).then((response) => {
                    if (response.status === 200) {
                        window.location.reload();
                    } else {
                        console.log('Unsuccessful');
                    }
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
                    Add Board
                </button>
            </div>
        );
    }
}
