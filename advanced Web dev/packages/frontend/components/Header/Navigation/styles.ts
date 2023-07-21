import styled from "styled-components";
import { TT_VARIABLES } from "../../../styles/globalVariables";

export const NavContainer = styled.section`
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    @media (max-width: 679px){
        flex-direction: column;
        position: absolute;
        align-items: flex-end;
        top: ${TT_VARIABLES.headerSize};
        right: 10px;
    }
`;
