import Image from "next/image";
import {
  BrandName,
  HorizontalLine,
  ImageContainer,
  ImageStarConatiner,
  ProductName,
  SmallCardElement,
  StarContainer,
  TextContainer,
} from "./style";
import { Rating } from "react-simple-star-rating";
import { useRouter } from "next/router";
import { SmallCardProduct } from "../../types/SmallCardProduct";
import { useEffect, useState } from "react";
import Logo from "../../public/Logo.svg";

export interface ProductData {
  product: SmallCardProduct;
  tex?: boolean;
  liked?: boolean;
  upload?: boolean;
}

export const SmallCard: React.FC<ProductData> = ({
  product,
  tex,
  liked,
  upload,
}) => {
  const [image, setImage] = useState<string>(Logo);

  useEffect(() => {
    if (product) {
      product.image ? setImage(product.image) : " ";
    }
  }, [product?.image, product]);

  const router = useRouter();

  const onClick =
    tex && !upload && !liked
      ? () => editProduct()
      : upload && !tex && !liked
      ? () => uploadTex()
      : liked && !tex && !upload
      ? () => likeView()
      : () => showBigCard();

  const showBigCard = () => {
    router.push({
      pathname: "/swipe",
      query: {
        productId: product.id,
        categoryId: undefined,
      },
    });
  };

  const likeView = () => {
    router.push({
      pathname: "/likes",
      query: {
        productId: product.id,
        showCards: true,
      },
    });
  };
  const editProduct = () => {
    router.push({
      pathname: "/tex",
      query: {
        productId: product.id,
        isReview: true,
      },
    });
  };

  const uploadTex = () => {
    router.push({
      pathname: "/upload_tex",
      query: {
        productId: product.id,
        upload: true,
      },
    });
  };
  return (
    <SmallCardElement onClick={onClick}>
      <ImageStarConatiner>
        <ImageContainer>
          <Image
            loader={() => image}
            unoptimized
            src={image}
            width="100%"
            height="100%"
            layout="fixed"
            objectFit="cover"
            alt=""
          />
        </ImageContainer>
        <StarContainer>
          <Rating ratingValue={product.rating * 20} readonly={true} size={20} />
        </StarContainer>
      </ImageStarConatiner>
      <TextContainer>
        <ProductName>{product.name}</ProductName>
        <HorizontalLine />
        <BrandName>{product.manufacturer}</BrandName>
      </TextContainer>
    </SmallCardElement>
  );
};
