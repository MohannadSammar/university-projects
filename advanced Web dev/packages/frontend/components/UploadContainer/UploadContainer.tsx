import { Check2Circle } from "react-bootstrap-icons";
import { Review } from "../../types/Review";
import {
  HeadlineAndRatingContainer,
  HeadlineContainer,
} from "../BigCard/styles";
import {
  Body,
  EditContainer,
  Head,
  ReviewIconContainer,
  ReviewTitleContainer,
} from "../common/ReviewTexContainer/style";
import { ReviewElement } from "../Review/ReviewElement";
import { CloseButton } from "../ProductDetails/styles";
import { CloseButtonContainer } from "./style";
import { useState } from "react";
import api from "../../config";
import { useRouter } from "next/router";
import { SmallCardProduct } from "../../types/SmallCardProduct";

interface UploadInterface {
  review: Review;
  product: SmallCardProduct;
}

export const UploadContainer: React.FC<UploadInterface> = ({
  review,
  product,
}) => {
  const router = useRouter();
  const createNewReview = async (newReview: Review) => {
    const reqBody = api.api.base_url + `/reviews`;
    const body = {
      title: newReview.title,
      text: newReview.text,
      rating: newReview.rating,
      productId: product.id,
      variantId: newReview.variant,
    };
    fetch(reqBody, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
      credentials: "include",
    }).then(() => {
      router.push("/tex");
    });
  };
  const [save, setSave] = useState<boolean>(false);
  return (
    <>
      <Head>
        <ReviewTitleContainer>
          <HeadlineAndRatingContainer>
            <HeadlineContainer>
              <h4>{product.name}</h4>
            </HeadlineContainer>
          </HeadlineAndRatingContainer>
          <p>{product.manufacturer}</p>
        </ReviewTitleContainer>
        <ReviewIconContainer>
          <EditContainer>
            <Check2Circle
              onClick={() => {
                setSave(!save);
              }}
              fill="green"
            />
          </EditContainer>
          <CloseButtonContainer
            onClick={() => {
              router.push("/upload_tex");
            }}
          >
            <CloseButton />
          </CloseButtonContainer>
        </ReviewIconContainer>
      </Head>
      <Body>
        <ReviewElement
          product={product}
          onUploadFinish={(newreview) => {
            createNewReview(newreview);
          }}
          save={save}
          review={review}
          editPress={true}
        />
      </Body>
    </>
  );
};
