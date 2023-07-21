import { Offer } from "../types/Offer";

/**
 * Reducer Action Types
 */
export enum Type {
  ADD_OFFERS,
  SET_LOADING,
  SET_ERROR,
}

export interface OfferState {
  offers: Offer[];
  isMore: boolean;
  count: number;
  isLoading: boolean;
  error?: any;
}

/**
 * TYPESCRIPT TYPES
 */
export type OffersState = {
  variants: {
    [key: string]: OfferState;
  };
  product: OfferState;
};

export type AddOffersPayload = {
  variantId?: string | null;
  offers: Offer[];
  isMore: boolean;
};

export type SetLoadingPayload = {
  variantId?: string | null;
  loading: boolean;
};

export type SetErrorPaylaod = {
  variantId?: string | null;
  error: any;
};

export type OffersPayload =
  | AddOffersPayload
  | SetLoadingPayload
  | SetErrorPaylaod;

export type OffersAction = {
  type: Type;
  payload?: OffersPayload;
};

/**
 * Default reducer state
 */
export const defaultOfferState: OfferState = {
  offers: [],
  isMore: false,
  count: 0,
  isLoading: true,
  error: null,
};
export const defaultState: OffersState = {
  variants: {},
  product: defaultOfferState,
};

/**
 * Reducer Action Handler Functions
 */

const addOffers = (
  state: OffersState,
  payload: AddOffersPayload
): OffersState => {
  let item = state.product;

  if (payload.variantId && !state.variants[payload.variantId]) {
    item = defaultOfferState;
  } else if (payload.variantId) {
    item = state.variants[payload.variantId];
  }

  item = {
    ...item,
    isMore: payload.isMore,
    isLoading: false,
    count: item.count + payload.offers.length,
    offers: [...item.offers, ...payload.offers],
  };

  if (payload.variantId) {
    return {
      ...state,
      variants: {
        ...state.variants,
        [payload.variantId]: item,
      },
    };
  }

  return {
    ...state,
    product: item,
  };
};

const setLoading = (
  state: OffersState,
  payload: SetLoadingPayload
): OffersState => {
  if (payload.variantId && !state.variants[payload.variantId]) {
    return {
      ...state,
      variants: {
        ...state.variants,
        [payload.variantId]: defaultOfferState,
      },
    };
  } else if (payload.variantId) {
    return {
      ...state,
      variants: {
        ...state.variants,
        [payload.variantId]: {
          ...state.variants[payload.variantId],
          isLoading: true,
          error: null,
        },
      },
    };
  }

  return {
    ...state,
    product: {
      ...state.product,
      isLoading: true,
      error: null,
    },
  };
};

const setError = (
  state: OffersState,
  payload: SetErrorPaylaod
): OffersState => {
  if (payload.variantId && !state.variants[payload.variantId]) {
    throw Error("Variant does not exist!");
  }
  if (payload.variantId) {
    return {
      ...state,
      variants: {
        ...state.variants,
        [payload.variantId]: {
          ...state.variants[payload.variantId],
          isLoading: false,
          error: payload.error,
        },
      },
    };
  }

  return {
    ...state,
    product: {
      ...state.product,
      isLoading: false,
      error: payload.error,
    },
  };
};
/**
 * Reducer function
 * @param state
 * @param action
 * @returns
 */
const offerReducer = (
  state: OffersState,
  action: OffersAction
): OffersState => {
  let newState = state;

  switch (action.type) {
    case Type.ADD_OFFERS:
      newState = addOffers(state, action.payload as AddOffersPayload);
      break;
    case Type.SET_LOADING:
      newState = setLoading(state, action.payload as SetLoadingPayload);
      break;
    case Type.SET_ERROR:
      newState = setError(state, action.payload as SetErrorPaylaod);
      break;
  }

  return newState;
};

export default offerReducer;
