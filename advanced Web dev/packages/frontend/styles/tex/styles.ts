import { SearchBarContainer } from "../search/styles";
import styled from "styled-components";
import { CardContainer } from "../../components/BigCard/styles";

export const TexContainer = styled(SearchBarContainer)`
  width: 90%;
  @media (max-width: 680px) {
    width: 70%;
  }
`;

export const TexTitle = styled.h2`
  color: white;
  font-weight: 700;
  margin: 30px 0px;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000;
`;

export const TexPageContainer = styled.div``;

export const ReviewCardContainer = styled(CardContainer)`
  display: flex;
  position: fixed;
  z-index: 99;
  height: 95%;
`;
