import axios from 'axios';
import { React, useState, useEffect } from 'react';
import styled from 'styled-components';
import '../assets/styles/dashboard.css';

const AvatarPreview = styled.img`
    height: 8em;
    width: 8em;
    margin-left: 0.5em;
    border: 3px darkgray solid;
    border-radius: 50%;
`;

const AvatarBlock = styled.span`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
`;

const TextBlock = styled.span`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`;

const ChangeAvatarButton = styled.button`
    margin-top: 1em;
`;

export default function Manage(props) {
    const [email, setEmail] = useState();
    const [newAvatar, setNewAvatar] = useState();
    const [newPassword, setNewPassword] = useState();

    useEffect(() => {
        if (props.loading === true) {
            return;
        } else {
            setEmail(props.userData.email);
        }
    }, [props.loading, props.userData.email]);

    function handleSelectAvatarFile(e) {
        setNewAvatar(e.target.files[0]);
    }

    function handleUploadAvatarFile() {
        if (!newAvatar) {
            return;
        } else {
            let fileExt = newAvatar.name.split('.').pop();
            let date = Date.now();
            const fd = new FormData();
            fd.append(
                'image',
                newAvatar,
                `user_${props.userData.user_id}_${date}.${fileExt}`
            );
            axios
                .post(`/api/images/user/${props.userData.user_id}`, fd, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then((response) => {
                    if (response.status === 200) {
                        window.location.reload();
                    } else {
                        console.log('Unsuccessful');
                    }
                });
        }
    }

    function handleNewPasswordChange(val) {
        setNewPassword(val);
    }

    function updatePassword() {
        if (!newPassword) {
            return;
        } else {
            axios
                .put(`/api/password/${props.userData.user_id}`, {
                    password: newPassword,
                })
                .then((response) => {
                    window.location.reload();
                });
        }
    }

    return (
        <div>
            <div>
                <TextBlock>
                    <strong>Email: </strong>
                    <p style={{ marginLeft: '0.5em' }}>{email}</p>
                </TextBlock>

                <p>
                    <strong>New Password:</strong>
                    <input
                        style={{ marginLeft: '0.5em' }}
                        type='password'
                        onChange={(e) =>
                            handleNewPasswordChange(e.target.value)
                        }></input>
                </p>
                <button
                    className='standard-btn'
                    onClick={(e) => updatePassword(e)}>
                    Change Password
                </button>
                <hr />
                <AvatarBlock>
                    <strong>Avatar:</strong>
                    {props.loading ? (
                        <h2>A</h2>
                    ) : (
                        <AvatarPreview src={`${props.userData.avatar}`} />
                    )}
                </AvatarBlock>
                <div>
                    <input
                        type='file'
                        accept='image/png, image/jpeg'
                        onChange={(e) => handleSelectAvatarFile(e)}></input>
                </div>
                <ChangeAvatarButton
                    className='standard-btn'
                    onClick={() => handleUploadAvatarFile()}>
                    Change Avatar
                </ChangeAvatarButton>
            </div>
        </div>
    );
}
