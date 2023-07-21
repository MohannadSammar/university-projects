import { ReactNode, useEffect } from "react";
import useOffers from "../../../hooks/useOffers";
import { DetailedProduct } from "../../../types/DetailedProduct";
import { Offer } from "../../../types/Offer";
import { CustomDropdown, Element } from "../../common/CustomDropdown/CustomDropdown";
import { Loader } from "../../common/Loader/Loader";
import { VariantsHeader } from "../DataTab/styles";
import { DataSheet } from "../ReviewTab/styles";
import { BodyText, LoadMoreLink } from "../ReviewTab/styles";
import { OfferElement } from "./OfferElement/OfferElement";
import { OfferTabContainer } from "./styles";

export interface OffersTabInterface {
    product: DetailedProduct;
}

export const OffersTab: React.FC<OffersTabInterface> = ({
    product
}) => {

    const {
        offers,
        isMore,
        isLoading,
        error,
        setActiveVariant,
        loadMore
    } = useOffers(product.id);

    useEffect(() => {
        setActiveVariant(null);
    }, []);

    const onVariantClicked = (index: number) => {
        let id = null;
        if(product.variants && product.variants[index - 1]?.id) {
            id = product.variants[index - 1].id;
        }
        setActiveVariant(id);
    }

    const createDropdownElements = () => {
        const elements: Element[] =  [];
        
        product.variants?.forEach(variant => {
            if(product.variants !== undefined){
                elements.push({
                    displayedTitle: variant.name,
                    index: product.variants.indexOf(variant) + 1,
                    onElementClicked: onVariantClicked
                })
            }
        });
        const array: Element[] = [{
            displayedTitle: product.name,
            index: 0,
            onElementClicked: onVariantClicked
        }]
        return array.concat(elements);
    }

    const Offers: ReactNode = offers && offers.map((offer: Offer, key: number) => {
        return <OfferElement offer={offer} key={key}/>
    });

    const LoadMore: ReactNode = isMore && !isLoading && !error && (
        <LoadMoreLink onClick={loadMore}>Load more offers</LoadMoreLink>
    );

    const NoMoreReviews: ReactNode = !isMore && !error &&(
        <BodyText>No more offers available!</BodyText>
    );

    const ErrorHappened: ReactNode = error &&(
        <BodyText>A error happened!</BodyText>
    );

    const Loading: ReactNode = isLoading && (
        <Loader/>
    );
    
    return(
        <OfferTabContainer>
            <VariantsHeader>
                <p>Variant:</p>
                <CustomDropdown elements={createDropdownElements()}/>
            </VariantsHeader>
            <h3>Offers</h3>
            <DataSheet>
                { Offers }
            </DataSheet>
            { Loading }
            { LoadMore }
            { NoMoreReviews }
            { ErrorHappened }
        </OfferTabContainer>
    );
}