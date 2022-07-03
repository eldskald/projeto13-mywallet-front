import { useState } from 'react';
import styled from 'styled-components';

import DeleteMovement from './DeleteMovement';
import UpdateMovement from './UpdateMovement';

function MovementsList ({ list, reload }) {

    const [updatingObject, setUpdatingObject] = useState({});
    const [deletingObject, setDeletingObject] = useState({});

    function handleUpdate (key) {
        setUpdatingObject(list[key]);
    }

    function handleDelete (key) {
        setDeletingObject(list[key]);
    }

    function ListDisplay () {
        return (
            <ListContainer>
                {list.map((movement, index) => (
                    <Movement key={index}>
                        <TimeAndNameDisplay>
                            <TimeDisplay>
                                {movement.time.slice(0, 5)}
                            </TimeDisplay>
                            <NameDisplay onClick={() => handleUpdate(index)}>
                                {movement.description}
                            </NameDisplay>
                        </TimeAndNameDisplay>
                        <AmountAndDeleteDisplay>
                            {movement.type === 'entrance' ? (
                                <PositiveDisplay>
                                    {Number(movement.amount).toFixed(2)}
                                </PositiveDisplay>
                            ) : (
                                <NegativeDisplay>
                                    {Number(movement.amount).toFixed(2)}
                                </NegativeDisplay>
                            )}
                            <ion-icon name='trash-outline' onClick={() => handleDelete(index)}></ion-icon>
                        </AmountAndDeleteDisplay>
                    </Movement>
                ))}
            </ListContainer>  
        );
    }

    function BalanceDisplay () {
        let balance = 0;
        list.forEach(movement => {
            if (movement.type === 'entrance') {
                balance += Number(movement.amount);
            } else {
                balance -= Number(movement.amount);
            }
        })
        return (
            <BalanceContainer>
                <h1>SALDO</h1>
                {balance >= 0 ? (
                    <PositiveDisplay>
                        {balance.toFixed(2)}
                    </PositiveDisplay>
                ) : (
                    <NegativeDisplay>
                        {balance.toFixed(2)}
                    </NegativeDisplay>
                )}
            </BalanceContainer>
        );
    }

    return (
        <>
            <Container>
                <ListDisplay />
                <BalanceDisplay />
            </Container>
            {Object.keys(updatingObject).length > 0 ? (
                <UpdateMovement
                    id={updatingObject._id}
                    oldDesc={updatingObject.description}
                    oldAmount={updatingObject.amount}
                    oldType={updatingObject.type}
                    removePopup={() => setUpdatingObject({})}
                    reloadList={reload}
                />
            ) : (<></>)}
            {Object.keys(deletingObject).length > 0 ? (
                <DeleteMovement
                    id={deletingObject._id}
                    description={deletingObject.description}
                    amount={deletingObject.amount}
                    type={deletingObject.type}
                    removePopup={() => setDeletingObject({})}
                    reloadList={reload}
                />
            ) : (<></>)}
        </>
    );
}

const Container = styled.div`
    position: relative;
    width: 100%;
    flex-grow: 1;

    display: flex;
    flex-direction: column;
`;

const ListContainer = styled.div`
    position: absolute;
    top: 0px;
    bottom: 32px;
    left: 0px;
    right: 0px;

    display: flex;
    flex-direction: column;
    overflow-y: scroll;
`;

const BalanceContainer = styled.div`
    position: absolute;
    bottom: 0px;
    left: 0px;
    right: 0px;
    height: 32px;

    display: flex;
    justify-content: space-between;

    > h1 {
        font-family: var(--scriptfont);
        color: var(--darkcolor);
        font-weight: 500;
        font-size: 20px;
    }
`;

const Movement = styled.div`
    width: 100%;
    min-height: 36px;

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
    cursor: pointer;
`;

const AmountAndDeleteDisplay = styled.div`
    display: flex;
    align-items: center;

    > ion-icon {
        margin-left: 8px;
        font-size: 24px;
        color: var(--darkcolor);
        cursor: pointer;
    }
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
