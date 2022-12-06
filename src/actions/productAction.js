import axios from "../helpers/axios";
import { productConstants } from "./types";

export const getProductsBySlug = (slug) => async (dispatch) => {
  let res = await axios.get(`/products/${slug}`);
  if (res.status === 200) {
    dispatch({
      type: productConstants.GET_PRODUCTS_BY_SLUG,
      payload: res.data,
    });
  } else {
  }
};

export const getProductPage = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: productConstants.GET_PRODUCTS_PAGE_REQUEST,
    });
    let { cid, type } = payload;

    let res = await axios.get(`/page/${cid}/${type}`);
    if (res.status === 200) {
      let { page } = res.data;
      dispatch({
        type: productConstants.GET_PRODUCTS_PAGE_SUCCESS,
        payload: { page },
      });
    } else {
      let { error } = res.data;
      dispatch({
        type: productConstants.GET_PRODUCTS_PAGE_FAILURE,
        payload: { error },
      });
    }
  } catch (error) {
    dispatch({
      type: productConstants.GET_PRODUCTS_PAGE_FAILURE,
      payload: {error: res.data.error },
    });
  }
};

export const getProductDetailsById = (payload) => async dispatch => {

  dispatch({
    type: productConstants.GET_PRODUCT_DETAILS_BY_ID_REQUEST
  })
  let res;
  try {
    let {productId} = payload.params;
    res = await axios.get(`/product/${productId}`);
   
    dispatch({
      type: productConstants.GET_PRODUCT_DETAILS_BY_ID_SUCCESS,
      payload: {productDetails: res.data.product}
    })
  } catch (error) {
      dispatch({
        type: productConstants.GET_PRODUCT_DETAILS_BY_ID_FAILURE,
        payload: {error: res.data.error}
      })
  }
}
