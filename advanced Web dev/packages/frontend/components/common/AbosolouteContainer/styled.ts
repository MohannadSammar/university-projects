import styled from "styled-components";

interface Positioning{
    top?: string,
    bottom?: string,
    right?: string,
    left?: string,
    width?: string,
    height?: string,
}

export const AbsoluteContainer = styled.div<Positioning>`

    position: absolute;

    top: ${props => props.top};
    bottom: ${props => props.bottom};
    right: ${props => props.right};
    left: ${props => props.left};
    width: ${props => props.width};
    @media (max-width: 680px){
            width: 80vw;
            left:10%;
    }  
`