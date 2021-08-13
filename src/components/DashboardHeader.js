import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from 'axios';

const Hamburger = styled.img`
    width: 3em;
    height: 3em;
    display: inline;
    cursor: pointer;
`;
const HeaderBar = styled.header`
    width: 100%;
    height: 10em;
    display: flex;
    justify-content: space-between;
`;

const HeaderTitle = styled.h1`
    display: inline-block;
`;

function logoutUser() {
    axios.get('/logout');
}

export default function DashboardHeader() {
    return (
        <div>
            <HeaderBar>
                <HeaderTitle>Bigg Idea</HeaderTitle>    
                    <Hamburger
                        class="hamburger"
                        onClick={(e) => logoutUser()}
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1024px-Hamburger_icon.svg.png"
                    ></Hamburger>
            </HeaderBar>
        </div>
    );
}
