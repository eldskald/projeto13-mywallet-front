import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

import UserContext from '../shared/UserContext';

import DefaultButton from '../shared/DefaultButton';
import TextInput from '../shared/TextInput';
import ErrorMessage from '../shared/ErrorMessage';

import { BACKEND_URL } from '../shared/backendUrl';
import LinkButton from '../shared/LinkButton';

function NewEntrance () {

    const navigate = useNavigate();
    const { token } = useContext(UserContext);

    const [amount, setAmount] = useState();
    const [description, setDescription] = useState('');

    const [submitting, setSubmitting] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (!token) {
            navigate('/');
        }
    }, []);

    function handleSubmit (event) {
        event.preventDefault();

        setSubmitting('loading');
        const body = {amount, description, type: 'entrance'};
        const headers = {headers: {
            Authorization: `Bearer ${token}`
        }}
        axios.post(`${BACKEND_URL}/movements`, body, headers)
            .then(() => {navigate('/painel')})
            .catch(err => {
                setError(err.response.data);
                setSubmitting('');
            });
    }

    return (
        <Container>
            <Header>Nova entrada</Header>
            <Form onSubmit={handleSubmit}>
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
                <DefaultButton text='Salvar entrada' loading={submitting} type='submit' />
            </Form>
            <ErrorMessage error={error} />
            <LinkButton onClick={() => navigate('/painel')}>
                Retornar
            </LinkButton>
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

export default NewEntrance;
