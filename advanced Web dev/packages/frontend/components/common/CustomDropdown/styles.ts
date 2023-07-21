import styled from "styled-components";
import { DropdownButton } from 'react-bootstrap';
import { TT_VARIABLES } from "../../../styles/globalVariables";

export const CustomDropdownButton = styled(DropdownButton)`
width: 100%;
    .btn-light {
        width: 100%;
        outline: 1px solid ${TT_VARIABLES.colors.mainTextColor};
        margin-bottom: 1rem;
    }
    .dropdown-menu{
        width: 100%;
    }
`;