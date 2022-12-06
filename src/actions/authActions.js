import { authConstant, cartConstants } from "./types";
import axios from "../helpers/axios";

export const signUp = (user) => async (dispatch) => {
  dispatch({
    type: authConstant.USER_REGISTER_REQUEST,
  });
  await axios
    .post(`/sign-up`, user)
    .then((res) => {
      let { msg } = res.data;
      dispatch({
        type: authConstant.USER_REGISTER_SUCCESS,
        payload: { message: msg },
      });
    })
    .catch((error) => {
      if (error.status == 400) {
        dispatch({
          type: authConstant.USER_REGISTER_FAILURE,
          payload: {
            error: error.response.data.error,
          },
        });
      }
    });
};
/**
 * @description user login
 * @param {*} user
 */
export const login = (user) => async (dispatch) => {
  dispatch({
    type: authConstant.LOGIN_REQUEST,
  });
  await axios
    .post(`/sign-in`, { ...user })
    .then((res) => {
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({
        type: authConstant.LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    })
    .catch((err) => {
      if (err.response.status === 404) {
        dispatch({
          type: authConstant.LOGIN_FAILED,
          payload: {
            error: err.response.data.error,
          },
        });
        return
      }
      let { data: {error} } = err.response;
      console.log(err.response);

      dispatch({
        type: authConstant.LOGIN_FAILED,
        payload: {
          error: error,
        },
      });
      //
    });
};

export const isUserLoggedIn = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  if (token) {
    const user = JSON.parse(localStorage.getItem("user"));
    dispatch({
      type: authConstant.LOGIN_SUCCESS,
      payload: {
        token,
        user,
      },
    });
  } else {
    dispatch({
      type: authConstant.LOGIN_FAILED,
      payload: {
        authenticated: false,
        error: "Failed to login",
      },
    });
  }
};

export const signout = () => async (dispatch) => {
  dispatch({
    type: authConstant.LOGOUT_REQUEST,
  });
  // localStorage.clear();
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  dispatch({
    type: authConstant.LOGOUT_SUCCESS,
  });
  dispatch({ type: cartConstants.RESET_CART });
  // const res = await axios.post("/admin/sign-out");

  // if (res.status === 200) {
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("user");

  //   dispatch({
  //     type: authConstant.LOGOUT_SUCCESS,
  //   });
  // } else {
  //   dispatch({
  //     type: authConstant.LOGOUT_FAILURE,
  //     payload: { error: res.data.error },
  //   });
  // }
};
