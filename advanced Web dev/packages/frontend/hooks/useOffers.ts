import { useMemo, useReducer, useState } from "react";
import config from "../config";
import offerReducer, {
  AddOffersPayload as AddOffersPayload,
  defaultState,
  OfferState,
  SetErrorPaylaod,
  SetLoadingPayload,
  Type,
} from "../reducers/offerReducer";

interface OfferHookState extends OfferState {
  variant: null | string;
  setActiveVariant: (id: null | string) => void;
  loadMore: () => void;
}

const useOffers = (productId: string): OfferHookState => {
  const [state, dispatch] = useReducer(offerReducer, defaultState);
  const [variant, setVariant] = useState<string | null>(null);

  const pageSize = 10;

  const fetchOffers = (
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
      config.api.base_url + `/${type}s/${_id}/offers?offset=${offset}`;
    fetch(reqBody, {
      headers: { "content-type": "application/json" },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        const paylaod: AddOffersPayload = {
          offers: data.offers,
          variantId: id,
          isMore: data.offers.length == pageSize,
        };
        dispatch({
          type: Type.ADD_OFFERS,
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
      fetchOffers("product");
    } else if (id && !state.variants[id]) {
      fetchOffers("variant", id);
    }
    setVariant(id);
  };

  const loadMore = () => {
    if (!variant) {
      fetchOffers("product", null, state.product.count);
      return;
    }
    if (!state.variants[variant]) {
      throw Error("Variant is not registered!");
    }
    fetchOffers("variant", variant, state.variants[variant].count);
  };

  return useMemo(() => {
    let offer = state.product;

    if (variant) offer = state.variants[variant];

    return {
      ...offer,
      variant,
      setActiveVariant,
      loadMore,
    };
  }, [variant, state]);
};

export default useOffers;
