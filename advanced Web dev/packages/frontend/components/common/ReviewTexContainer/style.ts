import styled from "styled-components"
import { TitleContainer } from "../../BigCard/styles"

export const Head = styled.div`
    padding: 15px 25px;
    display:flex;
    width: 100%;
    justify-content: space-evenly;
    align-items: center;
`

export const ReviewIconContainer = styled.div`
    display:flex;
    margin-left: 30%;
    padding-bottom:30px;
    padding-right:10px;
    justify-content: space-evenly;
`

export const ReviewTitleContainer = styled(TitleContainer)`
    white-space: nowrap;
`
export const XContainer = styled.div`
    padding-right: 25px;
    font-size: 1.7em;
    cursor:pointer;
`

export const EditContainer = styled.div`
    font-size: 1.7em;
    color: brown;
    cursor:pointer;

`
export const Body = styled.div`
    position:absolute;
    display:flex;
    flex-direction:column;
    width:80%;
    top: 10%;
`

export const TrashContainer = styled.div`
    font-size: 1.7em;
    padding-left: 25px;

    cursor:pointer;
`