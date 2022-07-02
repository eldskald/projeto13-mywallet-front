import React from "react";
import styled from "styled-components";

export default function ErrorMessage ({ error }) {
    if (error) {
        return <Message>{error}</Message>;
    }
    return <></>;
}

const Message = styled.div`
    margin: 4px;
    font-family: var(--scriptfont);
    font-size: 20px;
    color: var(--negcolor);
`;
