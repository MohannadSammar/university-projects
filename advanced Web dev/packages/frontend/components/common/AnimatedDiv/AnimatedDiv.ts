import styled from "styled-components";

export const AnimatedDiv = styled.div`
    transition: opacity 0.25s;
        &:hover{
            filter: brightness(96%);
            opacity: 0.8;
        }
        &:active{
            opacity: 0.6;
            transform: scale(105%);
        }
`