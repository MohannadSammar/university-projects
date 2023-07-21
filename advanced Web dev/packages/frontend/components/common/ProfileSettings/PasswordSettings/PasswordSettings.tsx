import {
  BodyHeadline,
  CustomButton,
  CustomForm,
  PasswordSettingsContainer,
} from "./styles";
import { FormGroup, FormLabel, FormControl } from "react-bootstrap";
import api from "../../../../config";
import { useState } from "react";

export interface PasswordSettingsInterface {
  showToast: () => void;
  setToastMessage: (message: string) => void;
}

export const PasswordSettings: React.FC<PasswordSettingsInterface> = ({
  showToast,
  setToastMessage,
}) => {
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState<string>("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const reqBody = api.api.base_url + `/updatePassword`;
    fetch(reqBody, {
      headers: { "content-type": "application/json" },
      method: "PATCH",
      credentials: "include",
      body: JSON.stringify({
        password: oldPassword,
        newPassword: newPassword,
        newPasswordConfirm: newPasswordConfirm,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "bad_request") setToastMessage("Error");
        else setToastMessage("Success");
        showToast();
      });
  };

  return (
    <>
      <PasswordSettingsContainer>
        <BodyHeadline>Change my password</BodyHeadline>
        <CustomForm onSubmit={onSubmit}>
          <FormGroup>
            <FormLabel>old password</FormLabel>
            <FormControl
              type="password"
              placeholder="*****"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setOldPassword(e.target.value)
              }
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>new password</FormLabel>
            <FormControl
              type="password"
              placeholder="*****"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewPassword(e.target.value)
              }
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>confirm new password</FormLabel>
            <FormControl
              type="password"
              placeholder="*****"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewPasswordConfirm(e.target.value)
              }
            />
          </FormGroup>
          <CustomButton variant="dark" type="submit">
            Submit Password
          </CustomButton>
        </CustomForm>
      </PasswordSettingsContainer>
    </>
  );
};
