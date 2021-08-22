import { React, useState, useEffect } from 'react';
import styled from 'styled-components';

const AccountOptions = styled.div`
    width: 10em;
    height: 20vh;
    border: black solid 1px;
`;

const BoardOptions = styled.div`
    width: 10em;
    border: black solid 1px;
`;

const StyledSidebar = styled.div`
    float: left;
    display: flex;
    flex-direction: column;
    height: 100vh;
`;

const SidebarOption = styled.span`
    font-size: 1.3em;
    cursor: pointer;
`;

const ActiveOption = styled(SidebarOption)`
    font-weight: bold;
`;

const SidebarSubOption = styled.span`
    font-size: 1em;
    cursor: pointer;
`;
const ActiveSubOption = styled(SidebarSubOption)`
    font-weight: bold;
`;

export default function DashboardSidebar(props) {
    const [activeOption, setActiveOption] = useState('board');
    const [activeBoard, setActiveBoard] = useState(0);
    const [boardsList, setBoardsList] = useState();

    function handleButtonClick(option, board) {
        setActiveOption(option);
        if (option === 'board') {
            setActiveBoard(board);
            props.changePanelDisplay(option);
            props.changeBoard(board);
        } else {
            props.changePanelDisplay(option);
        }
    }

    async function useEffect() {
        boardsList = props.boards;
    }

    return (
        <StyledSidebar className='sidebar-container'>
            <div className='my-account-container'>
                <h3>My Account</h3>
                <AccountOptions className='options-container'>
                    <br />
                    {activeOption === 'manage' ? (
                        <ActiveOption
                            onClick={(e) => handleButtonClick('manage', null)}>
                            Manage Account
                        </ActiveOption>
                    ) : (
                        <SidebarOption
                            onClick={(e) => handleButtonClick('manage', null)}>
                            Manage Account
                        </SidebarOption>
                    )}

                    <br />
                    {activeOption === 'usage' ? (
                        <ActiveOption
                            onClick={(e) => handleButtonClick('usage', null)}>
                            View account usage
                        </ActiveOption>
                    ) : (
                        <SidebarOption
                            onClick={(e) => handleButtonClick('usage', null)}>
                            View account usage
                        </SidebarOption>
                    )}
                    <br />
                </AccountOptions>
            </div>
            <div className='my-boards-container'>
                <h3>My Bigg Boards</h3>
                <BoardOptions className='options-container'>
                    <br />
                    {activeOption === 'add' ? (
                        <ActiveOption
                            onClick={(e) => handleButtonClick('add', null)}>
                            Add new board
                        </ActiveOption>
                    ) : (
                        <SidebarOption
                            onClick={(e) => handleButtonClick('add', null)}>
                            Add new board
                        </SidebarOption>
                    )}
                    <br />
                    {activeOption === 'board' ? (
                        <ActiveOption
                            onClick={(e) => handleButtonClick('board', null)}>
                            View/edit boards
                        </ActiveOption>
                    ) : (
                        <SidebarOption
                            onClick={(e) => handleButtonClick('board', null)}>
                            View/edit boards
                        </SidebarOption>
                    )}
                    <br />
                    <span>
                        {boardsList.map((board, index) => {
                            activeOption === 'board' &&
                            activeBoard === index ? (
                                <ActiveSubOption
                                    key={board.board_id}
                                    onClick={(e) =>
                                        handleButtonClick('board', index)
                                    }>
                                    {board.board_name}
                                </ActiveSubOption>
                            ) : (
                                <SidebarSubOption
                                    key={board.board_id}
                                    onClick={(e) =>
                                        handleButtonClick('board', index)
                                    }>
                                    {board.board_name}
                                </SidebarSubOption>
                            );
                        })}
                    </span>
                    <br />
                </BoardOptions>
            </div>
        </StyledSidebar>
    );
}
