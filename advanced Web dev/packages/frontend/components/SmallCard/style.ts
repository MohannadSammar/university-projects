import styled from "styled-components";
import { AnimatedDiv } from "../common/AnimatedDiv/AnimatedDiv";

export const SmallCardElement = styled(AnimatedDiv)`
    display: flex;
    flex-direction: column;
    justify-self: center;
    align-self: top;
    align-content: space-between;
    cursor: pointer;
    /* padding-left: 25%; */
`

export const ImageStarConatiner = styled.div`
    display: flex;
    width: 100%;
    height: 180px;
    flex-direction: column;
    background-color: white;
    justify-content: center;
    align-items: center;
    align-content: center;
    border-radius: 15px;
    overflow: 'hidden';
    padding-bottom: 10px;
      /* @media (min-width: 680px){
        width: 200px ;
        height: 230px;
    }  */
`

export const ImageContainer = styled.div`
    padding-top: 10px;
    padding-bottom: 10px;
    display: flex;
    justify-content: center;
    width: 100%;
    height: fit-content;
`

export const StarContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
`

export const TextContainer = styled.div`
    margin-top: 5px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-content: center;
    
`

export const ProductName = styled.p`
    color:white;
    word-break: unset;
    font-weight: 500;
    font-size: 1.3rem;
    padding: 0 0 0 0;
    margin: 0 0 0 0;
`

export const BrandName = styled.p`
    color:white;
    font-weight: 100;
    padding: 0 0 0 0;
`

export const HorizontalLine = styled.hr`
    color:white;
    border: 2px solid white !important;
    width: 100%;
    opacity: 100%;
    border-radius: 10px;
    padding: 0 0 0 0;
    margin: 0 0 0 0;
`