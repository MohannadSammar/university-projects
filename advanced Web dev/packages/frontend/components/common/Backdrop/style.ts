import styled from "styled-components"
import { TT_VARIABLES } from "../../../styles/globalVariables"


export const Backdrop = styled.div`
    backdrop-filter: blur(10px);
    position: absolute;
    top: 0;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    width:100%;
    height: calc(100% + ${TT_VARIABLES.footerSize});
    z-index: 90;
    overflow-y: hidden ;
`