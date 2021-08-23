import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Editor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            board: {},
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(field, value) {
        switch (field) {
            case 'boardName':
                this.setState({ boardName: value });
            default:
                return 'Default';
        }
    }

    async componentDidMount() {
        const loading = await this.props.loading;
        this.setState({ loading: loading });
    }

    componentDidUpdate() {
        if (this.state.loading === false) {
            console.log('y');
        } else {
        }
    }

    render() {
        return (
            <div>
                <span>
                    <strong>Board Name: </strong>
                    <input
                        value={
                            this.props.loading
                                ? 'Loading...'
                                : this.state.boardName
                        }
                        type='text'
                        onChange={(e) =>
                            this.handleInputChange('boardName', e.target.value)
                        }
                    />
                    <br />
                </span>
                <span>
                    <strong>Board ID: </strong>
                    <p>{`1`}</p>
                </span>
                <br />
                <span>
                    <strong>Creation Date: </strong>
                    <p>{`01/01/1970`}</p>
                </span>
                <br />
                <span>
                    <Link to={`/boards/${1}/preview`}>Preview Board</Link>
                </span>
                <br />
                <span></span>
            </div>
        );
    }
}
