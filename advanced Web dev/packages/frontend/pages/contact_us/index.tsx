import { useContext, useEffect } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { TT_VARIABLES } from "../../styles/globalVariables";
import { BodyText, Headline } from "../../styles/about_us/styles";
import { ContactUsContainer } from "../../styles/contact_us/styles";

const ContactUsPage: React.FC = () => {

    const {setTheme} = useContext(ThemeContext);

    useEffect(() => {
        setTheme(TT_VARIABLES.backgrounds.contact);
    }, [])
    
    return (
        <ContactUsContainer>
            <Headline>Contact us</Headline>
            <BodyText>Feel free to contact us via <BodyText bold>Hochschule Darmstadt</BodyText></BodyText>
            <BodyText>Schöfferstraße 3</BodyText>
            <BodyText>64295 Darmstadt</BodyText>
            <BodyText>Tel: +496151 1602</BodyText>
            <BodyText>Tell them you want to speak with <b>Ilias</b>, the Face of our organisation.</BodyText>
            <BodyText>He will either help you out, or simply just not react at all. Like you we also never knew.</BodyText>
            <BodyText bold>Good luck fellow tech friend.</BodyText>
        </ContactUsContainer>
    );
}

export default ContactUsPage;