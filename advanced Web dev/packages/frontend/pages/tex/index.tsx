import { NextPage } from "next";
import { ReactNode, useContext, useEffect, useState } from "react";
import { SmallCardsContainer } from "../../components/common/SmallCardContainer/SmallCardContainer";
import { SmallCardProduct } from "../../types/SmallCardProduct";
import api from "../../config";
import { SearchBarContainer } from "../../styles/search/styles";
import { SearchBarItem } from "../../components/common/SearchBar/SearchBarElement";
import {
  ReviewCardContainer,
  TexContainer,
  TexPageContainer,
  TexTitle,
} from "../../styles/tex/styles";
import { FunctionButton } from "../../components/common/FunctionButton/FunctionButton";
import { AbsoluteContainer } from "../../components/common/AbosolouteContainer/styled";
import { useRouter } from "next/router";
import { Backdrop } from "../../components/common/Backdrop/style";
import { Review } from "../../types/Review";
import { ReviewTexContainer } from "../../components/common/ReviewTexContainer/ReviewTexContainer";
import { TT_VARIABLES } from "../../styles/globalVariables";
import { ThemeContext } from "../../contexts/ThemeContext";
import useDebounce from "../../hooks/useDebounce";

const TexPage: NextPage = () => {
  const router = useRouter();
  const [reviews, setreviews] = useState<Review[]>([]);
  const [products, setProducts] = useState<SmallCardProduct[]>([]);
  const { productId, isReview } = router.query;
  const [productToReview, setProductToReview] = useState<Review>();
  const [reviewedProduct, setReviewedProduct] = useState<SmallCardProduct>();
  const [keyword, setKeyword] = useState<string>("");
  const [filteredReviewedProduct, setFilteredReviewedProduct] =
    useState<SmallCardProduct[]>();
  const { setTheme } = useContext(ThemeContext);

  useEffect(() => {
    isReview ? fetchReviewForProduct() : "";
  }, [isReview]);

  useEffect(() => {
    setTheme(TT_VARIABLES.backgrounds.index);
    setProducts([]);
    fetchProductsByUserId();
  }, []);

  useDebounce(
    () => {
      setProducts([]);
      fetchProductsByUserId();
    },
    [router.asPath],
    500
  );
  useDebounce(() => {
    filterProducts(keyword);
  }, [keyword]);
  const filterProducts = async (text: string) => {
    let tmp = products?.filter((product: SmallCardProduct) =>
      product.name.toLowerCase().includes(text.toLowerCase())
    );
    if (tmp.length === 0) {
      tmp = products?.filter((product: SmallCardProduct) =>
        product.manufacturer.toLowerCase().includes(text.toLowerCase())
      );
    }
    if (tmp) {
      setFilteredReviewedProduct(tmp);
    }
  };
  const fetchProductsByUserId = async () => {
    const reqBody = api.api.base_url + `/me/reviews`;
    fetch(reqBody, {
      method: "GET",
      headers: { "content-type": "application/json" },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.reviews.length > 0) {
          const products: SmallCardProduct[] = [];
          const review = data.reviews;
          review.forEach((element: Review) => {
            const tmpProduct = element.product;
            tmpProduct.rating = Number(element.rating);
            products.push(element.product);
          });
          setProducts(products);
          setreviews(review);
        }
      });
  };

  const fetchReviewForProduct = () => {
    const reqBody = api.api.base_url + `/products/${productId}`;
    fetch(reqBody, {
      method: "GET",
      headers: { "content-type": "application/json" },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setReviewedProduct(data.product);
      });
    const targetReview = reviews.filter(
      (element) => element.product.id === productId
    );
    setProductToReview(targetReview[0]);
  };

  const closeReview = () => {
    setProductToReview(undefined);
    router.push("/tex");
  };

  const ShowReview: ReactNode = isReview &&
    productToReview &&
    reviewedProduct && (
      <Backdrop>
        <ReviewCardContainer>
          <ReviewTexContainer
            product={reviewedProduct}
            onXPress={closeReview}
            review={productToReview}
          />
        </ReviewCardContainer>
      </Backdrop>
    );

  const writeReview = () => {
    router.push("/upload_tex");
  };

  return (
    <TexPageContainer>
      {ShowReview}
      <SearchBarContainer>
        <TexTitle>Reviewed Tex</TexTitle>
        <SearchBarItem
          Textplaceholder="Search..."
          value={keyword}
          onChange={(data: React.ChangeEvent<HTMLInputElement>) =>
            setKeyword(data.target.value)
          }
        />
      </SearchBarContainer>
      <TexContainer>
        {filteredReviewedProduct?.length ? (
          <SmallCardsContainer tex={true} products={filteredReviewedProduct} />
        ) : (
          <SmallCardsContainer tex={true} products={products} />
        )}
      </TexContainer>
      <AbsoluteContainer bottom={"75px"} left={"40%"} width={"25%"}>
        <FunctionButton
          width="100%"
          label="Write a Tex"
          action={() => {
            writeReview();
          }}
          backgroundColor="linear-gradient(268.63deg, #EC4343 0%, #FF9901 97.19%)"
        />
      </AbsoluteContainer>
    </TexPageContainer>
  );
};

export default TexPage;
