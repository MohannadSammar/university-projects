import styled from "styled-components";
import { AnimatedDiv } from "../AnimatedDiv/AnimatedDiv";
import { SideBar } from "../SideBar/styles";
import { TT_VARIABLES } from "../../../styles/globalVariables";

export const ComponentWrapper = styled(SideBar)`
  position: relative;
  width: 35%;
  min-width: 300px;
  background-color: white;
  height: calc(100vh - ${TT_VARIABLES.headerSize} - ${TT_VARIABLES.footerSize});
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  margin: 0;
  z-index: 2;
  filter: ${TT_VARIABLES.dropShadowFilter};
  @media (max-width: 680px) {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
`;

export const SettingsContainer = styled.div`
  width: 100%;
  overflow-y: scroll;
`;

export const HeaderContainer = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #303030;
  h3 {
    color: ${TT_VARIABLES.colors.white};
  }
`;

export const UploadImageContainer = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 3rem 0 3rem 0;
`;

export const AvatarContainer = styled(AnimatedDiv)`
  cursor: pointer;
  position: relative;
  border-radius: 50%;
  overflow: hidden;
  filter: drop-shadow(0 0 0.75rem black);
  overflow: hidden;
  height: 200px;
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FlexForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: justify-content: center;
  margin-bottom: 1rem;

  p {
      margin: 1rem 0 0 3rem;
      align-self: flex-start;

    }
`;

export const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
  column-gap: 1rem;
  padding: 0 1rem 0 1rem;
`;

export const PasswordContainer = styled(FlexContainer)`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: justify-content: center;
  padding: 0.5rem 1rem 0.5rem 1rem;
  column-gap: 1rem;
  row-gap: 1rem;
`;

export const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: justify-content: center;
  column-gap: 1rem;
  row-gap: 1rem;
`;
