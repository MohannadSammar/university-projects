import { Review } from "../types/Review";

/**
 * Reducer Action Types
 */
export enum Type {
  ADD_REVIEWS,
  SET_LOADING,
  SET_ERROR,
}

export interface ReviewState {
  reviews: Review[];
  isMore: boolean;
  count: number;
  isLoading: boolean;
  error?: any;
}

/**
 * TYPESCRIPT TYPES
 */
export type ReviewsState = {
  variants: {
    [key: string]: ReviewState;
  };
  product: ReviewState;
};

export type AddReviewsPayload = {
  variantId?: string | null;
  reviews: Review[];
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

export type ReviewsPayload =
  | AddReviewsPayload
  | SetLoadingPayload
  | SetErrorPaylaod;

export type ReviewsAction = {
  type: Type;
  payload?: ReviewsPayload;
};

/**
 * Default reducer state
 */
export const defaultReviewState: ReviewState = {
  reviews: [],
  isMore: false,
  count: 0,
  isLoading: true,
  error: null,
};
export const defaultState: ReviewsState = {
  variants: {},
  product: defaultReviewState,
};

/**
 * Reducer Action Handler Functions
 */

const addReviews = (
  state: ReviewsState,
  payload: AddReviewsPayload
): ReviewsState => {
  let item = state.product;

  if (payload.variantId && !state.variants[payload.variantId]) {
    item = defaultReviewState;
  } else if (payload.variantId) {
    item = state.variants[payload.variantId];
  }

  item = {
    ...item,
    isMore: payload.isMore,
    isLoading: false,
    count: item.count + payload.reviews.length,
    reviews: [...item.reviews, ...payload.reviews],
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
  state: ReviewsState,
  payload: SetLoadingPayload
): ReviewsState => {
  if (payload.variantId && !state.variants[payload.variantId]) {
    return {
      ...state,
      variants: {
        ...state.variants,
        [payload.variantId]: defaultReviewState,
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
  state: ReviewsState,
  payload: SetErrorPaylaod
): ReviewsState => {
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
const reviewReducer = (
  state: ReviewsState,
  action: ReviewsAction
): ReviewsState => {
  let newState = state;

  switch (action.type) {
    case Type.ADD_REVIEWS:
      newState = addReviews(state, action.payload as AddReviewsPayload);
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

export default reviewReducer;
