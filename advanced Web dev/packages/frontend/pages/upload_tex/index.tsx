import { NextPage } from "next";
import { ReactNode, useEffect, useState } from "react";
import { SearchBarItem } from "../../components/common/SearchBar/SearchBarElement";
import useDebounce from "../../hooks/useDebounce";
import { SmallCardProduct } from "../../types/SmallCardProduct";
import { TexTitle } from "../../styles/tex/styles";
import api from "../../config";
import { SmallCardsContainer } from "../../components/common/SmallCardContainer/SmallCardContainer";
import { useRouter } from "next/router";
import { Backdrop } from "../../components/common/Backdrop/style";
import {
  UploadCardContainer,
  SearchBarContainer,
} from "../../styles/upload_tex/styles";
import { UploadContainer } from "../../components/UploadContainer/UploadContainer";
import { Review } from "../../types/Review";

const TexUploadPage: NextPage = () => {
  const router = useRouter();
  const [clickedProduct, setClickedProduct] = useState<SmallCardProduct>(
    {} as SmallCardProduct
  );
  const [newReview] = useState<Review>({} as Review);
  const { productId, upload } = router.query;
  const [keyword, setKeyword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [searchResults, setSearchResults] = useState<SmallCardProduct[]>([]);

  useEffect(() => {
    upload ? fetchProductToUpload() : "";
  }, [upload]);

  useDebounce(
    () => {
      fetchProductsByText(keyword);
    },
    [keyword],
    500
  );

  const fetchProductToUpload = async () => {
    const reqBody = api.api.base_url + `/products/${productId}`;
    fetch(reqBody, {
      method: "GET",
      headers: { "content-type": "application/json" },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setClickedProduct(data.product);
        setLoading(false);
      });
  };

  const fetchProductsByText = async (text: string) => {
    if (text === "" || text === null) {
      setSearchResults([]);
      return;
    }
    const reqBody = api.api.base_url + `/products/search/${text}`;
    fetch(reqBody, {
      headers: { "content-type": "application/json" },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        const products: SmallCardProduct[] = [];
        data.products.forEach((product: SmallCardProduct) => {
          products.push(product);
        });
        setSearchResults(products);
      });
  };
  const preview: ReactNode = searchResults && searchResults.length > 0 && (
    <SmallCardsContainer upload={true} products={searchResults} />
  );
  const ShowUpload: ReactNode = clickedProduct &&
    newReview &&
    upload &&
    !loading && (
      <Backdrop>
        <UploadCardContainer>
          <UploadContainer product={clickedProduct} review={newReview} />
        </UploadCardContainer>
      </Backdrop>
    );
  return (
    <>
      {ShowUpload}
      <SearchBarContainer>
        <TexTitle>Write a Tex</TexTitle>
        <SearchBarItem
          Textplaceholder="Search..."
          value={keyword}
          onChange={(data: React.ChangeEvent<HTMLInputElement>) =>
            setKeyword(data.target.value)
          }
        />
        {preview}
      </SearchBarContainer>
    </>
  );
};

export default TexUploadPage;
