import { useMemo, useReducer, useState } from "react";
import config from "../config";
import reviewReducer, {
  AddReviewsPayload,
  defaultState,
  ReviewState,
  SetErrorPaylaod,
  SetLoadingPayload,
  Type,
} from "../reducers/reviewReducer";

interface ReviewHookState extends ReviewState {
  variant: null | string;
  setActiveVariant: (id: null | string) => void;
  loadMore: () => void;
}

const useReviews = (productId: string): ReviewHookState => {
  const [state, dispatch] = useReducer(reviewReducer, defaultState);
  const [variant, setVariant] = useState<string | null>(null);

  const pageSize = 10;

  const fetchReviews = (
    type: "product" | "variant",
    id: string | null = null,
    offset = 0
  ) => {
    let _id = productId;
    if (id) {
      _id = id;
    }

    //Loading State
    const paylaod: SetLoadingPayload = {
      variantId: id,
      loading: true,
    };
    dispatch({
      type: Type.SET_LOADING,
      payload: paylaod,
    });

    const reqBody =
      config.api.base_url +
      `/${type}s/${_id}/reviews?limit=${pageSize}&offset=${offset}`;
    fetch(reqBody, {
      headers: { "content-type": "application/json" },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        const paylaod: AddReviewsPayload = {
          reviews: data.reviews,
          variantId: id,
          isMore: data.reviews.length == pageSize,
        };
        dispatch({
          type: Type.ADD_REVIEWS,
          payload: paylaod,
        });
      })
      .catch((err) => {
        //Error State
        const paylaod: SetErrorPaylaod = {
          variantId: id,
          error: err,
        };
        dispatch({
          type: Type.SET_ERROR,
          payload: paylaod,
        });
      });
  };

  const setActiveVariant = (id: string | null) => {
    if (!id && !state.product.count) {
      fetchReviews("product");
    } else if (id && !state.variants[id]) {
      fetchReviews("variant", id);
    }
    setVariant(id);
  };

  const loadMore = () => {
    if (!variant) {
      fetchReviews("product", null, state.product.count);
      return;
    }
    if (!state.variants[variant]) {
      throw Error("Variant is not registered!");
    }
    fetchReviews("variant", variant, state.variants[variant].count);
  };

  return useMemo(() => {
    let review = state.product;

    if (variant) review = state.variants[variant];

    return {
      ...review,
      variant,
      setActiveVariant,
      loadMore,
    };
  }, [variant, state]);
};

export default useReviews;
