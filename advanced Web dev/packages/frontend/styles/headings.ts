import styled from "styled-components";

export interface TitleHeaderProps {
    color?: string;
}

export const TitleHeader = styled.h1<TitleHeaderProps>`
    color: ${props => props.color ?? props.color};
    font-size: 4em !important;
    display: flex;
    align-items: center;
    justify-content: center;
    @media (min-width: 680px){
        font-size: 6em !important;
    }
`;