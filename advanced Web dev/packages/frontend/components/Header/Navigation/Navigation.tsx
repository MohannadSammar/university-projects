import { NavContainer } from "./styles";
import { NavigationElement } from "../../common/NavigationElement/NavigationElement";
import { ReactNode } from "react";

interface NavigationProps {
    titles: string[];
}

export const Navigation: React.FC<NavigationProps> = ({
    titles
}) => {

    const NavRoutes: ReactNode = titles && titles.length >0 && titles.map((title, key) => {
        return <NavigationElement title={title} path={`/${title}`} key={key}/>
    });

    return(
        <NavContainer>
            { NavRoutes }
        </NavContainer>
    );
}
