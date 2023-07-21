import Image from "next/image";
import { useState } from "react";
import { CircleImageContainer } from "./styles";
import DefaultAvatar from "../../../public/defaultAvatar.svg";

export interface CircleImageInterface {
  image?: string;
}

export const CircleImage: React.FC<CircleImageInterface> = ({ image }) => {
  const [avatarImage] = useState<string>(
    image
      ? image === "" || image === "default"
        ? DefaultAvatar
        : image
      : DefaultAvatar
  );

  return (
    <CircleImageContainer>
      <Image
        loader={() => avatarImage}
        unoptimized
        draggable={false}
        src={avatarImage}
        width="100%"
        height="100%"
        layout="responsive"
        objectFit="cover"
        alt=""
      />
    </CircleImageContainer>
  );
};
