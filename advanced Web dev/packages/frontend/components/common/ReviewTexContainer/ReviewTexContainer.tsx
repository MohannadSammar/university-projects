import { PencilSquare, Check2Circle, ArrowLeft } from "react-bootstrap-icons";
import { Review } from "../../../types/Review";
import {
  HeadlineAndRatingContainer,
  HeadlineContainer,
} from "../../BigCard/styles";
import { ReviewElement } from "../../Review/ReviewElement";
import {
  Body,
  EditContainer,
  Head,
  ReviewIconContainer,
  ReviewTitleContainer,
  TrashContainer,
} from "./style";
import { ReactNode, useState } from "react";
import { SmallCardProduct } from "../../../types/SmallCardProduct";
import { CloseButton } from "../../ProductDetails/styles";
import { CloseButtonContainer } from "../../UploadContainer/style";
import { Trash } from "react-bootstrap-icons";
import { useRouter } from "next/router";
import api from "../../../config";
import { Confirmation } from "../Confirmation/Confirmation";

interface ReviewContainerInterface {
  onXPress: () => void;
  review: Review;
  product: SmallCardProduct;
}
export const ReviewTexContainer: React.FC<ReviewContainerInterface> = ({
  onXPress,
  review,
  product,
}) => {
  const router = useRouter();
  const [edit, setEdit] = useState<boolean>(false);
  const [save, setSave] = useState<boolean>(false);
  const [undo, setUndo] = useState<boolean>(false);
  const [confirm, setconfirm] = useState<boolean>(false);
  const onEditPress = () => {
    setUndo(false);
    setEdit(true);
  };
  const onBackPress = () => {
    setUndo(true);
    setEdit(false);
  };

  const onSavePress = () => {
    setSave(true);
    setEdit(false);
  };

  const showConfirmation = () => {
    setconfirm(true);
  };
  const deleteReview = () => {
    const reqBody = api.api.base_url + `/reviews/${review.id}`;
    fetch(reqBody, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      credentials: "include",
    }).then(() => {
      router.push({
        pathname: "/tex",
        query: {
          refresh: true,
        },
      });
      setconfirm(false);
    });
  };
  const confrimation: ReactNode = confirm && (
    <Confirmation
      onConfirm={deleteReview}
      onCancel={() => {
        setconfirm(false);
      }}
    />
  );
  const navigationIcons: ReactNode = edit ? (
    <ArrowLeft onClick={onBackPress} />
  ) : (
    <CloseButton onClick={onXPress} />
  );
  const editIcons: ReactNode = edit ? (
    <Check2Circle onClick={onSavePress} />
  ) : (
    <PencilSquare onClick={onEditPress} />
  );
  return (
    <>
      {confrimation}

      <Head>
        <ReviewTitleContainer>
          <HeadlineAndRatingContainer>
            <HeadlineContainer>
              <h4>{review.product.name}</h4>
            </HeadlineContainer>
          </HeadlineAndRatingContainer>
          <p>{review.product.manufacturer}</p>
        </ReviewTitleContainer>
        <ReviewIconContainer>
          <EditContainer>{editIcons}</EditContainer>

          <TrashContainer onClick={showConfirmation}>
            <Trash />
          </TrashContainer>
          <CloseButtonContainer>{navigationIcons}</CloseButtonContainer>
        </ReviewIconContainer>
      </Head>
      <Body>
        <ReviewElement
          tex={true}
          product={product}
          review={review}
          /*onBackPress={onBackPress}*/ editPress={edit}
          save={save}
          undo={undo}
        />
      </Body>
    </>
  );
};
