import styled from "styled-components";
import { TT_VARIABLES } from "../globalVariables";

export type HeadlineProps = {
  color?: string;
  bold?: boolean;
};

export const SubHeadline = styled.h2<HeadlineProps>`
  font-size: 2.5em;
  font-weight: ${(props) => (props.bold ? "bold" : "normal")};
  color: ${(props) => (props.color ? props.color : "black")};
  margin: 0;
`;

export const ComponentWrapper = styled.section`
  height: calc(100vh - ${TT_VARIABLES.headerSize} - ${TT_VARIABLES.footerSize});
  width: 100vw;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: hidden;
`;

export const RedirectContact = styled.button`
  cursor: pointer;
  opacity: 1;
  &:hover {
    transform: scale(1.1);
    opacity: 0.7;
    transition: ease 0.2s;
  }
  &:active {
    opacity: 0.5;
    transform: scale(1.25);
    transition: ease 0.2s;
  }
  background-color: ${TT_VARIABLES.colors.darkGrey};
  border: none;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5em;
  width: 60%;
  height: 3.5em;
  margin-top: 2em;
  filter: drop-shadow(0 0.6em 0.6rem ${TT_VARIABLES.colors.grey});
  p {
    margin: 0;
  }
  @media (max-width: 680px) {
    margin-bottom: 1rem;
    align-self: center;
  }
`;

export const CustomHR = styled.hr`
  border-radius: 6px;
  border: 3px solid ${TT_VARIABLES.colors.white};
  width: 60px;
  margin-top: 0;
  opacity: 1;
  margin-bottom: 2rem;
`;

export const DecoratedHeadline = styled(SubHeadline)`
  margin-bottom: 20px;
`;

export const FAQContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  @media (max-width: 680px) {
    height: 100%;
    overflow-y: scroll;
    flex-direction: column;
    justify-content: unset;
  }
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 15%;
  @media (max-width: 680px) {
    width: 100%;
    padding: 1rem;
    filter: drop-shadow(0 0.6em 0.6rem ${TT_VARIABLES.colors.grey});
  }
`;

export const FAQEntryContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: top;
  width: 60%;
  @media (max-width: 680px) {
    width: 100%;
    padding: 1rem;
  }
`;
