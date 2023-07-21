import styled from "styled-components";
import { TT_VARIABLES } from "../globalVariables";

export const Headline = styled.h1`
  color: white;
  margin: 5rem 0 0 0;
  @media (max-width: 680px) {
    filter: drop-shadow(0 0.6em 0.6rem ${TT_VARIABLES.colors.grey});
  }
`;

export const SecondaryHeadline = styled.h2`
  color: white;
  font-weight: bold;
  margin-top: 2.5rem;
`;
export const Subheader = styled.h3`
  color: white;
  position: relative;
  transform: translate(10%, -55%);
  font-weight: lighter;
`;

export const BodyText = styled.p<{ bold?: boolean }>`
  color: white;
  font-weight: ${(props) => (props.bold ? "bold" : "normal")};
`;

export const AboutUsContainer = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const PageContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
