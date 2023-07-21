import DropdownItem from "react-bootstrap/DropdownItem";
import { ReactNode, useState } from "react";
import { CustomDropdownButton } from "./styles";

export interface CustomDropDownInterface {
    elements: Element[];
}

export interface Element {
    displayedTitle: string;
    index: number;
    onElementClicked?: (index: number) => void;
}

export const CustomDropdown: React.FC<CustomDropDownInterface> = ({
    elements
}) => {
    const [activeAtIndex, setActiveAtIndex] = useState<number>(0);

    const Elements: ReactNode = elements.map((element: Element, key: number) => {
        return(
            <DropdownItem key={key} eventKey={element.index} active={element.index === activeAtIndex}>
                {element.displayedTitle}
            </DropdownItem>
        );
    });

    const onSelect = (eventKey: string) => {
        setActiveAtIndex(parseInt(eventKey));
        const element: Element = elements[activeAtIndex];
        if(element.onElementClicked) element.onElementClicked(parseInt(eventKey));
    }

    return(
        <CustomDropdownButton variant="light" title={elements[activeAtIndex].displayedTitle} onSelect={onSelect}>
            {Elements}
        </CustomDropdownButton>
    );
}