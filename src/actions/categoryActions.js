import axios from "../helpers/axios";
import {
  GET_ALL_CATEGORIES_SUCCESS,
  GET_ALL_CATEGORIES_REQUEST,
  GET_ALL_CATEGORIES_FAILURE,
  
} from "./types";

export const getCategories = () => async (dispatch) => {
  dispatch({
    type: GET_ALL_CATEGORIES_REQUEST,
  });
  let res = await axios.get("/category/categories");

  if (res.status === 200) {
    dispatch({
      type: GET_ALL_CATEGORIES_SUCCESS,
      payload: {
        categories: res.data,
      },
    });
  } else {
    dispatch({
      type: GET_ALL_CATEGORIES_FAILURE,
      payload: {
        error: res.data.error,
      },
    });
  }
};


