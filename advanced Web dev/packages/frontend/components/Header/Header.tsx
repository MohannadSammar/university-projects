import {
  HeaderContainer,
  MobileNavigationIcon,
  WebNavigationContainer,
  MobileNavOverlay,
  Gradient,
  ImageContainer,
  MiniAvatarContainer,
} from "./styles";
import Image from "next/image";
import Logo from "../../public/Logo.svg";
import { PersonCircle } from "react-bootstrap-icons";
import { TT_VARIABLES } from "../../styles/globalVariables";
import { ReactNode, useContext, useState } from "react";
import { Navigation } from "./Navigation/Navigation";
import { FunctionButton } from "../common/FunctionButton/FunctionButton";
import { List } from "react-bootstrap-icons";
import { navTags } from "../../mockTypes/mockTypes";
/*eslint-disable */
import { ThemeContext, ThemeProvider } from "../../contexts/ThemeContext"; // i assume Themeprovider is still to be used to i wont delete it. #fuck linter
import { useRouter } from "next/router";
import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";
/*eslint-enable */

export interface HeaderProps {
  authButtonAction: () => void;
  authButtonLabel?: string;
}

export const Header: React.FC<HeaderProps> = ({
  authButtonAction,
  authButtonLabel = "Login",
}) => {
  const auth = useAuth();
  const router = useRouter();
  const { theme } = useContext(ThemeContext);

  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false);
  const [displayedImage, setDisplayedImage] = useState<string>(
    auth?.user?.image ? auth.user.image : "default"
  );
  useEffect(() => {
    setDisplayedImage(auth?.user?.image ? auth?.user?.image : "default");
  }, [auth]);

  const WebNavigation: ReactNode = (
    <WebNavigationContainer>
      <Navigation titles={navTags} />
      <FunctionButton
        action={authButtonAction}
        label={authButtonLabel}
        textColor={TT_VARIABLES.colors.red}
        backgroundColor={TT_VARIABLES.colors.white}
      />
    </WebNavigationContainer>
  );

  const navBar: ReactNode = mobileNavOpen && <Navigation titles={navTags} />;

  const MobileNavigation: ReactNode = (
    <MobileNavOverlay>
      <Gradient active={mobileNavOpen} theme={theme} />
      <MobileNavigationIcon>
        <List
          color={TT_VARIABLES.colors.white}
          size="md"
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
        />
      </MobileNavigationIcon>
      {navBar}
    </MobileNavOverlay>
  );

  const userImage: ReactNode =
    !auth?.user?.image || auth?.user?.image === "default" ? (
      <PersonCircle size={50} color="white" />
    ) : (
      <Image
        loader={() => displayedImage}
        unoptimized
        draggable={false}
        src={displayedImage}
        width="100%"
        height="100%"
        layout="intrinsic"
        objectFit="cover"
        alt=""
      />
    );

  const ProfileAvatar: ReactNode = auth?.isLoggedIn && (
    <MiniAvatarContainer onClick={() => router.push("/profile")}>
      {userImage}
    </MiniAvatarContainer>
  );

  return (
    <HeaderContainer theme={theme}>
      {ProfileAvatar}
      <ImageContainer onClick={() => router.push("/")}>
        <Image
          unoptimized
          loader={() => Logo}
          src={Logo}
          alt="CompanyLogo"
          draggable={false}
        />
      </ImageContainer>
      {WebNavigation}
      {MobileNavigation}
    </HeaderContainer>
  );
};
