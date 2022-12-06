import axios from "../helpers/axios";
import { cartConstants } from "./types";

const getCartItems = () => async (dispatch) => {
  try {
    dispatch({ type: cartConstants.ADD_TO_CART_REQUEST });
    let res = await axios.get("/user/getCartItems");

    if (res.status === 200) {
      let { cartItems } = res.data;

      if (cartItems) {
        dispatch({
          type: cartConstants.ADD_TO_CART_SUCCESS,
          payload: { cartItems },
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const addToCart =
  (product, newQty = 1) =>
  async (dispatch, getState) => {
    try {
      let {
        cart: { cartItems },
        auth,
      } = getState();

      let qty = cartItems[product._id]
        ? parseInt(cartItems[product._id].qty + newQty)
        : 1;
      cartItems[product._id] = {
        ...product,
        qty,
      };
      if (auth.authenticated) {
        dispatch({ type: cartConstants.ADD_TO_CART_REQUEST });
        let payload = {
          cartItems: [
            {
              product: product._id,
              quantity: qty,
            },
          ],
        };

        let res = await axios.post("/user/cart/addtocart", payload);
        console.log(res);
        if (res.status === 200) {
          dispatch(getCartItems());
        } else if (res.status !== 200) {
          console.log(res.data.error);
        }
      } else {
        localStorage.setItem("cart", JSON.stringify(cartItems));
      }
      // console.log("addtocart", cartItems);
      dispatch({
        type: cartConstants.ADD_TO_CART_SUCCESS,
        payload: { cartItems },
      });
    } catch (error) {
      console.log(error);
    }
  };

export let updateCart = () => async (dispatch, getState) => {
  let { auth } = getState();

  let cartItems = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : null;
  console.log("carItemsAction", cartItems);
  if (auth.authenticated) {
    localStorage.removeItem("cart");
    if (cartItems) {
      console.log("cart update ***");
      let payload = {
        cartItems: Object.keys(cartItems).map((key, index) => {
          return {
            quantity: cartItems[key].qty,
            product: cartItems[key]._id,
          };
        }),
      };
      if (Object.keys(cartItems).length > 0) {
        let res = await axios.post("/user/cart/addtocart", payload);
        if (res.status === 200) {
          dispatch(getCartItems());
        }
      }
    }
  } else {
    if (cartItems) {
      dispatch({
        type: cartConstants.ADD_TO_CART_SUCCESS,
        payload: { cartItems },
      });
    }
  }
};

export const removeCartItem = (payload) => async (dispatch) => {
  
  try {
    dispatch({
      type: cartConstants.REMOVE_CART_ITEM_REQUEST,
    });
    let res = await axios.post("/user/cart/removeItem",  payload );
    // console.log(res)
    if (res.status === 202) {
      dispatch({ type: cartConstants.REMOVE_CART_ITEM_SUCCESS });
      dispatch(getCartItems());
    } else {
      let { error } = res.data;
      dispatch({
        type: cartConstants.REMOVE_CART_ITEM_FAILURE,
        payload: { error },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export { getCartItems };
