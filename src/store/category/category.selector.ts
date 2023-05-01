import { createSelector } from "reselect";
import { RootState } from "../store";
import { CategoriesState } from "./category.reducer";
import { CategoryMap } from "./category.types";

const selectCategoryReducer = (state: RootState): CategoriesState => state.categories;

export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categorySlice) => categorySlice.categories
);

export const categoriesSelector = createSelector(
  [selectCategories],
  (categories): CategoryMap =>
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {} as CategoryMap)
);

export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categorySlice) => categorySlice.isLoading
);

// function getLast<T>(arr: T[]): T {
//     return arr[arr.length - 1];
//   }

//   const arr1 = [1, 2, 3];
//   const arr2 = ["a", "b", "c"];

//   console.log(getLast(arr1)); // Output: 3
//   console.log(getLast(arr2)); // Output: "c"
