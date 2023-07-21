import { Button } from "react-bootstrap";
import styled from "styled-components";
import { BodyText } from "../../../ProductDetails/ReviewTab/styles";

export const PasswordSettingsContainer = styled.div`
  width: 100%;
  padding: 1rem;
`;

export const CustomButton = styled(Button)`
  margin-top: 2rem;
  align-self: flex-end;
`;

export const CustomForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const BodyHeadline = styled(BodyText)`
  font-size: 1.25rem;
`;
