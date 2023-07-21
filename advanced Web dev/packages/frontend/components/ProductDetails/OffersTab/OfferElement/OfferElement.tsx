import Image from "next/image";
import { GridItemContainer, OfferElementContainer } from './styles';
import { CustomButton } from "./styles";
import { Offer } from "../../../../types/Offer";

export interface OfferElementInterface {
    offer: Offer
}

export const OfferElement: React.FC<OfferElementInterface> = ({
    offer
}) => {    

    return(
        <OfferElementContainer>
            <GridItemContainer>
                <p className="title">{offer.name}</p>
            </GridItemContainer>
            <Image 
                    loader={() => "https://logosmarken.com/wp-content/uploads/2020/11/eBay-Logo.png"}
                    unoptimized
                    src={"https://logosmarken.com/wp-content/uploads/2020/11/eBay-Logo.png"}
                    width= "100%"
                    height = "100%"
                    layout="responsive" 
                    objectFit="scale-down" 
                    alt="" 
                />
            <GridItemContainer>
                <h3>Price: {offer.price} €</h3>
            </GridItemContainer>
            <GridItemContainer>
                <CustomButton variant="warning" href={offer.link} target="_blank"><p>go to offer!</p></CustomButton>
            </GridItemContainer>
        </OfferElementContainer>
    );
}