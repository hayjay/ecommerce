import {
  GET_ALL_CATEGORIES_FAILURE,
  GET_ALL_CATEGORIES_SUCCESS,
  GET_ALL_CATEGORIES_REQUEST,
} from "../actions/types";

const initialState = {
  categories: [],
  loading: false,
  error: null
};

const buildNewCategories = (parentId, categories, category) => {
  let myCategories = [];
  if (parentId === undefined) {
    return [
      ...categories,
      {
        _id: category._id,
        name: category.name,
        slug: category.slug,
        children: []
      }
    ]
  }
  for (let cat of categories) {
    if (cat._id === parentId) {
      myCategories.push({
        ...cat,
        children:
          cat.children
            ? buildNewCategories(
                parentId,
                [
                  ...cat.children,
                  {
                    _id: category._id,
                    name: category.name,
                    slug: category.slug,
                    parentId: category.parentId,
                    children: category.children
                  }
                ],
                category
              )
            : []
      });
    } else {
      myCategories.push({
        ...cat,
        children:
          cat.children
            ? buildNewCategories(parentId, cat.children, category)
            : []
      });
    }
  }
  return myCategories;
};

function categoryReducers(state = initialState, action) {
  
  switch (action.type) {
    case GET_ALL_CATEGORIES_REQUEST:
      return {
        ...state,
        loading: true
      };
    case GET_ALL_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload.categories
      };
   
    default:
      return state;
  }
}

export default categoryReducers;
