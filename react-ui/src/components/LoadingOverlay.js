import React from 'react';
import { Spinner } from 'react-bootstrap';
import styled from 'styled-components';

const Background = styled.div`
    height: 100vh;
    width: 100vw;
    opacity: 0.7;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    z-index: 1000;
`;

export default function LoadingOverlay() {
    return (
        <Background>
            <Spinner animation='border' role='status'>
                <span className='visually-hidden'>Loading...</span>
            </Spinner>
        </Background>
    );
}
