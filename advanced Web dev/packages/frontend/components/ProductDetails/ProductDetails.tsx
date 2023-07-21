import { ReactNode, useState, useEffect } from "react";
import {
  CloseButton,
  CloseTab,
  HeaderContainer,
  HeaderTab,
  ProductDetailsContainer,
} from "./styles";
import { BigCardProduct } from "../../types/BigCardProduct";
import { DetailedProduct } from "../../types/DetailedProduct";
import { DataTab } from "./DataTab/DataTab";
import { ReviewTab } from "./ReviewTab/ReviewTab";
import { OffersTab } from "./OffersTab/OffersTab";
import api from "../../config";
import { Loader } from "../common/Loader/Loader";

export interface ProductDetailsInterface {
  product: BigCardProduct;
  closeOverlay: () => void;
}

export const ProductDetails: React.FC<ProductDetailsInterface> = ({
  product,
  closeOverlay,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [productData, setProductData] = useState<DetailedProduct>();

  const getIfActive = (index: number): boolean => {
    return activeIndex === index;
  };
  const setActive = (index: number): void => {
    setActiveIndex(index);
  };

  useEffect(() => {
    fetchSingleProduct();
  }, []);

  const fetchSingleProduct = async () => {
    const reqBody = api.api.base_url + `/products/${product.id}`;
    fetch(reqBody, {
      headers: { "content-type": "application/json" },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setProductData(data.product);
      });
  };

  const Header: ReactNode = (
    <HeaderContainer>
      <HeaderTab active={getIfActive(0)} onClick={() => setActive(0)}>
        Data
      </HeaderTab>
      <HeaderTab active={getIfActive(1)} onClick={() => setActive(1)}>
        Reviews
      </HeaderTab>
      <HeaderTab active={getIfActive(2)} onClick={() => setActive(2)}>
        Offers
      </HeaderTab>
      <CloseTab>
        <CloseButton size={28} onClick={closeOverlay} />
      </CloseTab>
    </HeaderContainer>
  );

  const DataSection: ReactNode = activeIndex === 0 && productData && (
    <DataTab product={productData} />
  );

  const ReviewSection: ReactNode = activeIndex === 1 && productData && (
    <ReviewTab product={productData} />
  );

  const OffersSection: ReactNode = activeIndex === 2 && productData && (
    <OffersTab product={productData} />
  );

  const DisplayLoader: ReactNode = !productData && <Loader />;

  return (
    <ProductDetailsContainer>
      {Header}
      {DataSection}
      {ReviewSection}
      {OffersSection}
      {DisplayLoader}
    </ProductDetailsContainer>
  );
};
