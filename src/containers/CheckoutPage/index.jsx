import React from "react";
import * as ReactRedux from "react-redux";
import {
  MaterialButton,
  MaterialInput,
  Anchor,
} from "../../components/MaterialUI";
import { addOrder, getAddress } from "../../actions/userActions";
import AddressForm from "./AddressForm";
import Layout from "../../components/Layout";
import styles from "./index.module.css";
import PriceDetails from "../../components/PriceDetails";
import { getCartItems } from "../../actions/cartAction";
import CartPage from "../CartPage";
import Card from "../../components/UI/Card";

function CheckoutStep(props) {
  return (
    <div className={styles.checkoutStep}>
      <div
        onClick={props.onClick}
        className={`${styles.checkoutHeader} ${props.active && styles.active}`}
      >
        <div>
          <span className={styles.stepNumber}>{props.stepNumber}</span>
          <span className={styles.stepTitle}>{props.title}</span>
        </div>
      </div>
      {props.body && props.body}
    </div>
  );
}

const Address = ({
  adr,
  selectAddress,
  enableAddressEditForm,
  confirmDeliveryAddress,
  onAddressSubmit,
}) => {
  return (
    <div className={`${styles.flexRow} ${styles.addressContainer}`}>
      <div>
        <input onClick={() => selectAddress(adr)} type="radio" name="address" />
      </div>
      <div className={`${styles.flexRow} ${styles.sb} ${styles.addressinfo}`}>
        {!adr.edit ? (
          <div style={{ width: "100%" }}>
            <div className={styles.addressDetail}>
              <div>
                <span className={styles.addressName}>{adr.name}</span>
                <span className={styles.addressType}>{adr.addressType}</span>
                <span className={styles.addressMobileNumber}>
                  {adr.mobileNumber}
                </span>
              </div>

              {adr.selected && (
                <Anchor
                  name="Edit"
                  onClick={() => enableAddressEditForm(adr)}
                  style={{
                    fontWeight: "500",
                    color: "3874f0",
                  }}
                />
              )}
            </div>

            <div className={styles.fullAdress}>
              {adr.address} <br />
              {`${adr.state} - ${adr.pinCode}`}
            </div>
            {adr.selected && (
              <MaterialButton
                title={"DELIVERER HERE"}
                onClick={() => confirmDeliveryAddress(adr)}
                style={{
                  width: "250px",
                }}
              />
            )}
          </div>
        ) : (
          <AddressForm
            withoutLayout={true}
            onSubmitForm={onAddressSubmit}
            initialData={adr}
            onCancel={() => {}}
          />
        )}

        {/* {adr.selected && <div>edit</div>} */}
      </div>
    </div>
  );
};

