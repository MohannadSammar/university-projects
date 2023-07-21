import { DetailedProduct } from "../../../types/DetailedProduct";
import { useEffect, ReactNode } from "react";
import {
  BodyText,
  DataSheet,
  LoadMoreLink,
  ReviewTabContainer,
} from "./styles";
import { ReviewElement } from "../../Review/ReviewElement";
import { Loader } from "../../common/Loader/Loader";
import { VariantsHeader } from "../DataTab/styles";
import { CustomDropdown } from "../../common/CustomDropdown/CustomDropdown";
import { Element } from "../../common/CustomDropdown/CustomDropdown";
import useReviews from "../../../hooks/useReviews";

export interface ReviewTabInterface {
  product: DetailedProduct;
}

export const ReviewTab: React.FC<ReviewTabInterface> = ({ product }) => {
  const { reviews, isMore, isLoading, error, setActiveVariant, loadMore } =
    useReviews(product.id);

  useEffect(() => {
    setActiveVariant(null);
  }, []);

  const onVariantClicked = (index: number) => {
    let id = null;
    if (product.variants && product.variants[index - 1]?.id) {
      id = product.variants[index - 1].id;
    }
    setActiveVariant(id);
  };

  const createDropdownElements = () => {
    const elements: Element[] = [];

    product.variants?.forEach((variant) => {
      if (product.variants !== undefined) {
        elements.push({
          displayedTitle: variant.name,
          index: product.variants.indexOf(variant) + 1,
          onElementClicked: onVariantClicked,
        });
      }
    });
    const array: Element[] = [
      {
        displayedTitle: product.name,
        index: 0,
        onElementClicked: onVariantClicked,
      },
    ];
    return array.concat(elements);
  };

  const Reviews: ReactNode =
    reviews &&
    reviews.map((review, key) => {
      return <ReviewElement review={review} key={key} />;
    });

  const LoadMore: ReactNode = isMore && !isLoading && !error && (
    <LoadMoreLink onClick={loadMore}>Load more reviews</LoadMoreLink>
  );

  const NoMoreReviews: ReactNode = !isMore && !error && (
    <BodyText>No more reviews available!</BodyText>
  );

  const ErrorHappened: ReactNode = error && (
    <BodyText>A error happened!</BodyText>
  );

  const Loading: ReactNode = isLoading && <Loader />;

  return (
    <ReviewTabContainer>
      <VariantsHeader>
        <p>Variant:</p>
        <CustomDropdown elements={createDropdownElements()} />
      </VariantsHeader>
      <h3>Reviews</h3>
      <DataSheet>{Reviews}</DataSheet>
      {Loading}
      {LoadMore}
      {NoMoreReviews}
      {ErrorHappened}
    </ReviewTabContainer>
  );
};
