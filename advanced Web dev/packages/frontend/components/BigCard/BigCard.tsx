import {
  CardContainer,
  BodyContainer,
  HeaderContainer,
  TitleContainer,
  HeadlineAndRatingContainer,
  HeadlineContainer,
  ImageContainer,
  LikeAndPriceContainer,
  LikeContainer,
  DetailsButton,
  SubHeaderContainer,
  HeartContainer,
} from "./styles";
import Image from "next/image";
import { Rating } from "react-simple-star-rating";
import { HandThumbsUp } from "react-bootstrap-icons";
import { BigCardProduct } from "../../types/BigCardProduct";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import Logo from "../../public/Logo.svg";
import { Heart, HeartFill } from "react-bootstrap-icons";
export interface BigCardInterface {
  product: BigCardProduct;
  spawnDetails: (product: BigCardProduct) => void;
  removeLike?: (id: string, signal: string) => void;
  disLiked?: boolean;
}

export const BigCard: React.FC<BigCardInterface> = ({
  product,
  spawnDetails,
  removeLike,
  disLiked,
}) => {
  const router = useRouter();
  const [src, setSrc] = useState<string>(Logo);

  useEffect(() => {
    if (product) {
      product.image ? setSrc(product.image) : " ";
    }
  }, [product?.image, product]);

  const redirectToTexPage = () => {
    router.push({
      pathname: "/upload_tex",
      query: {
        productId: product.id,
        upload: true,
      },
    });
  };
  const DislikeHeart: ReactNode = removeLike && (
    <HeartContainer>
      {disLiked ? (
        <Heart onClick={() => removeLike(product.id, "LIKE")}></Heart>
      ) : (
        <HeartFill
          onClick={() => removeLike(product.id, "DISLIKE")}
        ></HeartFill>
      )}
    </HeartContainer>
  );

  return (
    <CardContainer>
      <BodyContainer>
        <HeaderContainer>
          <TitleContainer>
            <HeadlineAndRatingContainer>
              <HeadlineContainer>
                <h4>
                  <b>{product.name}</b>
                </h4>
              </HeadlineContainer>
              <Rating
                ratingValue={product.rating * 20}
                readonly={true}
                size={26}
                style={{ margin: "20px" }}
              />
            </HeadlineAndRatingContainer>
            <SubHeaderContainer>
              <p>{product.manufacturer}</p>
              <p className="redirect" onClick={redirectToTexPage}>
                TeX this product!
              </p>
            </SubHeaderContainer>
          </TitleContainer>
        </HeaderContainer>
        <ImageContainer>
          <Image
            loader={() => src}
            unoptimized
            draggable={false}
            src={src}
            width="100%"
            height="100%"
            layout="responsive"
            objectFit="scale-down"
            alt=""
          />
        </ImageContainer>
        <LikeAndPriceContainer>
          <LikeContainer>
            <h4>{product.likes ? product.likes : 0}</h4>
            <HandThumbsUp size={35} />
          </LikeContainer>
          ´<p>{product.price} €</p>
        </LikeAndPriceContainer>
        <DetailsButton
          size={35}
          onClick={() => spawnDetails(product)}
          onTouchStart={() => spawnDetails(product)}
        />
      </BodyContainer>
      {DislikeHeart}
    </CardContainer>
  );
};
