import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { TailSpin } from 'react-loader-spinner';

import UserContext from '../shared/UserContext';

import MovementsList from './MovementsList';

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
                <ion-icon name='exit-outline' onClick={() => navigate('/')}></ion-icon>
            </Header>
            <MovementsContainer>
                {loading ? (
                    <CenterContainer>
                        <TailSpin width='200' height='200' color='var(--maincolor)' />
                    </CenterContainer>
                ) : (
                    error ? (
                        <CenterContainer>
                            <p>{error}</p>
                        </CenterContainer>
                    ) : (
                        list.length === 0 ? (
                            <CenterContainer>
                                <p>Não há registros de<br/>entrada ou saída</p>
                            </CenterContainer>
                        ) : (
                            <MovementsList list={list} />
                        )
                    )
                )}
            </MovementsContainer>
            <ButtonsContainer>
                <NewMovementButton onClick={() => navigate('/nova-entrada')}>
                    <ion-icon name='add-circle-outline'></ion-icon>
                    <p>Nova<br/>entrada</p>
                </NewMovementButton>
                <NewMovementButton onClick={() => navigate('/nova-saida')}>
                    <ion-icon name='remove-circle-outline'></ion-icon>
                    <p>Nova<br/>saída</p>
                </NewMovementButton>
            </ButtonsContainer>
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

    padding: 16px;
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

const ButtonsContainer = styled.div`
    width: 100%;
    height: 140px;

    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const NewMovementButton = styled.button`
    width: 45%;
    height: 128px;

    padding: 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    background-color: var(--maincolor);
    border: 1px solid transparent;
    border-radius: 8px;
    cursor: pointer;

    p {
        font-family: var(--scriptfont);
        font-size: 20px;
        color: var(--brightcolor);
        width: fit-content;
        text-align: left;
    }

    ion-icon {
        color: var(--brightcolor);
        font-size: 32px;
    }
`;

export default Dashboard;
