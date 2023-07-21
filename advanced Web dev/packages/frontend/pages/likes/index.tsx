import { NextPage } from "next";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import { BigCard } from "../../components/BigCard/BigCard";
import { SmallCardsContainer } from "../../components/common/SmallCardContainer/SmallCardContainer";
import api from "../../config";
import { BigCardProduct } from "../../types/BigCardProduct";
import { SmallCardProduct } from "../../types/SmallCardProduct";
import {
  RightContainer,
  LeftContainer,
  LikedContainer,
  MainContainer,
} from "../../styles/likes/_styles";
import styled from "styled-components";
import { CaretLeft, CaretRight } from "react-bootstrap-icons";
import { ProductDetails } from "../../components/ProductDetails/ProductDetails";
import { ViewContainer } from "../../styles/swipe/styles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FunctionButton } from "../../components/common/FunctionButton/FunctionButton";
import { TT_VARIABLES } from "../../styles/globalVariables";
import { AbsoluteContainer } from "../../components/common/AbosolouteContainer/styled";
interface SmallAndBig {
  card: SmallCardProduct;
  index: number;
}
const LikesPage: NextPage = () => {
  const router = useRouter();
  const { productId, showCards } = router.query;
  const [likedSmallProducts, setLikedsmallProducts] = useState<
    SmallCardProduct[]
  >([]);
  const [currentIndex, setCurrentIndex] = useState<number>();
  const [smallAndBig, setsmallAndBig] = useState<SmallAndBig[]>([]);
  const [bigCardToRender, setBigCardToRender] = useState<BigCardProduct>(
    {} as BigCardProduct
  );
  const [detailedProduct, setDetailedProduct] = useState<BigCardProduct>();
  const [showOverlay, setShowOverlay] = useState<boolean>(false);
  const [gotDisliked, setGotDisliked] = useState<boolean>(false);

  useEffect(() => {
    fetchLikedProducts();
    setGotDisliked(false);
  }, [router.asPath]);

  useEffect(() => {
    if (productId) {
      showCards ? fetchBigCardDetails(productId as string) : "";
      findCorrectIndex(productId as string);
    }
  }, [showCards]);
  const fetchLikedProducts = () => {
    const reqBody = api.api.base_url + `/me/likes`;
    fetch(reqBody, {
      method: "GET",
      headers: { "content-type": "application/json" },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        let tmp: SmallAndBig = {} as SmallAndBig;
        const tmpSAB: SmallAndBig[] = [];
        data.products.forEach((element: SmallCardProduct, key: number) => {
          tmp = {} as SmallAndBig;
          tmp.card = element;
          tmp.index = key;
          tmpSAB.push(tmp);
        });
        setsmallAndBig(tmpSAB);

        setLikedsmallProducts(data.products);
      });
  };
  const fetchBigCardDetails = (id: string) => {
    const reqBody = api.api.base_url + `/products/${id}`;
    fetch(reqBody, {
      method: "GET",
      headers: { "content-type": "application/json" },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        const tmp: BigCardProduct = {} as BigCardProduct;
        tmp.categoryId = data.product.category;
        tmp.id = data.product.id;
        tmp.image = data.product.image;
        tmp.likes = data.product.likes;
        tmp.manufacturer = data.product.manufacturer;
        tmp.name = data.product.name;
        tmp.price = data.product.price;
        tmp.rating = data.product.rating;
        setBigCardToRender(tmp);
      });
  };

  const findCorrectIndex = (id: string) => {
    setCurrentIndex(
      smallAndBig.findIndex((card) => {
        return card.card.id === id;
      })
    );
  };
  /*eslint-disable */
  const leftClick = () => {
    if (smallAndBig.length > 1) {
      if (currentIndex == 0) {
        if (
          smallAndBig.at(smallAndBig.length - 1) !== undefined &&
          smallAndBig !== undefined
        ) {
          fetchBigCardDetails(smallAndBig.at(smallAndBig.length - 1)!.card.id);
          findCorrectIndex(smallAndBig.at(smallAndBig.length - 1)!.card.id);
        }
      } else {
        fetchBigCardDetails(smallAndBig.at(currentIndex! - 1)!.card.id);
        findCorrectIndex(smallAndBig.at(currentIndex! - 1)!.card.id);
      }
      fetchLikedProducts();
      setGotDisliked(false);
      setShowOverlay(false);
    } else {
      toast("You dont have any other likes !");
    }
  };
  const rightClick = () => {
    if (smallAndBig.length > 1) {
      if (currentIndex == smallAndBig.length - 1) {
        fetchBigCardDetails(smallAndBig.at(0)!.card.id);
        findCorrectIndex(smallAndBig.at(0)!.card.id);
      } else {
        fetchBigCardDetails(smallAndBig.at(currentIndex! + 1)!.card.id);
        findCorrectIndex(smallAndBig.at(currentIndex! + 1)!.card.id);
      }
      fetchLikedProducts();
      setGotDisliked(false);
      setShowOverlay(false);
    } else {
      toast("You dont have any other likes !");
    }
  };
  /*eslint-enable */
  const handleSignal = (id: string, signal: string) => {
    if (signal === "DISLIKE") {
      onDislike(id);
    }
    if (signal === "LIKE") {
      relikeProduct(id);
    }
  };
  const onDislike = (id: string) => {
    const reqBody = api.api.base_url + `/products/${id}/dislike`;
    fetch(reqBody, {
      method: "get",
      headers: { "content-type": "application/json" },
      credentials: "include",
    }).then(() => {
      toast("Like Removed");
      setGotDisliked(true);
    });
  };
  const relikeProduct = async (id: string) => {
    const reqBody = api.api.base_url + `/products/${id}/like`;
    fetch(reqBody, {
      headers: { "content-type": "application/json" },
      credentials: "include",
    })
      .then((response) => response.json())
      .then(() => {
        setGotDisliked(false);
        toast("Product Reliked");
      });
  };
  const spawnDetailsOverlay = () => {
    setDetailedProduct(bigCardToRender);
    setShowOverlay(!showOverlay);
  };
  const BigCards: ReactNode = showCards && (
    <BigCardContainer>
      <LeftContainer showOverlay={showOverlay} onClick={leftClick}>
        <CaretLeft />
      </LeftContainer>
      <BigCard
        disLiked={gotDisliked}
        removeLike={(ID, signal) => handleSignal(ID, signal)}
        product={bigCardToRender}
        spawnDetails={spawnDetailsOverlay}
      />
      <RightContainer showOverlay={showOverlay} onClick={rightClick}>
        <CaretRight />
      </RightContainer>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
    </BigCardContainer>
  );

  const noLikes: ReactNode = likedSmallProducts.length == 0 && (
    <AbsoluteContainer width="100%" bottom="50%">
      <BtnContainer>
        <NoLikesMsg>Seems Like You Got No Likes ! </NoLikesMsg>
        <FunctionButton
          width="250px"
          label="start swiping!"
          action={() => router.push("/swipe")}
          textColor={TT_VARIABLES.colors.red}
          backgroundColor={TT_VARIABLES.colors.white}
        />
      </BtnContainer>
    </AbsoluteContainer>
  );
  const LikedElements: ReactNode = !showCards && (
    <MainContainer>
      {noLikes}
      <LikedContainer>
        <SmallCardsContainer liked={true} products={likedSmallProducts} />
      </LikedContainer>
    </MainContainer>
  );

  const Details: ReactNode = showOverlay && detailedProduct && (
    <ProductDetails
      product={detailedProduct}
      closeOverlay={() => setShowOverlay(false)}
    />
  );

  const BigCardAndDetails: ReactNode = showCards && (
    <ViewContainer>
      {Details}
      {BigCards}
    </ViewContainer>
  );

  return (
    <>
      {LikedElements}
      {BigCardAndDetails}
    </>
  );
};

const BigCardContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const BtnContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const NoLikesMsg = styled.p`
  font-size: 2rem;
  font-weight: 700;
  color: ${TT_VARIABLES.colors.white};
  margin-bottom: 25px;
`;
export default LikesPage;
