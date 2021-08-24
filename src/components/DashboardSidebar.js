import { React, useState, useEffect } from 'react';
import styled from 'styled-components';

const AccountOptions = styled.div`
    width: 14em;
    height: 20vh;
    border: black solid 1px;
`;

const BoardOptions = styled.div`
    width: 14em;
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

const NonOption = styled(SidebarOption)`
    cursor: default;
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
    const [boardsList, setBoardsList] = useState([]);

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

    useEffect(() => {
        if (props.loading === true) {
            return;
        } else {
            setBoardsList(props.userBoards);
        }
    });

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
                            View Account Usage
                        </ActiveOption>
                    ) : (
                        <SidebarOption
                            onClick={(e) => handleButtonClick('usage', null)}>
                            View Account Usage
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
                            Add New Board
                        </ActiveOption>
                    ) : (
                        <SidebarOption
                            onClick={(e) => handleButtonClick('add', null)}>
                            Add New Board
                        </SidebarOption>
                    )}
                    <br />
                    <NonOption>Boards:</NonOption>
                    <br />
                    <span>
                        {props.loading
                            ? null
                            : boardsList.map((board, index) => {
                                  return activeOption === 'board' &&
                                      activeBoard === index ? (
                                      <ActiveSubOption
                                          key={board.board_id}
                                          onClick={(e) =>
                                              handleButtonClick('board', index)
                                          }>
                                          {board.board_name}
                                          <br />
                                      </ActiveSubOption>
                                  ) : (
                                      <SidebarSubOption
                                          key={board.board_id}
                                          onClick={(e) =>
                                              handleButtonClick('board', index)
                                          }>
                                          {board.board_name}
                                          <br />
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
