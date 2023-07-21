import Image from "next/image";
import BackgroundImage from "../../../public/Background.png";
import { LinkButton } from "../LinkButton/LinkButton";
import { ButtonContainer, ImageContainer, NotPermittedContainer, NotPermittedHeadline } from "./styles";

export const NotPermitted: React.FC = () => {
    return(
        <div>
            <ImageContainer>
                <Image 
                src={BackgroundImage}
                alt="image"
                layout='fill'
                objectFit='cover'
                z-index="-2"/>
            </ImageContainer>

            <NotPermittedContainer>
                <NotPermittedHeadline>Not Permitted</NotPermittedHeadline>
                <ButtonContainer>
                    <LinkButton href="/login">Login</LinkButton>    
                    <LinkButton href="/">Startseite</LinkButton>
                </ButtonContainer>
            </NotPermittedContainer>
        </div>
    );
}