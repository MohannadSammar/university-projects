import styled from "styled-components";

export const ImageContainer = styled.div`
    width: "100vw";
    height: "100vh";
    position: "absolute";
    top: "0";
    left: "0";
    z-index: "-2";
`;

export const NotPermittedContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
`;

export const NotPermittedHeadline = styled.h1`
    color: white;
`;

export const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;