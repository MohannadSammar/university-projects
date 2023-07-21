import styled from "styled-components";
import { TT_VARIABLES } from "../../../styles/globalVariables";

export const ReviewTabContainer = styled.div`
    width: 100%;
    height: 100%;
    padding: 1rem 1rem 4rem 1rem;
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
    overflow-y: scroll;
    h3 {
        font-size: 1.2rem;
        font-weight: bold;
        margin: 0;
        padding-bottom: 1rem;
        align-self: flex-start;
    }
    :last-child{
        margin-bottom: 2.5rem;
    }
`

export const DataSheet = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`;

export const LoadMoreLink = styled.p`
    color: ${TT_VARIABLES.colors.linkColor};
    font-weight: bold;
    cursor: pointer;
    transition: opacity 0.25s;
    &:hover{
        filter: brightness(96%);
        opacity: 0.8;
    }
    &:active{
        opacity: 0.6;
        transform: scale(105%);
    }
    -webkit-touch-callout: none;
    -webkit-user-select: none; 
    -khtml-user-select: none;
    -moz-user-select: none; 
    -ms-user-select: none; 
    user-select: none; 
`;

export const BodyText = styled.p`
    font-weight: bold;
    color: ${TT_VARIABLES.colors.mainTextColor};
`;
