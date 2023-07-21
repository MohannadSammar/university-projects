import { useRouter } from "next/router";
import {
  BodyContainer,
  Minus,
  MinusButton,
  Plus,
  PlusButton,
  ViewContainer,
} from "../../styles/swipe/styles";
import { BigCard } from "../../components/BigCard/BigCard";
import styled from "styled-components";
import { ReactNode, useContext, useEffect, useRef, useState } from "react";
import api from "../../config";
import TinderCard from "react-tinder-card";
import { BigCardProduct } from "../../types/BigCardProduct";
import { Loader } from "../../components/common/Loader/Loader";
import { ProductDetails } from "../../components/ProductDetails/ProductDetails";
import { TT_VARIABLES } from "../../styles/globalVariables";
import { ThemeContext } from "../../contexts/ThemeContext";

const ViewPage: React.FC = () => {
  const [products, setProducts] = useState<BigCardProduct[]>([]);
  const seed = useRef<number>(Math.floor(Math.random() * 101));

  const [noProductsLeft, setNoProductsleft] = useState<boolean>(false);
  const requestedTotalProcucts = useRef<number>(0);
  const isFetching = useRef<boolean>(true);

  const [detailedProduct, setDetailedProduct] = useState<BigCardProduct>();
  const [showOverlay, setShowOverlay] = useState<boolean>(false);

  const productRef = useRef<BigCardProduct[]>(products);
  productRef.current = products;

  const router = useRouter();
  const { productId, categoryId } = router.query;

  const { setTheme } = useContext(ThemeContext);

  useEffect(() => {
    setTheme(TT_VARIABLES.backgrounds.swipe);
    if (!router.isReady) return;
    fetchNewProducts();
  }, [router.isReady]);

  const fetchNewProducts = async () => {
    isFetching.current = true;
    const reqBody = api.api.base_url + `/products/cards`;
    fetch(reqBody, {
      method: "post",
      headers: { "content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        productId: productId,
        categoryId: categoryId,
        seed: seed.current,
        offset: requestedTotalProcucts.current,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        isFetching.current = false;
        if (data.products.length == 0) {
          setNoProductsleft(true);
          return;
        }
        requestedTotalProcucts.current += data.count;
        const newArray: BigCardProduct[] = [
          ...data.products.reverse(),
          ...productRef.current,
        ];
        setProducts(newArray);
      });
  };

  const eraseCurrentFromProducts = () => {
    const newArray: BigCardProduct[] = [...productRef.current];
    newArray.pop();
    setProducts(newArray);
    if (newArray.length < 3 && !isFetching.current) {
      fetchNewProducts();
    }
  };

  const likeProduct = async () => {
    const reqBody =
      api.api.base_url +
      `/products/${productRef.current[productRef.current.length - 1].id}/like`;
    fetch(reqBody, {
      headers: { "content-type": "application/json" },
      credentials: "include",
    });
  };

  const onCardLeftScreen = (direction: string) => {
    if (direction === "right") {
      likeProduct();
    }
    setShowOverlay(false);
    eraseCurrentFromProducts();
  };

  const spawnDetailsOverlay = (detailedProduct: BigCardProduct) => {
    setDetailedProduct(detailedProduct);
    setShowOverlay(!showOverlay);
  };

  const BigCards: ReactNode =
    products &&
    products.length > 0 &&
    products.map((product) => {
      const Card: ReactNode = product && product !== undefined && (
        <BigCard product={product} spawnDetails={spawnDetailsOverlay} />
      );

      return (
        <StyledTinderCard
          preventSwipe={["up", "down"]}
          key={product.id}
          onCardLeftScreen={onCardLeftScreen}
        >
          {Card}
        </StyledTinderCard>
      );
    });

  const Details: ReactNode = showOverlay && detailedProduct && (
    <ProductDetails
      product={detailedProduct}
      closeOverlay={() => setShowOverlay(false)}
    />
  );

  const NoCardsLeft: ReactNode = noProductsLeft && !products.length && (
    <h2 style={{ color: "white" }}>thats all we got!</h2>
  );

  const ShowLoader: ReactNode =
    !products.length && isFetching.current ? <Loader /> : null;

  return (
    <ViewContainer>
      {Details}
      <BodyContainer>
        <Minus>
          <MinusButton size={80} />
        </Minus>
        {ShowLoader}
        {BigCards}
        {NoCardsLeft}
        <Plus>
          <PlusButton size={80} />
        </Plus>
      </BodyContainer>
    </ViewContainer>
  );
};

const StyledTinderCard = styled(TinderCard)`
  position: absolute;
`;

export default ViewPage;
