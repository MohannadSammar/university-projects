import styled from "styled-components";

export const SignUpCardContainer = styled.div`
    position: absolute;
    top: 50vh;
    left: 50vw;
    width: 100%;
    max-width: 400px;
    transform: translate(-50%, -50%);
`;

export const CustomForm = styled.div`
    margin-bottom: 20px;
`;

export const HeaderContainer = styled.div`
    text-align: center;
`;

export const LoginLink = styled.a`
    text-decoration: none;
    color: #777;
    cursor: pointer; 

    &:hover {
        color: #777;
    }
    & span {
        color: #555;
        text-decoration: underline;
    }

`;
export const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
`;