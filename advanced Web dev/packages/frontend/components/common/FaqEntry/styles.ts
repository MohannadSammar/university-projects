import styled from "styled-components";

export type HeadlineProps = {
  color?: string;
  bold?: boolean;
};

export const BodyText = styled.p<HeadlineProps>`
  color: ${(props) => (props.color ? props.color : "black")};
  font-weight: ${(props) => (props.bold ? "bold" : "normal")};
`;

export const Question = styled.h2<HeadlineProps>`
  font-size: 1.5em;
  font-weight: ${(props) => (props.bold ? "bold" : "normal")};
  color: ${(props) => (props.color ? props.color : "black")};
  margin: 0 0 0.5rem 0;
`;

export const OpenClose = styled.div`
  z-index: 5;
  position: absolute;
  display: flex;
  object-fit: scale-down;
  right: 0.5em;
  top: 0.75em;
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
`;

export const FAQContainer = styled.div<{ open: boolean }>`
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: ${(props) => (props.open ? "30%" : "3em")};
  background-color: rgba(255, 255, 255, 0.85);
  border-radius: 6px;
  margin-bottom: 1em;
  animation: ${(props) =>
    props.open ? "open 0.25s ease-in-out 1" : "close 0.25s ease-in-out 1"};
  overflow: hidden;

  p {
    padding-left: 0.5rem;
  }
  h2 {
    padding: 0.5rem;
  }

  @keyframes open {
    from {
      height: 3em;
    }
    to {
      height: 9em;
    }
  }
  @keyframes close {
    from {
      height: 9em;
    }
    to {
      height: 3em;
    }
  }
  @media (max-width: 680px) {
    height: ${(props) => (props.open ? "30%" : "5em")};
    @keyframes open {
      from {
        height: 3em;
      }
      to {
        height: 30%;
      }
    }
    @keyframes close {
      from {
        height: 30%;
      }
      to {
        height: 3em;
      }
    }
  }
`;

export const TextContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  word-wrap: normal;
  width: 100%;
`;
