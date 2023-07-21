import { Button } from "react-bootstrap";
import styled from "styled-components";
import { TT_VARIABLES } from '../../../../styles/globalVariables';


export const OfferElementContainer = styled.div`
    width: 100%;
    position: relative;
    display: grid;
    grid-row: 50% 50%;
    grid-template-columns: 1.25fr 0.75fr;
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;
    justify-content: center;
    align-items: center;
    background-color: white;
    filter: ${TT_VARIABLES.dropShadowFilter};
    border: 0.1px solid ${TT_VARIABLES.colors.reviewContainerBoderColor};
    border-radius: 6px;
    margin-bottom: 1rem;
    padding: 0.75rem;
    :last-child{
        margin-bottom: 2.5rem;
    }
    .title {
        margin: 0;
        font-weight: bold;
        color: ${TT_VARIABLES.colors.mainTextColor};
    }
    h3 {
        margin: 0;
        padding: 0;
        font-weight: bold;
    }
`;
export const GridItemContainer = styled.div`

    display: flex;
    align-items: center;
    justify-content: center;
`;

export const CustomButton = styled(Button)`
    padding: 0.2rem 0.5rem 0.2rem 0.5rem;
    p {
        margin: 0;
        font-weight: bold;
    }
    filter: drop-shadow(2px 2px 2px rgba(240, 173, 78, 0.75));
`;