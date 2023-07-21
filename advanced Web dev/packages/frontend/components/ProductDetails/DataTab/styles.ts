import styled from "styled-components";

export const DataTabContainer = styled.div`
    width: 100%;
    height: 100%;
    padding: 1rem 1rem 2rem 1rem;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: top;
    justify-content: space-between;
    overflow-y: scroll;
    h3 {
        font-size: 1.2rem;
        font-weight: bold;
        margin: 0;
        padding-bottom: 1rem;
        align-self: flex-start;
    }
`;

export const DataSheet = styled.tr`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const DataSheetHeader = styled.th`
    width: 45%;
    table-layout: fixed;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    font-size: 1.2rem;
    font-weight: bold;
    padding-bottom: 1rem;
`;

export const DataSheetEntry = styled.td`
    width: 45%;
    table-layout: fixed;
    display: flex;
    align-items: center;
    justify-content: space-between;
    overflow-wrap: break-word;
    word-break: break-all;
    padding-bottom: 2rem;
    -webkit-hyphens: auto;
    -moz-hyphens: auto;
    -ms-hyphens: auto;
    hyphens: auto;
`;

export const VariantsHeader = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    p {
        font-size: 1.2rem;
        font-weight: bold;
        margin: 0;
    }
`;