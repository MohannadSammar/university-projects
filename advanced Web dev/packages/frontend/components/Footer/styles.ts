import styled from "styled-components";
import { TT_VARIABLES } from "../../styles/globalVariables";

const IconPadding = "70px";
export const FooterContainer = styled.div`
        position: relative;
        max-width: 100%;
        height: ${TT_VARIABLES.footerSize};
        background: rgba(4, 4, 4, 0.95);
        display: flex;
        align-items: center;
        color: ${TT_VARIABLES.colors.white};
        z-index: 5;
`;

export const BrandNameContainer = styled.div`
        display: flex;
        flex-direction: row;
        align-items: center;
        padding-left: 50px;
        font-size: 1.2em;
        width: 25%;
`

export const WebView = styled.div`
        width: 100vw;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        @media (max-width: 679px){
        display: none;
        width: 0px;
    }
`

export const MobileView = styled.div`
        width: 100vw;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding-left: ${IconPadding};
        padding-right: ${IconPadding};
        @media (min-width: 680px){
        display: none;
    }

`