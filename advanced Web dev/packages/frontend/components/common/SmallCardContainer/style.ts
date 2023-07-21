import styled from "styled-components";

export const GridContainer = styled.div`
    position: relative;
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    grid-auto-rows: auto;
    width: 100%;
    padding: 4rem 1rem 1rem 1rem;  
    align-content: space-between;
    justify-content: space-between;
    @media (max-width: 680px){
        width: 140%;
    }  
`;
