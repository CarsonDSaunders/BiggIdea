import React, { Component } from 'react'
import DashboardHeader from './DashboardHeader';
import DashboardSidebar from './DashboardSidebar';
import BoardPanel from './BoardPanel';
import '../assets/styles/dashboard.css';
import styled from 'styled-components';

const DashboardBody = styled.div`
    padding: 0 3em;
    height: 90%;
    width: 100%;
`
export default class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activePanel: "board",
            activeBoard: 1
        }
    };
    render() {
        return (
            <div>
                <DashboardHeader />
                <DashboardBody>
                    <DashboardSidebar />
                    {(this.state.activePanel === "board") ? <BoardPanel boardId={this.state.activeBoard} /> : <DashboardSidebar />  }
                </DashboardBody>
            </div>
        )
    }
}

// const mapStateToProps = (state) => ({
    
// })

// const mapDispatchToProps = {
    
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
