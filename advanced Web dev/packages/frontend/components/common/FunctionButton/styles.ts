import styled from "styled-components";
import { Button } from "react-bootstrap";

export interface CustomButtonProps {
    color?: string;
    bgcolor?: string;
    width?: string;
}

export const CustomButton = styled(Button)<CustomButtonProps>`
    color: ${props => props.color ?? props.color } !important;
    background: ${props => props.bgcolor ?? props.bgcolor} !important;
    width: ${props=> props.width ?? props.width};
    border: ${props => (props.color || props.bgcolor) ?? "none"} !important;
    cursor: pointer;
    font-size: 1.2em;
    font-weight: bold;
    padding: 0.25rem 2em 0.25rem 2em;
    transition: opacity 0.25s;
    &:hover{
        opacity: 0.8;
    }
    &:active{
        opacity: 0.7;
    }
`;