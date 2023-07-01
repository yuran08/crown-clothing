import { CATEGORY_ACTION_TYPES } from "./category.types";

export const CATEGORIES_INITAIL_STATE = {
  categories: [],
}

export const categoriesReducer = (state = CATEGORIES_INITAIL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case CATEGORY_ACTION_TYPES.SET_CATEGORIES:
      return { ...state, categories: payload };
    default:
      return state;
  }
}