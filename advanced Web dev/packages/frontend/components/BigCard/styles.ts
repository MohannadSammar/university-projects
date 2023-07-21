import styled from "styled-components";
import { AppIndicator } from "react-bootstrap-icons";
import { TT_VARIABLES } from "../../styles/globalVariables";

export const CardContainer = styled.div`
  width: 28vw;
  min-width: 400px;
  max-width: 450px;
  height: calc(
    100vh - ${TT_VARIABLES.headerSize} - ${TT_VARIABLES.footerSize} - 2rem
  );
  max-height: 700px;
  position: relative;
  background-color: white;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  filter: ${TT_VARIABLES.dropShadowFilter};
  @media (max-width: 680px) {
    width: calc(100vw - 2rem);
    min-width: 0;
    height: calc(
      100vh - ${TT_VARIABLES.headerSize} - ${TT_VARIABLES.footerSize} - 2rem
    );
  }
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

export const BodyContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 1.5rem;
`;

export const HeaderContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  p {
    padding-left: 0.5rem;
    margin: 0;
    font-size: 1.1rem;
  }
`;

export const HeadlineAndRatingContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  .react-simple-star-rating {
    margin: 0 !important;
  }
`;

export const HeadlineContainer = styled.div`
  display: flex;
  h4 {
    text-decoration: none;
    position: relative;
    padding: 0 0.5rem 0.5rem 0.5rem;
    border-bottom: 1px solid ${TT_VARIABLES.colors.mainTextColor};
    color: ${TT_VARIABLES.colors.mainTextColor};
    margin: 0;
  }
`;

export const LikeAndPriceContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  p {
    margin: 0;
    font-weight: bold;
    font-size: 1.25rem;
    transform: translateY(-50%);
    color: ${TT_VARIABLES.colors.mainTextColor};
  }
`;

export const LikeContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.5rem 0.5rem 0.5rem;
  border-bottom: 2px solid ${TT_VARIABLES.colors.green};
  h4 {
    color: ${TT_VARIABLES.colors.green};
    font-weight: bold;
    margin: 0;
  }
  svg {
    color: ${TT_VARIABLES.colors.green};
  }
`;

export const DetailsButton = styled(AppIndicator)`
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
`;

export const ImageContainer = styled.div`
  width: 80%;
`;

export const SubHeaderContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-weight: 500;

  .redirect {
    color: ${TT_VARIABLES.colors.linkColor};
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
  }
`;

export const HeartContainer = styled.div`
  font-size: 2rem;
  position: absolute;
  color: red;
  right: 25%;
  bottom: 18%;
  cursor: pointer;
  &:hover {
    animation: heartbeat 1.4s linear infinite;
  }
  @media (max-width: 680px) {
    bottom: 20%;
  }
  @keyframes heartbeat {
    0% {
      -webkit-transform: scale(1);
      -o-transform: scale(1);
      -moz-transform: scale(1);
      -ms-transform: scale(1);
      transform: scale(1);
    }

    2% {
      -webkit-transform: scale(1);
      -o-transform: scale(1);
      -moz-transform: scale(1);
      -ms-transform: scale(1);
      transform: scale(1);
    }

    4% {
      -webkit-transform: scale(1.08);
      -o-transform: scale(1.08);
      -moz-transform: scale(1.08);
      -ms-transform: scale(1.08);
      transform: scale(1.08);
    }

    8% {
      -webkit-transform: scale(1.1);
      -o-transform: scale(1.1);
      -moz-transform: scale(1.1);
      -ms-transform: scale(1.1);
      transform: scale(1.1);
    }

    20% {
      -webkit-transform: scale(0.96);
      -o-transform: scale(0.96);
      -moz-transform: scale(0.96);
      -ms-transform: scale(0.96);
      transform: scale(0.96);
    }

    24% {
      -webkit-transform: scale(1.1);
      -o-transform: scale(1.1);
      -moz-transform: scale(1.1);
      -ms-transform: scale(1.1);
      transform: scale(1.1);
    }

    32% {
      -webkit-transform: scale(1.08);
      -o-transform: scale(1.08);
      -moz-transform: scale(1.08);
      -ms-transform: scale(1.08);
      transform: scale(1.08);
    }

    40% {
      -webkit-transform: scale(1);
      -o-transform: scale(1);
      -moz-transform: scale(1);
      -ms-transform: scale(1);
      transform: scale(1);
    }
  }
`;
