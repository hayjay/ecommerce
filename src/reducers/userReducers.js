import { userConstant } from "../actions/types";

const initialState = {
  address: [],
  orders: [],
  orderDetails: null,
  error: null,
  loading: false,
  orderFetching: false,
};

const userReducers = (state = initialState, action) => {
  switch (action.type) {
    case userConstant.ADD_USER_ADDRESS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userConstant.ADD_USER_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        address: action.payload.address,
      };
    case userConstant.ADD_USER_ADDRESS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case userConstant.GET_USER_ADDRESS_SUCCESS:
      return {
        ...state,
        address: action.payload.address,
        loading: false,
      };
    case userConstant.GET_USER_ADDRESS_FAILURE:
      return {
        ...state,
        loading: false,
        address: action.payload.error,
      };
    case userConstant.GET_USER_ORDER_REQUEST:
      return {
        ...state,
        orderFetching: true,
      };
    case userConstant.GET_USER_ORDER_SUCCESS:
      return {
        ...state,
        orders: action.payload.orders,
        orderFetching: false,
      };
    case userConstant.GET_USER_ORDER_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        orderFetching: false,
      };
    case userConstant.GET_USER_ORDER_DETAILS_REQUEST:
      return {
        ...state,
      };
    case userConstant.GET_USER_ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        orderDetails: action.payload.order,
      };
    case userConstant.GET_USER_ORDER_DETAILS_FAILURE:
      return {
        ...state,
      };
    default:
      return {
        ...state,
      };
  }
};

export default userReducers;
