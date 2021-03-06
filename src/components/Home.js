import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

import UserContext from '../shared/UserContext';

import TextInput from '../shared/TextInput';
import DefaultButton from '../shared/DefaultButton';
import LinkButton from '../shared/LinkButton';
import ErrorMessage from '../shared/ErrorMessage';

import { BACKEND_URL } from '../shared/backendUrl';

function Home () {

    const navigate = useNavigate();
    const { setToken, setUsername } = useContext(UserContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [submitting, setSubmitting] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        setToken('');
        setUsername('');
    }, []);

    function handleSubmit (event) {
        event.preventDefault();

        setSubmitting('loading');
        const body = {email, password};
        axios.post(`${BACKEND_URL}/sign-in`, body)
            .then(res => {
                setToken(res.data.token);
                setUsername(res.data.username);
                navigate('/painel');
            })
            .catch(err => {
                setError(err.response.data);
                setSubmitting('');
            });
    }

    return (
        <Container>
            <Logo>MyWallet</Logo>
            <Form onSubmit={handleSubmit}>
                <TextInput
                    type='email'
                    placeholder='email'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    disabled={submitting}
                />
                <TextInput
                    type='password'
                    placeholder='senha'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    disabled={submitting}
                />
                <DefaultButton text='Entrar' loading={submitting} type='submit' />
            </Form>
            <ErrorMessage error={error} />
            <LinkButton onClick={() => navigate('/cadastro')}>
                Primeira vez? Cadastre-se!
            </LinkButton>
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    height: 100%;

    padding: 0px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Logo = styled.div`
    margin-bottom: 64px;
    font-family: var(--displayfont);
    font-size: 52px;
    font-weight: 500;
    color: var(--brightcolor);
`;

const Form = styled.form`
    width: 100%;
    
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export default Home;
