import styled from "styled-components";
import { TT_VARIABLES } from "../globalVariables";

export const SearchContainer = styled.section`
  position: relative;
  width: 100%;
  height: calc(100vh - ${TT_VARIABLES.headerSize} - ${TT_VARIABLES.footerSize});
  display: flex;
  flex-direction: row;
  align-items: top;
  justify-content: space-between;
  @media (max-width: 680px) {
    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;
  }
`;

export const SearchBarContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 60%;
  margin: 0 auto auto auto;
  @media (max-width: 680px) {
    width: 70%;
  }
`;

export const GridContainer = styled.div`
  position: relative;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  grid-auto-rows: 130px;
  padding: 0 1rem 1rem 1rem;
  width: 100%;
  @media (max-width: 680px) {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    grid-auto-rows: 110px;
  }
`;
