import React, { Component } from 'react';
import axios from 'axios';
import DashboardHeader from './DashboardHeader';
import DashboardSidebar from './DashboardSidebar';
import DashboardPanel from './DashboardPanel';
import '../assets/styles/dashboard.css';
import styled from 'styled-components';

const DashboardBody = styled.div`
    padding: 0 3em;
    height: 90%;
    width: 100%;
`;
export default class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activePanel: 'board',
            activeBoard: 1,
            data: {},
        };
        this.changePanelDisplay = this.changePanelDisplay.bind(this);
        this.changeBoard = this.changeBoard.bind(this);
    }

    changePanelDisplay(panel) {
        this.setState({ activePanel: panel });
    }

    changeBoard(board) {
        this.setState({ activeBoard: board });
    }

    async componentDidMount() {
        axios.get(`/api/user/`).then((response) => {
            console.log(response);
            this.setState({ data: response.data });
        });
    }

    render() {
        return (
            <div>
                <DashboardHeader />
                <DashboardBody>
                    <DashboardSidebar
                        changePanelDisplay={this.changePanelDisplay}
                        changeBoard={this.changeBoard}
                        userBoards={this.state.data.boards}
                    />
                    <DashboardPanel
                        activePanel={this.state.activePanel}
                        activeBoard={this.state.activeBoard}
                    />
                </DashboardBody>
            </div>
        );
    }
}
