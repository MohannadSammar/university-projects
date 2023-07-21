import styled from "styled-components";
import { TT_VARIABLES } from "../globalVariables";

export const HomeContainer = styled.section`
    position: relative;
    width: 100vw;
    height: calc(100vh - ${TT_VARIABLES.headerSize} - ${TT_VARIABLES.footerSize});
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    h1 {
        margin-bottom: 5rem;
    }
`;