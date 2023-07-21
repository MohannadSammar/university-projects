import styled from "styled-components";
import { AnimatedDiv } from "../common/AnimatedDiv/AnimatedDiv";
import { ImageContainer as ProfileImageContainer } from "../../styles/profile/styles";
import { TT_VARIABLES } from "../../styles/globalVariables";
/*eslint-disable */
//linter doesnt like any, but #Fuck lineter
export const HeaderContainer = styled.article<{ theme: any }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: ${TT_VARIABLES.headerSize};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  z-index: 20;
  background: ${(props) => props.theme};
`;

export const MobileNavigationIcon = styled.div`
  animation: open 0.25s ease-in-out 1;
  cursor: pointer;
  position: relative;
  svg {
    height: 50px;
  }
  @media (min-width: 680px) {
    display: none;
  }
  @keyframes open {
    from {
      height: 0vh;
    }
    to {
      height: 100vh;
    }
  }
`;
//
export const Gradient = styled.div<{ active: boolean; theme: any }>`
  /* eslint-disable-next-line no-use-before-define */
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  background: ${(props) => props.theme};
  filter: blur(4px);
  ${({ active }) =>
    active &&
    `
        @media (max-width: 679px){
            height: 100vh;
            animation: open 0.25s ease-in-out 1;                 
        }  
    `}
  ${({ active }) =>
    !active &&
    `
        @media (max-width: 679px){
            height: 0vh;
            animation: close 0.25s ease-in-out 1;
        }  
    `}    
    @keyframes open {
    from {
      height: 0vh;
    }
    to {
      height: 100vh;
    }
  }

  @keyframes close {
    from {
      height: 100vh;
    }
    to {
      height: 0vh;
    }
  }
`;

export const MobileNavOverlay = styled.div`
  position: relative;
  @media (min-width: 680px) {
    display: none;
  }
`;

export const ImageContainer = styled(AnimatedDiv)`
  z-index: 100;
  width: 100px;
  height: 35px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const MiniAvatarContainer = styled(ProfileImageContainer)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  z-index: 5;
  width: 50px;
  height: 50px;
  cursor: pointer;
  transition: opacity 0.25s;
  &:hover {
    filter: brightness(96%);
    opacity: 0.8;
  }
  &:active {
    opacity: 0.6;
    transform: scale(105%);
  }
  @media (min-width: 679px) {
    display: none;
    width: 0px;
  }
`;

export const WebNavigationContainer = styled.section`
  width: calc(100% - 100px);
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 679px) {
    display: none;
    width: 0px;
  }
`;
