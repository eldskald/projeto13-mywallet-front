import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import UserContext from '../shared/UserContext';

import TextInput from '../shared/TextInput';
import DefaultButton from '../shared/DefaultButton';
import LinkButton from '../shared/LinkButton';

function Home () {

    const { someValue, someOtherValue } = useContext(UserContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [submitting, setSubmitting] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        // function to be called whenever dependencies change
    }, [ /* dependencies array */ ]);

    return (
        <Container>
            <Logo>MyWallet</Logo>
            <TextInput
                type='email'
                placeholder='email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                disabled={submitting}
                loading={submitting}
            />
            <TextInput
                type='password'
                placeholder='senha'
                value={password}
                onChange={e => setPassword(e.target.value)}
                disabled={submitting}
                loading={submitting}
            />
            <DefaultButton text='Entrar' loading={submitting} />
            <LinkButton>
                Primeira vez? Cadastre-se!
            </LinkButton>
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: var(--divcolor);
`;

const Logo = styled.div`
    margin-bottom: 64px;
    font-family: var(--displayfont);
    font-size: 52px;
    font-weight: 500;
    color: var(--brightcolor);
`;

export default Home;
