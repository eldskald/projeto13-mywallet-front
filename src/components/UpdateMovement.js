import { useState, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import UserContext from '../shared/UserContext';

import TextInput from '../shared/TextInput';
import DefaultButton from '../shared/DefaultButton';
import LinkButton from '../shared/LinkButton';
import ErrorMessage from '../shared/ErrorMessage';

import { BACKEND_URL } from '../shared/backendUrl';

function UpdateMovement (
        { id, oldAmount, oldDesc, oldType, removePopup, reloadList }
    ) {

    const { token } = useContext(UserContext);

    const [amount, setAmount] = useState(oldAmount);
    const [description, setDescription] = useState(oldDesc);
    const [type, setType] = useState(oldType);

    const [submitting, setSubmitting] = useState('');
    const [error, setError] = useState('');

    function handleSubmit (event) {
        event.preventDefault();

        setSubmitting('loading');
        const body = {amount, description, type};
        const headers = {headers: {
            Authorization: `Bearer ${token}`
        }};
        axios.put(`${BACKEND_URL}/movements/${id}`, body, headers)
            .then(() => {
                reloadList();
                removePopup();
            })
            .catch(err => {
                setError(err.response.data);
                setSubmitting('');
            });
    }

    return (
        <Background>
            <Popup>
                <Header>Atualizar</Header>
                <Form onSubmit={handleSubmit} id='update'>
                    <TextInput
                        type='number'
                        placeholder='valor'
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                        disabled={submitting}
                    />
                    <TextInput
                        type='text'
                        placeholder='descrição'
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        disabled={submitting}
                    />
                    <DropdownMenu
                        name='type'
                        form='update'
                        disabled={submitting}
                    >
                        <option
                            value='entrance'
                            onClick={() => setType('entrance')}
                            selected={type === 'entrance'}
                        >
                            Entrada
                        </option>
                        <option
                            value='exit'
                            onClick={() => setType('exit')}
                            selected={type === 'exit'}
                        >
                            Saída
                        </option>
                    </DropdownMenu>
                    <DefaultButton text='Atualizar' loading={submitting} type='submit' />
                </Form>
                <ErrorMessage error={error} />
                <LinkButton onClick={removePopup}>
                    Retornar
                </LinkButton>
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
    width: 80%;
    z-index: 2;

    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;

    background-color: var(--maincolor);
    border: 1px solid transparent;
    border-radius: 8px;
`;

const Header = styled.div`
    width: 100%;
    height: 48px;
    margin-bottom: 32px;

    font-family: var(--scriptfont);
    font-weight: 500;
    font-size: 32px;
    color: var(--brightcolor);
`;

const Form = styled.form`
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
`;

const DropdownMenu = styled.select`
    width: 100%;
    height: 42px;
    margin: 8px 0px;

    padding-left: 16px;

    border: 1px solid transparent;
    border-radius: 8px;
    outline: none;
    background-color: var(--brightcolor);

    font-size: 20px;
    color: var(--darkcolor);

    :placeholder {
        color: var(--graycolor);
    }

    :disabled {
        background-color: var(--graycolor);
    }
`;

export default UpdateMovement;
