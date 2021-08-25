import { React, useState, useEffect } from 'react';
import styled from 'styled-components';

const StyledSidebar = styled.div`
    float: left;
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 15em;
    background-color: #253031;
    padding: 0 2em;
    box-sizing: border-box;
    margin: 0;
`;

const AccountOptions = styled.div`
    width: 14em;
    height: 10%;
    display: flex;
    flex-direction: column;
    justify-content: baseline;
    align-items: flex-start;
    margin-bottom: 1em;
`;

const BoardOptions = styled.div`
    width: 14em;
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: baseline;
    align-items: flex-start;
    margin-bottom: 1em;
`;

const SidebarOption = styled.span`
    font-size: 1.3em;
    cursor: pointer;
    color: lightgray;
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
    color: lightgray;
    margin-right: 1em;
`;
const ActiveSubOption = styled(SidebarSubOption)`
    font-weight: bold;
`;

const BoxTitle = styled.h3`
    color: #2978a0;
`;

const Divider = styled.hr`
    width: 90%;
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
    }, [props.loading, props.userBoards]);

    return (
        <StyledSidebar className='sidebar-container'>
            <div className='my-account-container'>
                <BoxTitle>My Account</BoxTitle>
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
            <Divider />
            <div className='my-boards-container'>
                <BoxTitle>My Bigg Boards</BoxTitle>
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
                    <div>
                        <NonOption>Boards:</NonOption>
                        <br />
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
                    </div>
                </BoardOptions>
            </div>
        </StyledSidebar>
    );
}
