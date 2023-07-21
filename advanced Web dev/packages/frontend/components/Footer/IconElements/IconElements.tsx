import { Search, Heart } from "react-bootstrap-icons";
import Image from "next/image";
import { useRouter } from "next/router";
import Tx from "../../../public/Tx.svg";
import { IconContainer } from "./styles";
import { useEffect, useState } from "react";

export const IconElements = () => {
  const router = useRouter();
  const [icon, setIcon] = useState(Tx);
  useEffect(() => {
    setIcon(Tx);
  }, [Tx]);
  const SearchPage = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push("/search");
  };
  const TexPage = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push("/tex");
  };
  const LikePage = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push("/likes");
  };

  return (
    <>
      <IconContainer>
        <Search onClick={SearchPage} />
      </IconContainer>

      <IconContainer>
        <Heart onClick={LikePage} />
      </IconContainer>

      <IconContainer>
        <Image
          unoptimized
          loader={() => icon}
          src={icon}
          alt="Tex Logo"
          onClick={TexPage}
        />
      </IconContainer>
    </>
  );
};
