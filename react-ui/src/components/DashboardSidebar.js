import { React, useState, useEffect } from "react";
import styled from "styled-components";
import { Image, Accordion, ListGroup } from "react-bootstrap";

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

const SidebarOptions = styled(ListGroup)`
    width: auto;
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

const SidebarOption = styled(ListGroup.Item)`
    font-size: 1.1em;
    cursor: pointer;
    color: lightgray;
    background: none;
    border: none;

    &:hover {
        background: none;
        color: #2978a0;
    }

    &:active {
        color: #2978a0;
        font-weight: bold;
        background: none;
    }
`;

const SidebarBoards = styled(ListGroup)``;

const HeaderTitle = styled(Image)`
    display: inline-block;
    height: auto;
    margin-left: 0;
`;

export default function DashboardSidebar(props) {
    const [activeOption, setActiveOption] = useState("board");
    const [activeBoard, setActiveBoard] = useState(null);
    const [boardsList, setBoardsList] = useState([]);

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

    function checkBoardsList() {
        if (boardsList.length === 0) {
            return (
                <div>
                    <br />
                </div>
            );
        } else {
            return props.loading ? null : boardsList;
        }
    }

    return (
        <StyledSidebar className="sidebar-container">
            <HeaderTitle src="https://biggidea.s3.us-west-1.amazonaws.com/Logo_Header_Flipped.png" />
            <SidebarOptions flush>
                <SidebarOption
                    action
                    onClick={(e) => handleButtonClick("manage", null)}>
                    Account
                </SidebarOption>
                <SidebarOption
                    action
                    onClick={(e) => handleButtonClick("add", null)}>
                    Add
                </SidebarOption>
                <SidebarOption
                    action
                    onClick={(e) => handleButtonClick("add", null)}>
                    Boards
                </SidebarOption>
            </SidebarOptions>

            <SidebarBoards></SidebarBoards>
        </StyledSidebar>
    );
}
