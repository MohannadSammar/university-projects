import styled from "styled-components";
import { StarContainer } from "../SmallCard/style";
import TextareaAutosize from "react-textarea-autosize";
import { TT_VARIABLES } from "../../styles/globalVariables";

export const DefaultReviewWrapper = styled.div`
  width: 100%;
`;

export const ReviewContainer = styled.div`
  border-radius: 5px;
  filter: ${TT_VARIABLES.dropShadowFilter};
`;

export const ReviewMetaData = styled.div`
  position: relative;
  p {
    margin-bottom: 0;
    margin-left: 4rem;
  }
`;

export const ReviewTextContainer = styled(ReviewContainer)`
  border: 1px black solid;
  background: white;
`;

export const ReviewTitleContainer = styled(ReviewContainer)`
  border: 1px black solid;
  margin-bottom: 25px;
  background: white;
`;

export const ReviewProductContainer = styled.p`
  font-size: 1.5em;
  font-weight: 700;
`;

export const EditInput = styled(TextareaAutosize)`
  padding: 0;
  margin: 0;
  background: rgba(0, 0, 0, 0);
  outline: 0;
  border: none;
  cursor: text;
  resize: both;
  overflow: auto;
  width: 100%;
  min-height: fit-content;
  height: fit-content;
  overflow-y: scroll;
  box-sizing: border-box;
  ::-webkit-scrollbar {
    width: 0; /* Remove scrollbar space */
    background: transparent; /* Optional: just make scrollbar invisible */
  }
`;

export const ReviewTitle = styled.div`
  display: flex;
  justify-content: center;
  font-size: 1.2em;
  font-weight: 600;
  padding: 5px;
`;
export const ReviewTextArea = styled.div`
  height: 190px;
  overflow-y: scroll;
  overflow-x: hidden;
  word-wrap: break-word;
  padding-left: 10px;
  padding-top: 10px;
`;
export const ImageContainer = styled.div`
  align-content: center;
  margin-left: 20%;
  width: 65%;
`;

//Idea -> when true keep styling as is, when false Style it so its suits Other Cards
export const ReviewStarContaier = styled(StarContainer)`
  margin-top: 25px;
`;

//---------- Default Review Element -----------//

export const ReviewElementContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  filter: ${TT_VARIABLES.dropShadowFilter};
  border: 0.1px solid ${TT_VARIABLES.colors.reviewContainerBoderColor};
  border-radius: 6px;
  margin-bottom: 1.5rem;
`;

export const RatingContainer = styled.div`
  position: absolute;
  top: -1rem;
  right: -1rem;
`;

export const BodyContainer = styled.div`
  padding: 0.5rem;
  overflow-wrap: break-word;
  word-break: break-word;
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  font-size: 1.2em;
  font-weight: bold;
  padding-top: 0.5rem;
`;

export const AvatarContainer = styled.div`
  position: absolute;
  top: -1.5rem;
  left: -0.75rem;
  width: 60px;
  height: 60px;
`;
