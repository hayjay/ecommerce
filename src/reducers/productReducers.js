import { productConstants } from "../actions/types";

const initialState = {
  loading: false,
  products: [],
  priceRange: {},
  productsByPrice: {},
  productDetails: {},
  pageRequest: false,
  page: {},
  error: null
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function productReducers(state = initialState, action) {
  switch (action.type) {
    case productConstants.GET_PRODUCTS_BY_SLUG:
      return {
        ...state,
        products: action.payload.products,
        priceRange: action.payload.priceRange,
        productsByPrice: {
          ...action.payload.productsByPrice
        }
      };
    case productConstants.GET_PRODUCTS_PAGE_REQUEST:
      return {
        ...state,
        pageRequest: true,
      }
    case productConstants.GET_PRODUCTS_PAGE_SUCCESS:
      return {
        ...state,
        pageRequest: false,
        page: action.payload.page
      };
    case productConstants.GET_PRODUCTS_PAGE_FAILURE:
      return {
        ...state,
        pageRequest: false,
        error: action.payload.error
      };
    
    case productConstants.GET_PRODUCT_DETAILS_BY_ID_REQUEST:
      return {
        ...state,
        loading: true
      };
    
    case productConstants.GET_PRODUCT_DETAILS_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        productDetails: action.payload.productDetails
      };
    
    case productConstants.GET_PRODUCTS_PAGE_FAILURE:
      return {
        ...state,
       loading: false,
       error: action.payload.error
      };
    
    default:
      return {
        ...state
      };
  }
}
