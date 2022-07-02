import { useState } from 'react';
import styled from 'styled-components';

function MovementsList ({ list }) {

    const [balance, setBalance] = useState('');

    function calculateBalance () {
        let sum = 0;
        list.forEach(movement => {
            if (movement.type === 'entrance') {
                sum += Number(movement.amount);
            } else {
                sum -= Number(movement.amount);
            }
        })
        setBalance(sum);
    }

    function ListDisplay () {
        return (
            <ListContainer>
                {list.map(movement => (
                    <Movement>
                        <TimeAndNameDisplay>
                            <TimeDisplay>
                                {movement.time.slice(0, 5)}
                            </TimeDisplay>
                            <NameDisplay>
                                {movement.description}
                            </NameDisplay>
                        </TimeAndNameDisplay>
                        {movement.type === 'entrance' ? (
                            <PositiveDisplay>
                                {Number(movement.amount).toFixed(2)}
                            </PositiveDisplay>
                        ) : (
                            <NegativeDisplay>
                                {Number(movement.amount).toFixed(2)}
                            </NegativeDisplay>
                        )}
                    </Movement>
                ))}
            </ListContainer>
        );
    }

    function BalanceDisplay () {
        calculateBalance();
        return (
            <BalanceContainer>
                <h1>SALDO</h1>
                {balance >= 0 ? (
                    <PositiveDisplay>
                        {Number(balance).toFixed(2)}
                    </PositiveDisplay>
                ) : (
                    <NegativeDisplay>
                        {Number(balance).toFixed(2)}
                    </NegativeDisplay>
                )}
            </BalanceContainer>
        );
    }

    return (
        <>
            <ListDisplay />
            <BalanceDisplay />
        </>
    );
}

const ListContainer = styled.div`
    width: 100%;
    flex-grow: 1;

    padding: 16px;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
`;

const BalanceContainer = styled.div`
    width: 100%;
    height: 32px;

    display: flex;
    justify-content: space-between;

    h1 {
        font-family: var(--scriptfont);
        color: var(--darkcolor);
        font-weight: 500;
        font-size: 24px;
    }
`;

const Movement = styled.div`
    width: 100%;
    height: 32px;

    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const TimeAndNameDisplay = styled.div`
    display: flex;
    align-items: center;
`;

const TimeDisplay = styled.div`
    margin-right: 8px;
    font-family: var(--scriptfont);
    color: var(--graycolor);
    font-size: 18px;
`;

const NameDisplay = styled.div`
    font-family: var(--scriptfont);
    color: var(--darkcolor);
    font-size: 18px;
`;

const PositiveDisplay = styled.div`
    font-family: var(--scriptfont);
    color: var(--poscolor);
    font-size: 20px;
`;

const NegativeDisplay = styled.div`
    font-family: var(--scriptfont);
    color: var(--negcolor);
    font-size: 20px;
`;

export default MovementsList;
