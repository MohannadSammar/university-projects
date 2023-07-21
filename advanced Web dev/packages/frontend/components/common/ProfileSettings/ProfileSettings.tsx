import {
  AvatarContainer,
  FlexContainer,
  HeaderContainer,
  SettingsContainer,
  UploadImageContainer,
  FlexForm,
  ComponentWrapper,
} from "./styles";
import { CloseButton } from "../../ProductDetails/styles";
import { User } from "../../../types/User";
import { TT_VARIABLES } from "../../../styles/globalVariables";
import { ReactNode, useState } from "react";
import Image from "next/image";
import { PersonCircle } from "react-bootstrap-icons";
import DefaultAvatar from "../../../public/defaultAvatar.svg";
import api from "../../../config";
import { Button, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { PasswordSettings } from "./PasswordSettings/PasswordSettings";

export interface ProfileSettingsInterface {
  user: User;
  close: () => void;
  showToast: () => void;
  setToastMessage: (message: string) => void;
}

export const ProfileSettings: React.FC<ProfileSettingsInterface> = ({
  user,
  close,
  showToast,
  setToastMessage,
}) => {
  const [uploadedImage, setUploadedImage] = useState<any>();
  const [previewImage, setPreviewImage] = useState<string>(
    user.image ? user.image : DefaultAvatar
  );
  const [newUserName, setNewUserName] = useState<string>(user.name);

  const onChangeImage = (e: any) => {
    if (e.target.files[0]) {
      const file: any[] = [...e.target.files];
      if (file[0]) {
        setUploadedImage(file[0]);
        setPreviewImage(URL.createObjectURL(file[0]));
      }
    }
  };

  const updateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const reqBody = api.api.base_url + `/me/`;
    const formData = new FormData();
    formData.append("image", uploadedImage);
    formData.append("name", newUserName);
    fetch(reqBody, {
      method: "PATCH",
      credentials: "include",
      body: formData,
    })
      .then((response) => response.json())
      .then(() => {
        close();
      });
  };

  const userImage: ReactNode =
    previewImage === "default" ? (
      <PersonCircle size={150} color="white" />
    ) : (
      <Image
        loader={() => previewImage}
        draggable={false}
        src={previewImage}
        width="200%"
        height="200%"
        layout="intrinsic"
        objectFit="cover"
        alt=""
      />
    );

  return (
    <ComponentWrapper>
      <SettingsContainer>
        <HeaderContainer>
          <h3>Profile Settings</h3>
          <CloseButton
            size={28}
            onClick={close}
            color={TT_VARIABLES.colors.red}
          />
        </HeaderContainer>
        <FlexForm onSubmit={updateUser}>
          <UploadImageContainer>
            <input
              onChange={onChangeImage}
              type="file"
              id="uploadedAvatar"
              name="avatar"
              accept="image/png, image/jpeg"
              hidden
            />
            <label htmlFor={"uploadedAvatar"}>
              <AvatarContainer>{userImage}</AvatarContainer>
            </label>
          </UploadImageContainer>
          <FlexContainer>
            <FormGroup>
              <FormLabel>Change your Name</FormLabel>
              <FormControl
                type="text"
                placeholder={user.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewUserName(e.target.value)
                }
              />
            </FormGroup>
            <Button variant="dark" type="submit">
              Submit
            </Button>
          </FlexContainer>
        </FlexForm>
        <PasswordSettings
          showToast={() => showToast()}
          setToastMessage={(message: string) => setToastMessage(message)}
        />
      </SettingsContainer>
    </ComponentWrapper>
  );
};
