import { React, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
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

const HeaderTitle = styled.img`
    display: inline-block;
`;

const Avatar = styled.img`
    height: 3em;
    width: 3em;
    border-radius: 50%;
`;

export default function DashboardHeader(props) {
    let history = useHistory();
    let [avatarUrl, setAvatar] = useState(
        'https://biggidea.s3.us-west-1.amazonaws.com/Logo_No_Text.png'
    );

    function logoutUser() {
        axios.get('/logout').then((response) => {
            if (response.status === 200) {
                setTimeout(() => {
                    history.push('/');
                }, 1000);
            } else {
                return;
            }
        });
    }

    return (
        <div>
            <HeaderBar>
                <HeaderTitle src='https://biggidea.s3.us-west-1.amazonaws.com/Logo_Header.png' />
                <div>
                    <div>
                        {props.loading ? (
                            <h2>A</h2>
                        ) : (
                            <Avatar src={`${props.activeUser.avatar}`} />
                        )}
                        <h2>
                            {props.loading
                                ? 'Loading User'
                                : props.activeUser['first_name']}
                        </h2>
                    </div>
                    <Hamburger
                        className='hamburger'
                        onClick={(e) => logoutUser()}
                        src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1024px-Hamburger_icon.svg.png'
                    />
                </div>
            </HeaderBar>
        </div>
    );
}
