import {
  DataTabContainer,
  DataSheet,
  DataSheetEntry,
  VariantsHeader,
} from "./styles";
import { ReactNode, useState } from "react";
import {
  CustomDropdown,
  Element,
} from "../../common/CustomDropdown/CustomDropdown";
import { DetailedProduct } from "../../../types/DetailedProduct";
import { Attribute } from "../../../types/Attribute";

export interface DataTabInterface {
  product: DetailedProduct;
}

export const DataTab: React.FC<DataTabInterface> = ({ product }) => {
  const [displayedAttribues, setDisplayedAttribtues] = useState<Attribute[]>(
    product.attributes
  );
  const [displayedPrice, setDisplayedPrice] = useState<number>(product.price);

  const ProductPrice: ReactNode = (
    <DataSheet>
      <DataSheetEntry>Price</DataSheetEntry>
      <DataSheetEntry>{displayedPrice} €</DataSheetEntry>
    </DataSheet>
  );
  const ProductDetails: ReactNode =
    displayedAttribues &&
    displayedAttribues.map((element: Attribute, key: number) => {
      return (
        <DataSheet key={key}>
          <DataSheetEntry>{element.name}</DataSheetEntry>
          <DataSheetEntry>{element.description}</DataSheetEntry>
        </DataSheet>
      );
    });

  const filterVariantAttributes = (attributes: Attribute[]): Attribute[] => {
    let newArray: Attribute[] = [...product.attributes];
    attributes.forEach((element) => {
      newArray = newArray.filter(
        (attribute) => attribute.name !== element.name
      );
    });
    return newArray;
  };

  const onVariantClicked = (index: number) => {
    let newAttributes: Attribute[] = [];
    if (index === 0 && displayedAttribues !== product.attributes) {
      newAttributes = [...product.attributes];
      setDisplayedAttribtues(newAttributes);
      setDisplayedPrice(product.price);
    } else if (product.variants) {
      newAttributes = product.variants[index - 1].attributes.concat(
        filterVariantAttributes(product.variants[index - 1].attributes)
      );
      setDisplayedAttribtues(newAttributes);
      setDisplayedPrice(product.variants[index - 1].price);
    }
  };

  const createDropdownElements = () => {
    const elements: Element[] = [];

    product.variants?.forEach((variant) => {
      if (product.variants !== undefined) {
        elements.push({
          displayedTitle: variant.name,
          index: product.variants.indexOf(variant) + 1,
          onElementClicked: onVariantClicked,
        });
      }
    });
    const array: Element[] = [
      {
        displayedTitle: product.name,
        index: 0,
        onElementClicked: onVariantClicked,
      },
    ];
    return array.concat(elements);
  };

  return (
    <DataTabContainer>
      <VariantsHeader>
        <p>Variant:</p>
        <CustomDropdown elements={createDropdownElements()} />
      </VariantsHeader>
      <h3>Data Sheet</h3>
      {ProductPrice}
      {ProductDetails}
    </DataTabContainer>
  );
};
