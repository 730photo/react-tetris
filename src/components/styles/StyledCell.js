import styled from 'styled-components';

//we have backticks because this is a tagged function. You can write regular CSS inside of it
export const StyledCell = styled.div`
    width: auto;
    background: rgba(${props => props.color}, 0.8);
`