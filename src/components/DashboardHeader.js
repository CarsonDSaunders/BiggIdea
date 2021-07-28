import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

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

export default function DashboardHeader() {
    return (
        <div>
            <HeaderBar>
                <HeaderTitle>Bigg Idea</HeaderTitle>
                <Link to="/">
                    <Hamburger
                        class="hamburger"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1024px-Hamburger_icon.svg.png"
                    ></Hamburger>
                </Link>
            </HeaderBar>
        </div>
    );
}
