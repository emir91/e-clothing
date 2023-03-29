import { AnyAction } from "redux";
import { Category } from "./category.types";
import {
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFailed,
} from "./category.action";

export type CategoriesState = {
  readonly categories: Category[];
  readonly isLoading: boolean;
  readonly error: Error | null;
};

const INITIAL_STATE: CategoriesState = {
  categories: [],
  isLoading: false,
  error: null,
};

export const categoryReducer = (
  state = INITIAL_STATE,
  action = {} as AnyAction
): CategoriesState => {
  if (fetchCategoriesStart.match(action)) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (fetchCategoriesSuccess.match(action)) {
    return {
      ...state,
      isLoading: false,
      categories: action.payload,
    };
  }

  if (fetchCategoriesFailed.match(action)) {
    return {
      ...state,
      isLoading: false,
      error: action.payload,
    };
  }

  return state;

  //   switch (action.type) {
  //     case CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START:
  //       return {
  //         ...state,
  //         isLoading: true,
  //       };
  //     case CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
  //       return {
  //         ...state,
  //         isLoading: false,
  //         categories: action.payload,
  //       };
  //     case CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
  //       return {
  //         ...state,
  //         isLoading: false,
  //         error: action.payload,
  //       };
  //     default:
  //       return state;
  //   }
};
