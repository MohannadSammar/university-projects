import styled from "styled-components";
import { ReviewCardContainer } from "../tex/styles";

export const UploadCardContainer = styled(ReviewCardContainer)`
    position:fixed;
    height:95%;
`

export const SearchBarContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 60%;
    margin: 0 auto auto auto;
    @media (max-width: 680px){
        width: 70%;
    }
`