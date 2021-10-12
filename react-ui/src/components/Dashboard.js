import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";
import DashboardPanel from "./DashboardPanel";
import "../assets/styles/dashboard.css";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Alert } from "react-bootstrap";

const PageContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-columns: 1fr 5fr;
    grid-template-rows: 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
`;

const DashboardBody = styled.div`
    height: 100vh;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 10fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
`;

const AlertContainer = styled.div`
    position: absolute;
    z-index: 10;
    width: 100vw;
    display: flex;
    justify-content: center;
    margin-top: 1em;
    transition: all 0.5s;
`;

export default function Dashboard(props) {
    const alert = useSelector((state) => state.alert.alert);
    const type = useSelector((state) => state.alert.type);
    const message = useSelector((state) => state.alert.message);
    const [activePanel, setActivePanel] = useState("add");
    const [activeBoard, setActiveBoard] = useState(null);
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            axios.get(`/api/user/`).then((response) => {
                setData(response.data);
                setLoading(false);
            });
        };

        fetchData();
    }, []);

    function changePanelDisplay(panel) {
        setActivePanel(panel);
    }

    function changeBoard(board) {
        setActiveBoard(board);
    }

    return (
        <PageContainer>
            <AlertContainer>
                <Alert show={alert} variant={type}>
                    {message}
                </Alert>
            </AlertContainer>
            <DashboardSidebar
                changePanelDisplay={changePanelDisplay}
                changeBoard={changeBoard}
                userBoards={data.boards}
                loading={loading}
            />
            <DashboardBody>
                <DashboardHeader
                    activeUser={data.user}
                    activePanel={activePanel}
                    loading={loading}
                />

                <DashboardPanel
                    activeUser={data.user}
                    userBoards={data.boards}
                    activePanel={activePanel}
                    activeBoard={activeBoard}
                    loading={loading}
                />
            </DashboardBody>
        </PageContainer>
    );
}
