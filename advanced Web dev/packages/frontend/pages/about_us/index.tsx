import { useContext, useEffect } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { TT_VARIABLES } from "../../styles/globalVariables";
import { 
    AboutUsContainer,
    Headline,
    Subheader,
    SecondaryHeadline,
    PageContentContainer,
    BodyText
 } from "../../styles/about_us/styles";

const AboutUsPage: React.FC = () => {

    const {setTheme} = useContext(ThemeContext);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        setTheme(TT_VARIABLES.backgrounds.about);
    },[] )
    

    return (
        <AboutUsContainer>
            <Headline>About us</Headline>
            <Subheader color="white">loving technology</Subheader>
            <PageContentContainer>
                <SecondaryHeadline >WHO WE ARE</SecondaryHeadline>
                <BodyText>This page was developed by us, 5 random guys doing a group project.</BodyText>
                <BodyText>If you like this page, please consider following us on <b>patreon</b></BodyText>
                <SecondaryHeadline >WHAT WE DO</SecondaryHeadline>
                <BodyText>We are all students from hochschule darmstadt and therefore have strong roots to the student community.</BodyText>
                <BodyText>Since we want to leave our project free to use, we are no longer asking for money. We are <b>we are DEMANDING IT.</b></BodyText>
                <BodyText>Do what is right.</BodyText>
            </PageContentContainer>
        </AboutUsContainer>
    );
}

export default AboutUsPage;