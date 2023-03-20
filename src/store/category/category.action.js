import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { createAction } from "../../utils/reducer/reducer.utils";
import { CATEGORY_ACTION_TYPES } from "./category.types";

//export const setCategories = (categories) => createAction(CATEGORY_ACTION_TYPES.SET_CATEGORIES, categories); 

const fetchCategoriesStart = () => createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START);

const fetchCategoriesSuccess = (categories) => createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categories);

const fetchCategoriesFailed = (error) => createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);

export const fetchCategoriesAsync = () => {
    return async (dispatch) => {
        dispatch(fetchCategoriesStart());

        try {
            const categoriesArray = await getCategoriesAndDocuments('categories');
            dispatch(fetchCategoriesSuccess(categoriesArray));

        } catch (error) {
            dispatch(fetchCategoriesFailed(error));
        }
    }
}
