import styled from "styled-components";
import { TT_VARIABLES } from "../../../styles/globalVariables";

export const SideBar = styled.div`
  position: relative;
  width: 25%;
  height: calc(100vh - ${TT_VARIABLES.headerSize} - ${TT_VARIABLES.footerSize});
  @media (max-width: 680px) {
    width: 100%;
    margin-top: 2rem;
  }
`;
