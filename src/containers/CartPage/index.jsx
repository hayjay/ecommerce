import React from "react";
import router from "next/router";
import * as ReactRedux from "react-redux";
import {
  addToCart,
  getCartItems,
  removeCartItem,
} from "../../actions/cartAction";
import Layout from "../../components/Layout";
import { MaterialButton } from "../../components/MaterialUI";
import Card from "../../components/UI/Card";
import CartItem from "./CartItem";
import styles from "./index.module.css";
import PriceDetails from "../../components/PriceDetails";

function CartPage(props) {
  const cart = ReactRedux.useSelector((state) => state.cart);
  const auth = ReactRedux.useSelector((state) => state.auth);
  const dispatch = ReactRedux.useDispatch();

  const [cartItems, setCartItems] = React.useState(cart.cartItems);

  // console.log('cartItems', Object.keys(cartItems).length, cartItems)

  React.useEffect(() => {
    setCartItems(cart.cartItems);
  }, [cart.cartItems]);

  React.useEffect(() => {
    auth.authenticated && dispatch(getCartItems());
  }, [auth.authenticated]);

  const onQuantityIncrement = (_id, qty) => {
    console.log(_id, qty);
    const { name, price, image } = cartItems[_id];
    dispatch(addToCart({ _id, name, price, image }));
  };

  const onQuantityDecrement = (_id, qty) => {
    const { name, price, image } = cartItems[_id];
    dispatch(addToCart({ _id, name, price, image }, -1));
  };

  const onRemoveCartItem = (_id) => {
    // console.log(_id)
    dispatch(removeCartItem({ productId: _id }));
  };

  if (props.onlyCartItems) {
    return Object.keys(cartItems).map((key, index) => (
      <CartItem
        key={index}
        cartItem={cartItems[key]}
        onQuantityInc={onQuantityIncrement}
        onQuantityDec={onQuantityDecrement}
      />
    ));
  }
  return (
    <Layout>
      <div
        className={`${styles.cartContainer}`}
        style={{ alignItems: "flex-start " }}
      >
        <Card
          headerleft={"My Cart"}
          headerright={<div>Deliver to</div>}
          style={{ width: "calc(100% - 400px)" }}
        >
          {Object.keys(cartItems).length > 0 ? (
            Object.keys(cartItems).map((key, index) => (
              <CartItem
                key={index}
                cartItem={cartItems[key]}
                onQuantityInc={onQuantityIncrement}
                onQuantityDec={onQuantityDecrement}
                onRemoveCartItem={onRemoveCartItem}
              />
            ))
          ) : (
            <div
              style={{
                marginLeft: "calc(100% - 60%)",
                fontSize: "24px",
                color: "yellowgreen",
              }}
            >
              Cart is Empty
            </div>
          )}
          <div
            style={{
              width: "100%",
              display: "flex",
              background: "#ffffff",
              justifyContent: "flex-end",
              boxShadow: "0 0 10px 10px #eee",
              padding: "10px 0",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                width: "250px",
              }}
            >
              <MaterialButton
                title="PLACE ORDER"
                onClick={() => router.push("/checkout")}
              />
            </div>
          </div>
        </Card>
        <PriceDetails
          totalItem={Object.keys(cart.cartItems).reduce((qty, key) => {
            return qty + cart.cartItems[key].qty;
          }, 0)}
          totalPrice={Object.keys(cart.cartItems).reduce((totalPrice, key) => {
            const { price, qty } = cart.cartItems[key];
            return totalPrice + price * qty;
          }, 0)}
        />
      </div>
    </Layout>
  );
}

export default CartPage;
