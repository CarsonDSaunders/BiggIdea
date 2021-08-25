import { React } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import '../assets/font-awesome-4.7.0/css/font-awesome.min.css';

const HeaderBar = styled.header`
    width: 100%;
    height: 5em;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid lightgray;
    background-color: #253031;
`;

const HeaderTitle = styled.img`
    display: inline-block;
    height: 100%;
    margin-left: 2em;
`;

const TopRight = styled.div`
    height: 100%;
    width: 15%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const User = styled(TopRight)`
    width: 10em;
    height: 80%;
    background-color: #d4cec4;
    border-radius: 1em;
    padding: 0 1em;
`;

const Avatar = styled.img`
    height: 3em;
    width: 3em;
    border-radius: 50%;
    border: 3px darkgray solid;
`;

const LogOut = styled.i`
    cursor: pointer;
    margin-right: 20px;
`;
export default function DashboardHeader(props) {
    let history = useHistory();

    function logoutUser() {
        axios.get('/api/logout').then((response) => {
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
        <HeaderBar>
            <HeaderTitle src='https://biggidea.s3.us-west-1.amazonaws.com/Logo_Header.png' />
            <TopRight>
                <User>
                    {props.loading ? (
                        <h2>...</h2>
                    ) : (
                        <Avatar
                            src={
                                props.activeUser.avatar
                                    ? `${props.activeUser.avatar}`
                                    : 'https://via.placeholder.com/150?text=BIGG'
                            }
                        />
                    )}
                    <h2>
                        {props.loading
                            ? 'Loading User'
                            : props.activeUser['first_name']}
                    </h2>
                </User>
                <span>
                    <LogOut
                        className='fa fa-sign-out fa-3x'
                        aria-hidden='true'
                        onClick={(e) => logoutUser()}
                    />
                </span>
            </TopRight>
        </HeaderBar>
    );
}
