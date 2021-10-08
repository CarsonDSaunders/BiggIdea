import { React, useState, useEffect } from "react";
import styled from "styled-components";
import { Image, Accordion } from "react-bootstrap";

const StyledSidebar = styled.div`
    float: left;
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100%;
    background-color: #253031;
    padding: 0 2em;
    box-sizing: border-box;
    margin: 0;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
        rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
        rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
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

const HeaderTitle = styled(Image)`
    display: inline-block;
    height: auto;
    margin-left: 0;
`;

export default function DashboardSidebar(props) {
    const [activeOption, setActiveOption] = useState("board");
    const [activeBoard, setActiveBoard] = useState(null);
    const [boardsList, setBoardsList] = useState([]);

    function handleButtonClick(option, board) {
        setActiveOption(option);
        if (option === "board") {
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
            if (props.userBoards === undefined) {
                return;
            } else {
                setBoardsList(props.userBoards);
            }
        }
    }, [props.loading, props.userBoards]);

    function checkBoardsList() {
        if (boardsList.length === 0) {
            return (
                <div>
                    <br />
                    <SidebarSubOption>Add A Board!</SidebarSubOption>
                </div>
            );
        } else {
            return props.loading
                ? null
                : boardsList.map((board, index) => {
                      return activeOption === "board" &&
                          activeBoard === index ? (
                          <ActiveSubOption
                              key={board.board_id}
                              onClick={(e) =>
                                  handleButtonClick("board", index)
                              }>
                              {board.board_name}
                              <br />
                          </ActiveSubOption>
                      ) : (
                          <SidebarSubOption
                              key={board.board_id}
                              onClick={(e) =>
                                  handleButtonClick("board", index)
                              }>
                              {board.board_name}
                              <br />
                          </SidebarSubOption>
                      );
                  });
        }
    }

    return (
        <StyledSidebar className="sidebar-container">
            <HeaderTitle src="https://biggidea.s3.us-west-1.amazonaws.com/Logo_Header_Flipped.png" />
            <div className="my-account-container">
                <AccountOptions className="options-container">
                    <br />
                    {activeOption === "manage" ? (
                        <ActiveOption
                            onClick={(e) => handleButtonClick("manage", null)}>
                            Account
                        </ActiveOption>
                    ) : (
                        <SidebarOption
                            onClick={(e) => handleButtonClick("manage", null)}>
                            Account
                        </SidebarOption>
                    )}
                    <br />
                    {activeOption === "add" ? (
                        <ActiveOption
                            onClick={(e) => handleButtonClick("add", null)}>
                            Add New Board
                        </ActiveOption>
                    ) : (
                        <SidebarOption
                            onClick={(e) => handleButtonClick("add", null)}>
                            Add New Board
                        </SidebarOption>
                    )}
                </AccountOptions>
            </div>
            <Divider />
            <div className="my-boards-container">
                <BoardOptions className="options-container">
                    <div>
                        <NonOption>Boards:</NonOption>
                        <br />
                        {checkBoardsList()}
                        <br />
                    </div>
                </BoardOptions>
            </div>
        </StyledSidebar>
    );
}
