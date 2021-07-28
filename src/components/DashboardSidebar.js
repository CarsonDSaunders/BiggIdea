import React from "react";
import styled from 'styled-components'


const Options = styled.div`
    width: 10em;
    height: auto;
    border: black solid 1px;    
`


const StyledSidebar = styled.div`
    float: left;
    display: flex;
    flex-direction: column;
    height: auto;
`

export default function DashboardSidebar() {
    return (
        <StyledSidebar class="sidebar-container">
            <div class="my-account-container">
                <h3>My Account</h3>
                <Options class="options-container">
                    <p>Change password</p>
                    <p>View account usage</p>
                </Options>
            </div>
            <div class="my-boards-container">
                <h3>My Bigg Boards</h3>
                <Options class="options-container">
                    <p>Add new board</p>
                    <p>View/edit boards</p>
                    <span>
                        <p>Bigg Board 1</p>
                        <p>Test Board</p>
                        <p>Homepage Board</p>
                    </span>
                </Options>
            </div>
        </StyledSidebar>
    );
}
