import { XSquare } from "react-bootstrap-icons";
import styled from "styled-components";
import { TT_VARIABLES } from "../../styles/globalVariables";

export const ProductDetailsContainer = styled.div`
    position: relative;
    width: 35%;
    min-width: 300px;
    background-color: white;
    height: calc(100vh - ${TT_VARIABLES.headerSize} - ${TT_VARIABLES.footerSize});
    overflow-y: hidden;
    margin: 0;
    z-index: 2;
    filter: ${TT_VARIABLES.dropShadowFilter};
    @media (max-width: 680px){
        width: 100%;  
        position: absolute;
        top: 0;
        left: 0; 
    }  
`;

export const HeaderContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    font-weight: bold;
    background-color: #303030;
`;

export const HeaderTab = styled.div<{active: boolean}>`
    cursor: pointer;
    padding: 0.75rem;
    width: 33.3%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.4s;
    background-color: ${props => props.active ? "white" : "#303030"};
    color: ${props => props.active ? "black" : "white"};
    @media (max-width: 680px){
        width: 25%;
        padding: 0.8rem;
    }  
`;

export const CloseTab = styled.div`
    width: 33.3%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #303030;
    color: ${TT_VARIABLES.colors.red};
    @media (max-width: 680px){
        width: 25%;
    }  
`;

export const CloseButton = styled(XSquare)`
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
`;