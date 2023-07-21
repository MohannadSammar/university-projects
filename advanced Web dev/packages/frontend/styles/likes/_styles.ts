import styled from "styled-components";
import { SearchBarContainer } from "../search/styles";

export const MainContainer = styled.div``;

export const LikedContainer = styled(SearchBarContainer)`
  width: 90%;
  @media (max-width: 680px) {
    width: 70%;
  }
`;

const Icons = styled.div<{ showOverlay: boolean }>`
  color: white;
  opacity: 0.6;
  position: absolute;
  font-size: 4rem;
  bottom: 40%;
  z-index: 99;
  cursor: pointer;
  @media (min-width: 680px) {
    :hover {
      color: red;
      opacity: 1;
      font-size: 5.5rem;
      bottom: 38%;
    }
  }
  @media (max-width: 680px) {
    @media (max-width: 680px) {
      ${(props) => (props.showOverlay ? "display: none" : " ")};
      color: black;
    }
    color: black;
  }
`;
export const RightContainer = styled(Icons)`
  right: 5%;
`;

export const LeftContainer = styled(Icons)`
  left: ${(props) => (props.showOverlay ? "30%" : "5%")};
`;
