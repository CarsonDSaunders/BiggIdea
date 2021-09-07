import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import {
    Form,
    Button,
    InputGroup,
    FormControl,
    DropdownButton,
    Dropdown,
} from 'react-bootstrap';

const SpanStuff = styled.span`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`;

const FieldItem = styled.p`
    margin-left: 1em;
`;

const Preview = styled.span`
    margin-bottom: 2em;
`;
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
        this.toDate = this.toDate.bind(this);
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

    toDate(date) {
        let newDate = new Date(date);
        return newDate.toLocaleDateString();
    }

    render() {
        return (
            <div>
                <>
                    <InputGroup className='mb-3'>
                        <InputGroup.Text id='basic-addon1'>@</InputGroup.Text>
                        <FormControl
                            placeholder='Username'
                            aria-label='Username'
                            aria-describedby='basic-addon1'
                        />
                    </InputGroup>
                </>
                <span>
                    <strong>Board Name: </strong>
                    <input
                        value={this.state.boardName}
                        type='text'
                        onChange={(e) =>
                            this.handleInputChange('boardName', e.target.value)
                        }
                    />
                </span>
                <SpanStuff>
                    <strong>Board ID: </strong>
                    <FieldItem>{this.props.board['board_id']}</FieldItem>
                </SpanStuff>
                <SpanStuff>
                    <strong>Creation Date: </strong>
                    <FieldItem>
                        {this.toDate(this.props.board['creation_date'])}
                    </FieldItem>
                </SpanStuff>
                <Preview>
                    <Link
                        to={{
                            pathname: `/boards/${this.props.board['board_id']}/preview`,
                            state: { board: this.props.board },
                        }}>
                        Preview Board
                    </Link>
                </Preview>
                <br />
                <br />
                <InputGroup className='mb-3'>
                    <DropdownButton
                        variant='outline-secondary'
                        title='Dropdown'
                        id='input-group-dropdown-1'>
                        <Dropdown.Item>Action</Dropdown.Item>
                        <Dropdown.Item>Another action</Dropdown.Item>
                        <Dropdown.Item>Something else here</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item href='#'>Separated link</Dropdown.Item>
                    </DropdownButton>
                    {this.state.twitterQueryMode === 'hashtag' ? (
                        <span>
                            <InputGroup.Text id='basic-addon2'>
                                #
                            </InputGroup.Text>
                            <FormControl
                                placeholder='Hashtag'
                                aria-label='Hashtag'
                                aria-describedby='basic-addon2'
                            />
                        </span>
                    ) : (
                        <InputGroup className='mb-3'>
                            <InputGroup.Text id='basic-addon1'>
                                @
                            </InputGroup.Text>
                            <FormControl
                                placeholder='Username'
                                aria-label='Username'
                                aria-describedby='basic-addon1'
                            />
                        </InputGroup>
                    )}
                </InputGroup>

                <form>
                    <strong>Twitter: </strong>
                    <input
                        value={this.state.twitterQueryText}
                        type='text'
                        onChange={(e) =>
                            this.handleInputChange('queryText', e.target.value)
                        }
                    />

                    <div style={{ marginTop: '1em' }}>
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
                <button
                    className='standard-btn'
                    onClick={() => this.handleClickButton()}>
                    Save Changes
                </button>
            </div>
        );
    }
}
