import { useState } from "react";
import Open from "../../../public/Open.png";
import Close from "../../../public/Close.png";
import Image from "next/dist/client/image";
import {
  FAQContainer,
  TextContainer,
  OpenClose,
  Question,
  BodyText,
} from "./styles";
import { TT_VARIABLES } from "../../../styles/globalVariables";

export type FAQProps = {
  question: string;
  answer: string;
};

export const FAQEntry = (props: FAQProps) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <FAQContainer open={open}>
      <OpenClose onClick={() => setOpen(!open)}>
        <Image
          unoptimized
          src={open ? Close : Open}
          height="18px"
          width="18px"
          alt="ButtonIcon"
        />
      </OpenClose>
      <TextContainer>
        <Question>{props.question}</Question>
        {open && (
          <BodyText color={TT_VARIABLES.colors.darkGrey}>
            {props.answer}
          </BodyText>
        )}
      </TextContainer>
    </FAQContainer>
  );
};
