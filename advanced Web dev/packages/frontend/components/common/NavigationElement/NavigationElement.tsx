import { useRouter } from "next/router";
import { Nav, NavElementContainer } from "./styles";

export interface NavigationElementProps {
    title: string;
    path: string;
}

export const NavigationElement: React.FC<NavigationElementProps> = ({
    title,
    path
}) => {
    const router = useRouter();

    const navigate = (e: React.MouseEvent) => {
        e.preventDefault();
        router.push(path.toLocaleLowerCase().replace(/\s/g, "_"));
    }

    return(
        <NavElementContainer href={path.toLocaleLowerCase().replace(/\s/g, "_")}  onClick={navigate}>
            <Nav>{ title }</Nav>
        </NavElementContainer>
    );
}