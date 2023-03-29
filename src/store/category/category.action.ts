import {
  createAction,
  Action,
  ActionWithPayload,
  withMatcher,
} from "../../utils/reducer/reducer.utils";
import { CATEGORY_ACTION_TYPES, Category } from "./category.types";

export type FetchCategoriesStart =
  Action<CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START>;
export type FetchCategoriesSuccess = ActionWithPayload<
  CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
  Category[]
>;
export type FetchCategoriesFailed = ActionWithPayload<
  CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_FAILED,
  Error
>;

export const fetchCategoriesStart = withMatcher(
  (): FetchCategoriesStart =>
    createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START)
);
export const fetchCategoriesSuccess = withMatcher(
  (categories: Category[]): FetchCategoriesSuccess =>
    createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categories)
);
export const fetchCategoriesFailed = withMatcher(
  (error: Error): FetchCategoriesFailed =>
    createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error)
);

//export const fetchCategoriesStart = () => createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START);
// export const fetchCategoriesSuccess = (categories) => createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categories);
// export const fetchCategoriesFailed = (error) => createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);

// export const fetchCategoriesAsync = () => {
//   return async (dispatch) => {
//     dispatch(fetchCategoriesStart());

//     try {
//       const categoriesArray = await getCategoriesAndDocuments("categories");
//       dispatch(fetchCategoriesSuccess(categoriesArray));
//     } catch (error) {
//       dispatch(fetchCategoriesFailed(error));
//     }
//   };
// };
