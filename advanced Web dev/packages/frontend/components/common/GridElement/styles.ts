import styled from "styled-components";
import { AnimatedDiv } from "../AnimatedDiv/AnimatedDiv";

export interface Backgroundcolor{
    wide?: boolean;
    long?: boolean;
    image: string;
}

export const GridElementItemContainer = styled(AnimatedDiv)<Backgroundcolor>`
  display: flex;
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.8);
  background: url(${props => props.image});
  background-size: cover;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  box-shadow: 12px 12px 2px 2px rgba(0, 0, 0, .2);
  grid-column: ${props => props.wide ? "span 2" : "span 1"};
  grid-row: ${props => props.long ? "span 2" : "span 1"};
  @media (max-width: 680px){
    grid-column: span 1;
    grid-row: span 1;
  }
`

export const Textcontainer = styled.div`
  padding-left: 5px;
  padding-right: 5px;
  font-size: 1.1rem;
  font-weight: bold;
  color: #363636;
  transform: translateY(25%);
  -webkit-text-fill-color: white; /* Will override color (regardless of order) */
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
`

