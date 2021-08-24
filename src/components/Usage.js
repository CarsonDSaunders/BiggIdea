import { React, useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

export default function Usage() {
    const [sessionsArr, setSessionsArr] = useState([]);
    const [loading, setLoading] = useState(true);

    function getSessions(data) {
        setSessionsArr(data);
    }

    useEffect(() => {
        if (loading === true) {
            axios.get('/api/sessions/').then((response) => {
                getSessions(response.data.reverse());
                setLoading(false);
            });
        }
    }, [loading]);

    return (
        <div>
            <p>
                <strong>Total Sessions: </strong>
                {sessionsArr.length}
            </p>
            <ul>
                {sessionsArr.map((ele, i) => {
                    if (i < 20) {
                        const date = new Date(ele['login_info']);
                        let formatted = date.toLocaleString();
                        return (
                            <li
                                key={
                                    ele['session_id']
                                }>{`${formatted} GMT`}</li>
                        );
                    }
                })}
            </ul>
        </div>
    );
}
