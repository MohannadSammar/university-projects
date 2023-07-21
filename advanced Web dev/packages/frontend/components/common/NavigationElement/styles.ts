import styled from "styled-components";
import { TT_VARIABLES } from "../../../styles/globalVariables";

export const Nav = styled.div`
    text-decoration: none;
    cursor: pointer;
    color: ${TT_VARIABLES.colors.white};
    font-size: 1.4em;
    transition: transform 0.25s;
    &:hover{
        transform: scale(1.35);
    }
`;

export const NavElementContainer = styled.a`
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (max-width: 680px){
        margin-bottom: 1em;
    }
    flex-wrap: nowrap;
`;