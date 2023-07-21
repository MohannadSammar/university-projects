import styled from "styled-components";
import { SecondaryHeadline } from "../about_us/styles";
import { AnimatedDiv } from "../../components/common/AnimatedDiv/AnimatedDiv";
import { TT_VARIABLES } from "../globalVariables";

export const CustomHeadline = styled(SecondaryHeadline)`
  margin: 0;
  font-size: 1.5rem;
`;

export const StyledLink = styled(AnimatedDiv)`
  border-radius: 25px;
  margin-bottom: 1rem;
  width: 100%;
  padding: 0.5rem 1rem 0.5rem 1rem;
  background-color: ${TT_VARIABLES.colors.red};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  filter: drop-shadow(0 0 0.75rem black);
  @media (max-width: 680px) {
    width: 200%;
  }
`;

export const LinkContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 20%;
  margin-top: 2.5rem;
  @media (max-width: 680px) {
    margin-top: 1rem;
  }
`;

export const ImageContainer = styled.div`
  color: ${TT_VARIABLES.colors.white};
  margin-top: 1rem;
  margin-bottom: 2rem;
  filter: drop-shadow(0 0 0.75rem black);
  overflow: hidden;
  border-radius: 50%;
  height: 250px;
  width: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 680px) {
    margin: 1rem;
  }
`;

export const ProfilePageContainer = styled.section`
  height: calc(100vh - ${TT_VARIABLES.headerSize} - ${TT_VARIABLES.footerSize});
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  h1 {
    margin-top: 0;
    margin-bottom: 2.5rem;
    @media (max-width: 680px) {
      margin-bottom: 1rem;
    }
  }
`;

export const ContentContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ToastContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
`;