const CheckoutPage = (props) => {
  const user = ReactRedux.useSelector((state) => state.user);
  const auth = ReactRedux.useSelector((state) => state.auth);
  const cart = ReactRedux.useSelector((state) => state.cart);
  const [newAddress, setNewAddress] = React.useState(false);
  const [address, setAddress] = React.useState([]);
  const [confirmAddress, setConfirmAddress] = React.useState(false);
  const [selectedAddress, setSelectedAddress] = React.useState(null);
  const [orderSummary, setOrderSummary] = React.useState(false);
  const [orderConfirmation, setOrderConfirmation] = React.useState(false);
  const [confirmOrder, setConfirmOrder] = React.useState(false);
  const [paymentOption, setPaymentOption] = React.useState(false);

  const dispatch = ReactRedux.useDispatch();

  const onAddressSubmit = (adr) => {
    setSelectedAddress(adr);
    setConfirmAddress(true);
    setOrderSummary(true);
  };
  // console.log(user.address)

  const selectAddress = (addr) => {
    // console.log(adr)
    const updatedAddress = address.map((adr) =>
      addr._id === adr._id
        ? { ...adr, selected: true }
        : { ...adr, selected: false }
    );
    setAddress(updatedAddress);
  };

  const confirmDeliveryAddress = (addr) => {
    setSelectedAddress(addr);
    setConfirmAddress(true);
    setOrderSummary(true);
  };
  const enableAddressEditForm = (addr) => {
    const updatedAddress = address.map((adr) =>
      addr._id === adr._id ? { ...adr, edit: true } : { ...adr, edit: false }
    );
    setAddress(updatedAddress);
  };

  const userOrderConfirmation = () => {
    setOrderConfirmation(true);
    setOrderSummary(false);
    setPaymentOption(true);
  };

  const onConfirmOrder = () => {
    const totalAmount = Object.keys(cart.cartItems).reduce((totalPrice, key) => {
      const { price, qty } = cart.cartItems[key];
      return totalPrice + price * qty;
    }, 0)
    const items = Object.keys(cart.cartItems).map(key => ({
      productId: key,
      payablePrice: cart.cartItems[key].price,
      purchasedQty: cart.cartItems[key].qty
    }))
    const payload = {
     addressId: selectedAddress._id,
     totalAmount,
     items,
     paymentStatus: "pending",
     paymentType: "cod"
    }
    console.log(payload)
  
    dispatch(addOrder(payload)) 
    setConfirmOrder(true)
  }

  React.useEffect(() => {
    if (auth.authenticated) {
      dispatch(getAddress());
    }
    auth.authenticated && dispatch(getCartItems());
  }, [auth.authenticated]);

  React.useEffect(() => {
    const address = user.address.map((adr) => ({
      ...adr,
      selected: false,
      edit: false,
    }));
    setAddress(address);
  }, [user.address]);

  if (confirmOrder) {
    return (
      <Layout>
        <Card>
          <div>Thank you</div>
        </Card>
      </Layout>
    )
  }
  return (
    <Layout>
      <div
        className={styles.cartContainer}
        style={{ alignItems: "flex-start" }}
      >
        <div className={styles.checkoutContainer}>
          <CheckoutStep
            stepNumber={"1"}
            title={"LOGIN"}
            active={!auth.authenticated}
            body={
              auth.authenticated ? (
                <div className={styles.loggedInId}>
                  <span
                    style={{ fontWeight: "500", textTransform: "capitalize" }}
                  >
                    {auth.user.fullName}
                  </span>
                  <span style={{ margin: "0 5px" }}>{auth.user.email}</span>
                </div>
              ) : (
                <div>
                  <MaterialInput label="Email" />
                </div>
              )
            }
          />
          <CheckoutStep
            stepNumber={"2"}
            title={"DELIVERY ADDRESS"}
            active={!confirmAddress && auth.authenticated}
            body={
              <>
                {confirmAddress ? (
                  <div
                    className={styles.stepCompleted}
                  >{`${selectedAddress.name} ${selectedAddress.address} - ${selectedAddress.pinCode}`}</div>
                ) : (
                  address.map((adr, index) => (
                    <Address
                      key={index}
                      adr={adr}
                      selectAddress={selectAddress}
                      enableAddressEditForm={enableAddressEditForm}
                      confirmDeliveryAddress={confirmDeliveryAddress}
                      onAddressSubmit={onAddressSubmit}
                    />
                  ))
                )}
              </>
            }
          />
          {/* Address form */}

          {confirmAddress ? null : newAddress ? (
            <AddressForm onSubmitForm={onAddressSubmit} onCancel={() => {}} />
          ) : (
            <CheckoutStep
              stepNumber={"+"}
              title={"ADD NEW ADDRESS"}
              active={false}
              onClick={() => setNewAddress(true)}
            />
          )}
          <CheckoutStep
            active={orderSummary}
            stepNumber={`3`}
            title={`ORDER SUMMARY`}
            body={
              orderSummary ? (
                <CartPage onlyCartItems={true} />
              ) : orderConfirmation ? (
                <div className={styles.stepCompleted}>
                  {Object.keys(cart.cartItems).length} item(s){" "}
                </div>
              ) : null
            }
          />
          {orderSummary && (
            <Card style={{ margin: "10px 0" }}>
              <div
                className={`${styles.flexRow} ${styles.sb}`}
                style={{
                  padding: "10px",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <p style={{ fontSize: "12px" }}>
                  Order confirmation email will be Summary will sent to{" "}
                  <strong>{auth.user.email}</strong>{" "}
                </p>
                <MaterialButton
                  title={"Continue"}
                  onClick={userOrderConfirmation}
                  style={{
                    width: "200px",
                  }}
                />
              </div>
            </Card>
          )}
          <CheckoutStep
            stepNumber={`4`}
            title={"PAYMENT OPTIONS"}
            active={paymentOption}
            body={
              paymentOption && (
                <div className={`${styles.stepCompleted}`}>
                  <div className={styles.flexRow} style={{
                    alignItems: 'center',
                    padding: '20px',
                  }}>
                    <input type="radio" name="paymentOption" value="cod" />
                    <div>Cash on delivery</div>
                  </div>
                  <MaterialButton
                    title={"CONFIRM ORDER"}
                    onClick={onConfirmOrder}
                    style={{
                      width: "200px",
                      margin: "0 0 20px 20px"
                    }}
                  />
                </div>
              )
            }
          />
        </div>
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
};

export default CheckoutPage;
