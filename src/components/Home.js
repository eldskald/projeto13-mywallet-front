import { useContext, useEffect } from 'react';
import styled from 'styled-components';

import UserContext from '../shared/UserContext';

function Home () {

    const { someValue, someOtherValue } = useContext(UserContext);

    useEffect(() => {
        // function to be called whenever dependencies change
    }, [ /* dependencies array */ ]);

    return (
        <Container>
            Sample text
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: var(--divcolor);
`;

export default Home;
