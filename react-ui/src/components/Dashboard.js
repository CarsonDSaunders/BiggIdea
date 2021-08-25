import React, { Component } from 'react';
import axios from 'axios';
import DashboardHeader from './DashboardHeader';
import DashboardSidebar from './DashboardSidebar';
import DashboardPanel from './DashboardPanel';
import '../assets/styles/dashboard.css';
import styled from 'styled-components';

const DashboardBody = styled.div`
    margin: 0;
    height: 90%;
    width: 100%;
`;
export default class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activePanel: 'board',
            activeBoard: 0,
            data: {},
            loading: true,
        };
        this.changePanelDisplay = this.changePanelDisplay.bind(this);
        this.changeBoard = this.changeBoard.bind(this);
    }

    async componentDidMount() {
        axios.get(`/api/user/`).then((response) => {
            this.setState({ data: response.data, loading: false });
        });
    }

    changePanelDisplay(panel) {
        this.setState({ activePanel: panel });
    }

    changeBoard(board) {
        this.setState({ activeBoard: board });
    }

    render() {
        return (
            <div>
                <DashboardHeader
                    activeUser={this.state.data.user}
                    loading={this.state.loading}
                />
                <DashboardBody>
                    <DashboardSidebar
                        changePanelDisplay={this.changePanelDisplay}
                        changeBoard={this.changeBoard}
                        userBoards={this.state.data.boards}
                        loading={this.state.loading}
                    />
                    <DashboardPanel
                        activeUser={this.state.data.user}
                        userBoards={this.state.data.boards}
                        activePanel={this.state.activePanel}
                        activeBoard={this.state.activeBoard}
                        loading={this.state.loading}
                    />
                </DashboardBody>
            </div>
        );
    }
}
