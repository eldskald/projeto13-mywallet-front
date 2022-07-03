import { useState, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { TailSpin } from 'react-loader-spinner';

import UserContext from '../shared/UserContext';

import { BACKEND_URL } from '../shared/backendUrl';

function DeleteMovement (
    { id, amount, description, type, removePopup, reloadList }
) {

    const { token } = useContext(UserContext);

    const [loading, setLoading] = useState('');
    const [error, setError] = useState('');

    function handleDelete () {
        setLoading('deleting');
        console.log(id);
        axios.delete(`${BACKEND_URL}/movements/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(() => {
                reloadList();
                removePopup();
            })
            .catch(err => {
                setError('error');
                setLoading('');
            });
    }

    return (
        <Background>
            <Popup>
                {loading ? (
                    <CenterContainer>
                        <TailSpin color='var(--brightcolor)' />
                    </CenterContainer>
                ) : (
                    error ? (
                        <>
                            <CenterContainer onClick={removePopup}>
                                <ErrorMessage>
                                    Houve um erro!
                                </ErrorMessage>
                            </CenterContainer>
                        </>
                    ) : (
                        <>
                            <MovementDisplay type={type}>
                                <p>{description}</p>
                                <div>{Number(amount).toFixed(2)}</div>
                            </MovementDisplay>
                            <ButtonsContainer>
                                <CancelButton onClick={removePopup}>
                                    Retornar
                                </CancelButton>
                                <DeleteButton onClick={handleDelete}>
                                    DELETAR
                                </DeleteButton>
                            </ButtonsContainer>
                        </>
                    ) 
                )}  
            </Popup>
        </Background>
    );
}

const Background = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: rgba(0, 0, 0, .5);
`;

const Popup = styled.div`
    width: 70%;
    z-index: 2;

    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    background-color: var(--maincolor);
    border: 1px solid transparent;
    border-radius: 8px;
`;

const MovementDisplay = styled.div`
    width: 100%;
    height: 32px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    > p {
        font-family: var(--scriptfont);
        color: var(--brightcolor);
        font-weight: 500;
        font-size: 20px;
    }

    > div {
        font-family: var(--scriptfont);
        color: ${props => props.type == 'entrance' ? 'var(--poscolor)' : 'var(--negcolor)'};
        font-size: 24px;
        font-weight: 500;
    }
`;

const ButtonsContainer = styled.div`
    width: 100%;
    height: 42px;
    margin-top: 32px;

    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const CancelButton = styled.div`
    font-family: var(--scriptfont);
    color: var(--brightcolor);
    font-size: 20px;
    cursor: pointer;
`;

const DeleteButton = styled.div`
    font-family: var(--scriptfont);
    color: var(--brightcolor);
    text-decoration: underline;
    font-weight: 600;
    font-size: 24px;
    cursor: pointer;
`;

const CenterContainer = styled.div`
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
`;

const ErrorMessage = styled.div`
    margin: 32px 0px;

    font-family: var(--scriptfont);
    color: var(--brightcolor);
    font-weight: 500;
    font-size: 32px;
    cursor: pointer;
`;

export default DeleteMovement;
