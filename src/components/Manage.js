import axios from 'axios';
import { React, useState, useEffect } from 'react';
import styled from 'styled-components';

const AvatarPreview = styled.img`
    height: 8em;
    width: 8em;
`;

export default function Manage(props) {
    const [email, setEmail] = useState();
    const [newAvatar, setNewAvatar] = useState();

    useEffect(() => {
        if (props.loading === true) {
            return;
        } else {
            setEmail(props.userData.email);
        }
    });

    function handleSelectAvatarFile(e) {
        setNewAvatar(e.target.files[0]);
    }

    function handleUploadAvatarFile() {
        if (!newAvatar) {
            return;
        } else {
            let fileExt = newAvatar.name.split('.').pop();
            const fd = new FormData();
            fd.append(
                'image',
                newAvatar,
                `user_${props.userData.user_id}.${fileExt}`
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

    return (
        <div>
            <div>
                <p>
                    <strong>Email:</strong>
                    {email}
                </p>
                <p>
                    <strong>New Password:</strong>
                    <input type='password'></input>
                </p>
                <button>Change Password</button>
                <p>
                    <strong>Avatar:</strong>
                    {props.loading ? (
                        <h2>A</h2>
                    ) : (
                        <AvatarPreview src={`${props.userData.avatar}`} />
                    )}
                </p>
                <div>
                    <input
                        type='file'
                        accept='image/png, image/jpeg'
                        onChange={(e) => handleSelectAvatarFile(e)}></input>
                </div>
                <button onClick={() => handleUploadAvatarFile()}>
                    Change Avatar
                </button>
            </div>
        </div>
    );
}
