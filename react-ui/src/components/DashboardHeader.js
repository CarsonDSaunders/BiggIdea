import { React } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "../assets/font-awesome-4.7.0/css/font-awesome.min.css";
import { Dropdown } from "react-bootstrap";

const HeaderBar = styled.header`
    width: 98%;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    background: none;
`;

const UserName = styled.span`
    margin-left: 1em;
`;

const Avatar = styled.img`
    height: 3em;
    width: 3em;
    border-radius: 50%;
    border: 3px darkgray solid;
`;

const UserBlock = styled(Dropdown)`
    margin-top: 0.5em;
    border-radius: 2em;
`;

const UserToggle = styled(Dropdown.Toggle)`
    margin-top: 0.5em;
    border-radius: 2em;
`;

export default function DashboardHeader(props) {
    let history = useHistory();

    function logoutUser() {
        axios.get("/api/logout").then((response) => {
            if (response.status === 200) {
                setTimeout(() => {
                    history.push("/");
                }, 1000);
            } else {
                return;
            }
        });
    }

    return (
        <HeaderBar>
            <UserBlock>
                <UserToggle variant="secondary" id="dropdown-basic">
                    <span>
                        {props.loading ? (
                            <span>...</span>
                        ) : (
                            <Avatar
                                src={
                                    props.activeUser.avatar
                                        ? `${props.activeUser.avatar}`
                                        : "https://via.placeholder.com/150?text=BIGG"
                                }
                            />
                        )}
                        <UserName>
                            {props.loading
                                ? "Loading User"
                                : props.activeUser["first_name"]}
                        </UserName>
                    </span>
                </UserToggle>

                <Dropdown.Menu>
                    <Dropdown.Item as="button" onClick={() => logoutUser()}>
                        Log Out
                    </Dropdown.Item>
                </Dropdown.Menu>
            </UserBlock>
        </HeaderBar>
    );
}
