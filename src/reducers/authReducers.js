import { authConstant } from "../actions/types";

const initialState = {
  token: null,
  user: {
    firstName: "",
    lastName: "",
    email: "",
    picture: "",
  },
  authenticated: false,
  authenticating: false,
  loading: false,
  error: null,
  message: "",
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function authReducers(state = initialState, action) {
  switch (action.type) {
    case authConstant.USER_REGISTER_REQUEST:
      return {
        ...state,
        authenticating: true,
      };
    case authConstant.USER_REGISTER_SUCCESS:
      return {
        ...state,
        message: action.payload.message,
        authenticating: false,
      };
    case authConstant.USER_REGISTER_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        authenticating: false,
      };
    case authConstant.LOGIN_REQUEST:
      return {
        ...state,
        authenticating: true,
      };
    case authConstant.LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        authenticated: true,
        authenticating: false,
      };
    case authConstant.LOGIN_FAILED:
      return {
        ...state,
        error: action.payload.error,
        authenticating: false,
      };
    case authConstant.LOGOUT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case authConstant.LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        token: null,
        user: {},
        authenticated: false,
      };
    case authConstant.LOGOUT_FAILURE:
      return {
        ...state,
        loading: false,
        token: null,
        user: {},
        authenticated: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
}
