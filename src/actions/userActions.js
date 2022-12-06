import axios from "../helpers/axios";

let { userConstant, cartConstants } = require("./types");

export const getAddress = () => async (dispatch) => {
  try {
    dispatch({ type: userConstant.GET_USER_ADDRESS_REQUEST });
    let res = await axios.get("/user/getAddress");
    if (res.status === 200) {
      // console.log(res.data)
      let {
        address: { address },
      } = res.data;
      dispatch({
        type: userConstant.GET_USER_ADDRESS_SUCCESS,
        payload: { address },
      });
    } else {
      let { error } = res.data;
      dispatch({
        type: userConstant.GET_USER_ADDRESS_FAILURE,
        payload: { error },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const addAddress = (payload) => async (dispatch) => {
  try {
    let res = await axios.post("/user/address/create", { payload });
    dispatch({ type: userConstant.ADD_USER_ADDRESS_REQUEST });
    if (res.status == 200) {
      console.log(res);
      let {
        address: { address },
      } = res.data;
      dispatch({
        type: userConstant.ADD_USER_ADDRESS_SUCCESS,
        payload: { address },
      });
    } else {
      let { error } = res.data;
      dispatch({
        type: userConstant.ADD_USER_ADDRESS_REQUEST,
        payload: { error },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const addOrder = (payload) => async (dispatch) => {
  try {
    dispatch({ type: userConstant.ADD_USER_ORDER_REQUEST });
    let res = await axios.post("/addOrder", payload);
    if (res.status == 200) {
      console.log(res);
      dispatch({
        type: cartConstants.RESET_CART,
      });
      // let {address: {address}} = res.data
      // dispatch({
      //     type: userConstant.ADD_USER_ORDER_SUCCESS,
      //     payload: {address}
      // })
    } else {
      let { error } = res.data;
      dispatch({
        type: userConstant.ADD_USER_ORDER_FAILURE,
        payload: { error },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getOrders = () => async (dispatch) => {
  dispatch({ type: userConstant.GET_USER_ORDER_REQUEST });
  await axios
    .get("/getOrders")
    .then((res) => {
      let { orders } = res.data;
      dispatch({
        type: userConstant.GET_USER_ORDER_SUCCESS,
        payload: { orders },
      });
    })
    .catch((err) => {
      let { error } = err.data;
      dispatch({
        type: userConstant.GET_USER_ORDER_FAILURE,
        payload: { error },
      });
    });
};

export const getOrder = (payload) => async (dispatch) => {
  dispatch({ type: userConstant.GET_USER_ORDER_DETAILS_REQUEST });
  await axios
    .get(`/getOrder/${payload.orderId}`)
    .then((res) => {
      if (res) {
        let { order } = res.data;

        dispatch({
          type: userConstant.GET_USER_ORDER_DETAILS_SUCCESS,
          payload: { order },
        });
      }
    })
    .catch((err) => {
      let { error } = err.data;
      dispatch({
        type: userConstant.GET_USER_ORDER_DETAILS_FAILURE,
        payload: { error },
      });
    });
};
