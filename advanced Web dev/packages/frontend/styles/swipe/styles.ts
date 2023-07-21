import {  HandThumbsDown, HandThumbsUp } from "react-bootstrap-icons";
import styled from "styled-components";
import { TT_VARIABLES } from "../globalVariables";

export const ViewContainer = styled.section`
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: calc(100vh - ${TT_VARIABLES.footerSize} - ${TT_VARIABLES.headerSize});
    overflow: hidden;
    @media (max-width: 680px){
        padding: 1rem;
        justify-content: center;
    }  
`;

export const BodyContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
`;

export const Minus = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 25vw;
    opacity: 0.5;
    transition: opacity 0.5s;
    transition: transform 1s;
    &:hover{
        opacity: 1;
        transform: scale(1.3);
    }
    @media (max-width: 1000px){
        display: none;
    }  
`;

export const Plus = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    z-index: 99;
    margin-left: 40rem;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 25vw;
    opacity: 0.5;
    transition: opacity 0.5s;
    transition: transform 1s;
    &:hover{
        opacity: 1;
        transform: scale(1.3);
    }
    @media (max-width: 1000px){
        display: none;
    }  
`;

export const MinusButton = styled(HandThumbsDown)`
    position: absolute;
    color: white;
`;

export const PlusButton = styled(HandThumbsUp)`
    position: relative;
    color: white;
`;