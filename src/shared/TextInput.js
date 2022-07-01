import styled from "styled-components";

const TextInput = styled.input`
    width: 320px;
    height: 42px;
    margin: 8px 0px;

    padding-left: 16px;

    border: 1px solid transparent;
    border-radius: 8px;
    outline: none;
    opacity: ${props => props.loading ? 0.4 : 1};

    font-size: 20px;

    :placeholder {
        color: var(--graycolor);
    }
`;

export default TextInput;
