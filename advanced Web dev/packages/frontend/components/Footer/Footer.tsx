import { BrandNameContainer, FooterContainer, MobileView, WebView } from "./styles"
import { ReactNode } from "react";

import { Navigation } from "../Header/Navigation/Navigation";
import { IconElements } from "./IconElements/IconElements";

export const Footer: React.FC = () => {

    const isSignedin = true;

    const WebFooter: ReactNode = (
        <WebView>
            <BrandNameContainer>
                TeXus &copy; 2021
            </BrandNameContainer>
            <Navigation titles={[
                    "Contact us",
                    "About us",
                ]}/>
        </WebView>

    );

    const MobileFooter: ReactNode = (
        <MobileView>
            <IconElements/>
        </MobileView>
    );


    return (
        <FooterContainer>
            {WebFooter}
            {isSignedin && MobileFooter}
        </FooterContainer>
    )
}