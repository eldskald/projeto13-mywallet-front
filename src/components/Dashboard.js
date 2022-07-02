import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { TailSpin } from 'react-loader-spinner';

import UserContext from '../shared/UserContext';

import { BACKEND_URL } from '../shared/backendUrl';

function Dashboard () {

    const navigate = useNavigate();
    const { token, setToken, username, setUsername } = useContext(UserContext);

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

    function logout () {
        setToken('');
        setUsername('');
        navigate('/');
    }

    return (
        <Container>
            <Header>
                <div>{`Olá, ${username}`}</div>
                <ion-icon name='exit-outline' onClick={logout}></ion-icon>
            </Header>
            <MovementsContainer>
                {loading ? (
                    <CenterContainer>
                        <TailSpin width='200' height='200' color='var(--maincolor)' />
                    </CenterContainer>
                ) : (
                    list.length > 0 ? (
                        'nada por enquanto'
                    ) : (
                        <CenterContainer>
                            <p>Não há registros de<br/>entrada ou saída</p>
                        </CenterContainer>
                    )
                )}
            </MovementsContainer>
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    height: 100%;

    padding: 32px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Header = styled.div`
    width: 100%;
    height: 48px;

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
        margin-top: 8px;
        color: var(--brightcolor);
        font-size: 32px;
        --ionicon-stroke-width: 48px;
        cursor: pointer;
    }
`;

const MovementsContainer = styled.div`
    flex-grow: 1;
    width: 100%;
    margin: 32px 0px;

    display: flex;
    flex-direction: column;

    border: 1px solid transparent;
    border-radius: 8px;
    background-color: var(--brightcolor);
`;

const CenterContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    p {
        font-family: var(--scriptfont);
        font-size: 24px;
        color: var(--graycolor);
        text-align: center;
    }
`;

export default Dashboard;
