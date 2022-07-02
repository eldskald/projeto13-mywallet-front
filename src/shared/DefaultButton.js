import React from 'react';
import styled from 'styled-components';
import { ThreeDots } from 'react-loader-spinner';

function DefaultButton ({ text, loading }) {
    return (
        <DefaultButtonStyle loading={loading} disabled={loading}>
            {loading ? (
                <ThreeDots color='var(--brightcolor)' />
            ) : (
                text
            )}
        </DefaultButtonStyle>
    )
}

const DefaultButtonStyle = styled.button`
    width: 320px;
    height: 42px;
    margin: 8px 0px;

    display: flex;
    justify-content: center;
    align-items: center;

    border: 1px solid transparent;
    border-radius: 8px;
    background-color: var(--maincolor);
    cursor: ${props => props.loading ? "default" : "pointer"};
    opacity: ${props => props.loading ? 0.4 : 1};

    font-family: var(--scriptfont);
    font-weight: 500;
    font-size: 20px;
    color: var(--brightcolor);
    text-align: center;
`;

export default DefaultButton;