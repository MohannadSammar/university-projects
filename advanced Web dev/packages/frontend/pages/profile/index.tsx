import Image from "next/image";
import { Headline } from "../../styles/about_us/styles";
import { TT_VARIABLES } from "../../styles/globalVariables";
import { useRouter } from "next/router";
import { useContext, useEffect, ReactNode, useState } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import {
  ProfilePageContainer,
  ImageContainer,
  LinkContainer,
  StyledLink,
  CustomHeadline,
  ContentContainer,
  ToastContainer,
} from "../../styles/profile/styles";
import { AuthContext } from "../../contexts/AuthContext";
import { PersonCircle } from "react-bootstrap-icons";
import { ProfileSettings } from "../../components/common/ProfileSettings/ProfileSettings";
import { Toast, ToastHeader, ToastBody } from "react-bootstrap";

const ProfilePage: React.FC = () => {
  const router = useRouter();
  const auth = useContext(AuthContext);
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  const [displayedImage, setDisplayedImage] = useState<string>(
    auth?.user?.image ? auth.user.image : "default"
  );
  const [toastVisible, setToastVisible] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>();
  const { setTheme } = useContext(ThemeContext);

  useEffect(() => {
    setTheme(TT_VARIABLES.backgrounds.profile);
  }, []);

  useEffect(() => {
    setDisplayedImage(auth?.user?.image ? auth?.user?.image : "default");
  }, [auth]);

  const userImage: ReactNode =
    !auth?.user || auth?.user?.image === "default" ? (
      <PersonCircle size={200} />
    ) : (
      <Image
        loader={() => displayedImage}
        unoptimized
        className="circleImage"
        draggable={false}
        src={displayedImage}
        width="400%"
        height="400%"
        layout="intrinsic"
        objectFit="cover"
        alt=""
      />
    );

  const closeSettings = () => {
    setSettingsOpen(false);
    auth.refetchUser();
  };

  const showToast = () => {
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 5000);
  };

  const SuccessToast: ReactNode = toastVisible &&
    toastMessage === "Success" && (
      <Toast role="alert" aria-live="assertive" aria-atomic="true">
        <ToastHeader>Password Change Successful!</ToastHeader>
        <ToastBody>You have successfully changed your password.</ToastBody>
      </Toast>
    );

  const ErrorToast: ReactNode = toastVisible && toastMessage === "Error" && (
    <Toast role="alert" aria-live="assertive" aria-atomic="true">
      <ToastHeader>Something went wrong!</ToastHeader>
      <ToastBody>
        Something went wrong during the change of your password. Please try
        again later. In the meantime, you can still use your old one to login.
      </ToastBody>
    </Toast>
  );

  const Settings: ReactNode = settingsOpen && auth.user && (
    <ProfileSettings
      user={auth.user}
      close={closeSettings}
      showToast={showToast}
      setToastMessage={(message: string) => setToastMessage(message)}
    />
  );

  return (
    <ProfilePageContainer>
      {Settings}
      <ContentContainer>
        <Headline>Welcome back, {auth?.user?.name}.</Headline>
        <ImageContainer>{userImage}</ImageContainer>
        <LinkContainer>
          <StyledLink
            onClick={() => {
              router.push("/likes");
            }}
          >
            <CustomHeadline>Likes</CustomHeadline>
          </StyledLink>
          <StyledLink
            onClick={() => {
              router.push("/tex");
            }}
          >
            <CustomHeadline>Your Tex</CustomHeadline>
          </StyledLink>
          <StyledLink onClick={() => setSettingsOpen(true)}>
            <CustomHeadline>Settings</CustomHeadline>
          </StyledLink>
        </LinkContainer>
      </ContentContainer>
      <ToastContainer>
        {SuccessToast}
        {ErrorToast}
      </ToastContainer>
    </ProfilePageContainer>
  );
};

export default ProfilePage;
