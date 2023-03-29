export enum CATEGORY_ACTION_TYPES {
  SET_CATEGORIES = "category/SET_CATEGORIES",
  FETCH_CATEGORIES_START = "category/FETCH_CATEGORIES_START",
  FETCH_CATEGORIES_SUCCESS = "category/FETCH_CATEGORIES_SUCCESS",
  FETCH_CATEGORIES_FAILED = "category/FETCH_CATEGORIES_FAILED",
}

export type CategoryItem = {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
};

export type Category = {
  title: string;
  imageUrl: string;
  items: CategoryItem[];
};

export type CategoryMap = {
  [key: string]: CategoryItem[];
};

// export const CATEGORY_ACTION_TYPES = {
//     SET_CATEGORIES: "category/SET_CATEGORIES",
//     FETCH_CATEGORIES_START: "category/FETCH_CATEGORIES_START",
//     FETCH_CATEGORIES_SUCCESS: "category/FETCH_CATEGORIES_SUCCESS",
//     FETCH_CATEGORIES_FAILED: "category/FETCH_CATEGORIES_FAILED"
// }
