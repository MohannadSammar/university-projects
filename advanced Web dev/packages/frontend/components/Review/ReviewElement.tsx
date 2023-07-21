import { Review } from "../../types/Review";
import {
  AvatarContainer,
  BodyContainer,
  DefaultReviewWrapper,
  EditInput,
  RatingContainer,
  ReviewContainer,
  ReviewElementContainer,
  ReviewMetaData,
  ReviewStarContaier,
  ReviewTextArea,
  ReviewTitle,
  TitleContainer,
} from "./style";
import { Rating } from "react-simple-star-rating";
import { ChangeEvent, ReactNode, useContext, useEffect, useState } from "react";
import { CircleImage } from "../common/CircleImage/CircleImage";
import {
  ImageContainer,
  ReviewTextContainer,
  ReviewTitleContainer,
} from "./style";
import Image from "next/image";
import {
  CustomDropdown,
  Element,
} from "../common/CustomDropdown/CustomDropdown";
import Logo from "../../public/Logo.svg";
import { SmallCardProduct } from "../../types/SmallCardProduct";
import api from "../../config";
import { BodyText } from "../ProductDetails/ReviewTab/styles";
import { AuthContext } from "../../contexts/AuthContext";
interface ReviewElementInterface {
  review: Review;
  product?: SmallCardProduct;
  editPress?: boolean;
  onSavePress?: () => void;
  save?: boolean;
  undo?: boolean;
  onUploadFinish?: (review: Review) => void;
  tex?: boolean;
}
/*ToDo: still to implement the logic as needed. 
    [] Update the Review.
    [] figure out what Attributes and props i need and dont need 
    [] something something
    */

export const ReviewElement: React.FC<ReviewElementInterface> = ({
  editPress,
  review,
  save,
  undo,
  product,
  tex,
  onUploadFinish,
}) => {
  const auth = useContext(AuthContext);
  const [editableText, setEditableText] = useState<string>("");
  const [editableTitle, setEditableTitle] = useState<string>("");
  const [rating, setRating] = useState(0);
  const [src, setSrc] = useState<string>(Logo);
  const [variant, setVariant] = useState<string>();

  useEffect(() => {
    if (save) saveEditReview();
  }, [save]);

  useEffect(() => {
    if (product) {
      product.image ? setSrc(product.image) : " ";
    }
  }, [product?.image, product]);

  useEffect(() => {
    setEditableTitle(review.title);
    setEditableText(review.text);
    setRating(Number(review.rating) * 20);
    setVariant(review.variant);
  }, []);

  useEffect(() => {
    undoChanges();
  }, [undo]);

  const undoChanges = () => {
    if (undo) {
      setEditableText(review.text);
      setEditableTitle(review.title);
    }
  };
  const saveEditReview = () => {
    //ToDo:-> Call update Review in API
    if (save) {
      if (checkData()) {
        const reqBody = api.api.base_url + `/reviews`;
        const body = {
          id: review.id,
          title: review.title,
          text: review.text,
          rating: review.rating,
          variantId: review.variant,
        };
        if (onUploadFinish === undefined) {
          fetch(reqBody, {
            method: "PATCH",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(body),
            credentials: "include",
          });
        }
      }
    }
    if (save && onUploadFinish != undefined) {
      createNewReview();
    }
  };
  const checkData = () => {
    if (editableTitle === " " || editableTitle === "") {
      alert("Please Write a Title");
      return false;
    }
    if (editableText === " " || editableText === "") {
      alert("Please Write a Review");
      return false;
    }
    if (variant) {
      review.variant = variant;
    }
    review.title = editableTitle;
    review.text = editableText;
    review.rating = (rating / 20).toString();
    review.variant = variant;
    setEditableText("");
    setEditableTitle("");
    setRating(0);
    return true;
  };
  const createNewReview = () => {
    if (review !== undefined && onUploadFinish && checkData) {
      onUploadFinish(review);
    }
  };
  const onChangeTitle = (event: ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    setEditableTitle(event.target.value);
  };

  const onChangeText = (event: ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    setEditableText(event.target.value);
  };

  const hanldeRating = (rate: number) => {
    setRating(rate);
  };

  const onVariantClicked = (index: number) => {
    if (product?.variants) {
      setVariant(product.variants[index - 1].id);
    }
  };
  const createDropdownElements = () => {
    const elements: Element[] = [];
    product?.variants?.forEach((variant) => {
      if (product.variants !== undefined) {
        elements.push({
          displayedTitle: variant.name,
          index: product?.variants.indexOf(variant) + 1,
          onElementClicked: onVariantClicked,
        });
      }
    });
    if (product !== undefined) {
      const array: Element[] = [
        {
          displayedTitle: product?.name,
          index: 0,
          onElementClicked: onVariantClicked,
        },
      ];
      return array.concat(elements);
    } else {
      return elements;
    }
  };

  const editText: ReactNode = editPress ? (
    <>
      <p>Review: </p>
      <EditInput
        placeholder=" Your Text comes here"
        value={editableText}
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
          onChangeText(event);
        }}
      />{" "}
    </>
  ) : (
    <p> {review.text}</p>
  );

  const editTitle: ReactNode = editPress ? (
    <>
      <em>Title: </em>
      <EditInput
        placeholder=" Your title comes here"
        value={editableTitle}
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
          onChangeTitle(event);
        }}
      />{" "}
    </>
  ) : (
    <p> {review.title}</p>
  );

  //ToDo add functionality to the Star Rating system

  const productImage: ReactNode = (editPress || tex) && (
    <ImageContainer>
      <Image
        loader={() => src}
        unoptimized
        draggable={false}
        placeholder="empty"
        src={src}
        width="100%"
        height="100%"
        layout="responsive"
        objectFit="scale-down"
        alt=""
      />
    </ImageContainer>
  );
  const EditReview: ReactNode = editPress && (
    <>
      <ReviewContainer>
        <ReviewTitleContainer>
          <ReviewTitle>{editTitle}</ReviewTitle>
        </ReviewTitleContainer>
        <CustomDropdown elements={createDropdownElements()} />
        <ReviewTextContainer>
          <ReviewTextArea>{editText}</ReviewTextArea>
        </ReviewTextContainer>
      </ReviewContainer>
      <ReviewStarContaier>
        <Rating
          onClick={hanldeRating}
          ratingValue={rating}
          readonly={!editPress}
          size={35}
        />
      </ReviewStarContaier>
    </>
  );

  const UserName: ReactNode =
    review.user && auth.user && review.user.name !== auth.user.name ? (
      <BodyText>{review.user.name} says:</BodyText>
    ) : (
      <BodyText>you are saying:</BodyText>
    );

  const DisplayedImage: ReactNode =
    review.user && auth.user && review.user.name !== auth.user.name ? (
      <CircleImage image={review.user?.image} />
    ) : (
      <CircleImage image={auth?.user?.image} />
    );

  const DefaultReview: ReactNode = !editPress && (
    <DefaultReviewWrapper>
      <ReviewMetaData>{UserName}</ReviewMetaData>
      <ReviewElementContainer>
        <TitleContainer>{review.title}</TitleContainer>
        <BodyContainer>{review.text}</BodyContainer>
        <RatingContainer>
          <Rating
            ratingValue={parseInt(review.rating) * 20}
            readonly={!editPress}
            size={25}
          />
        </RatingContainer>
        <AvatarContainer>{DisplayedImage}</AvatarContainer>
      </ReviewElementContainer>
    </DefaultReviewWrapper>
  );

  return (
    <>
      {productImage}
      {EditReview}
      {DefaultReview}
    </>
  );
};
