import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

import UserContext from '../shared/UserContext';

import { BACKEND_URL } from '../shared/backendUrl';

function Dashboard () {

    const navigate = useNavigate();
    const { token, username } = useContext(UserContext);

    const [list, setList] = useState([]);
    const [loading, setLoading] = useState('loading');
    const [error, setError] = useState('');

    useEffect(() => {
        if (!token) {
            navigate('/');
        }
        
        axios.get(`${BACKEND_URL}/movements`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => {
                setList([...res.data]);
                setLoading('');
            })
            .catch(err => {
                setError(err.response.data);
                setLoading('');
            });
    }, []);

    return (
        <Container>
            <Header>
                <div>{`Olá, ${username}`}</div>
                <ion-icon name='exit-outline'></ion-icon>
            </Header>
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const Header = styled.div`
    width: 100%;
    height: 48px;
    margin: 8px 16px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    div {
        font-family: var(--scriptfont);
        font-weight: 500;
        font-size: 32px;
        color: var(--brightcolor);
    }

    ion-icon {
        color: var(--brightcolor);
        font-size: 32px;
    }
`

export default Dashboard;
