import React, { useState } from "react";
import * as ReactRedux from "react-redux";
import Link from "next/link";
import {Alert} from 'react-bootstrap'
import { IoIosArrowDown, IoIosCart, IoIosSearch } from "react-icons/io";

import styles from "./index.module.css";
import {
  Modal,
  MaterialInput,
  MaterialButton,
  DropdownMenu,
} from "../MaterialUI";
import { login, signout, signUp } from "../../actions/authActions";
import Cart from "../UI/Cart";

/**
 * @author
 * @function Header
 **/

const Header = (props) => {
  const [loginModal, setLoginModal] = useState(false);
  const [signup, setSignup] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = ReactRedux.useSelector((state) => state.auth);
  const cart = ReactRedux.useSelector((state) => state.cart);

  const dispatch = ReactRedux.useDispatch();

  const userSignup = () => {
    const user = { firstName, lastName, email, password };
    if ((firstName || lastName || email || password) === "") {
      return;
    }
    dispatch(signUp(user));
  };

  const userLogin = () => {
    auth.error = "" 
    if (signup) {
      userSignup();
    } else {
      if ((email || password) === "") {
        return;
      }
      dispatch(login({ email, password }));
    }
  };

  const logout = () => {
    dispatch(signout());
  };

  React.useEffect(() => {
    if (auth.authenticated) {
      setLoginModal(false);
    }
  }, [auth.authenticated]);

  const renderLoggedInMenu = () => {
    return (
      <DropdownMenu
        menu={
          <a
            className={styles.fullName}
            // onClick={() => {
            //   setLoginModal(true);
            // }}
          >
            {auth.user.fullName}
          </a>
        }
        menus={[
          { label: "My Profile", icon: null },
          { label: "SuperCoin Zone", icon: null },
          { label: "Flipkart Plus Zone", icon: null },
          {
            label: "Orders",
            href: `/account/orders`,
            icon: null,
            onClick: () => {
              !auth.authenticated && setLoginModal(true);
            },
          },
          { label: "Wishlist", href: "#", icon: null },
          { label: "My Chats", href: "#", icon: null },
          { label: "Coupons", href:"#", icon: null },
          { label: "Rewards", href: "#", icon: null },
          { label: "Notifications", href:"#", icon: null },
          { label: "Gift Cards", icon: null },
          { label: "Logout", icon: null, onClick: logout },
        ]}
      />
    );
  };

  const renderNonLoggedInMenu = () => {
    return (
      <DropdownMenu
        menu={
          <a
            className={styles.loginButton}
            onClick={() => {
              setSignup(false);
              setLoginModal(true);
            }}
          >
            Login
          </a>
        }
        menus={[
          { label: "My Profile", href: "", icon: null },
          { label: "Flipkart Plus Zone", href: "", icon: null },
          { label: "Orders", href: "", icon: null },
          { label: "Wishlist", href: "", icon: null },
          { label: "Rewards", href: "", icon: null },
          { label: "Gift Cards", href: "", icon: null },
        ]}
        firstMenu={
          <div className={styles.firstmenu}>
            <span>New Customer?</span>
            <a
              onClick={() => {
                setLoginModal(true);
                setSignup(true);
              }}
              style={{ color: "#2874f0" }}
            >
              Sign Up
            </a>
          </div>
        }
      />
    );
  };
 

  return (
    <div className={styles.header}>
      <Modal visible={loginModal} onClose={() => setLoginModal(false)}>
        <div className={styles.authContainer}>
          <div className={styles.row}>
            <div className={styles.leftspace}>
              <h2>Login</h2>
              <p>Get access to your Orders, Wishlist and Recommendations</p>
            </div>
            <div className={styles.rightspace}>
              <div className={styles.loginInputContainer}>
                {auth.error && (<Alert variant={'danger'} >{auth.error}</Alert>)}
                {signup && (
                  <>
                    <MaterialInput
                      type="text"
                      label="Enter First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />

                    <MaterialInput
                      type="password"
                      label="Enter Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      // rightElement={<a href="#">Forgot?</a>}
                    />
                  </>
                )}
                <MaterialInput
                  type="text"
                  label="Enter Email/Enter Mobile Number"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <MaterialInput
                  type="password"
                  label="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  // rightElement={<a href="#">Forgot?</a>}
                />
                <MaterialButton
                  title={signup ? "Register" : "Login"}
                  bgColor="#fb641b"
                  textColor="#ffffff"
                  style={{ margin: "40px 0 20px 0" }}
                  onClick={userLogin}
                />

                <p style={{ textAlign: "center" }}>OR</p>
                <MaterialButton
                  title="Request OTP"
                  bgColor="#ffffff"
                  textColor="#2874f0"
                  style={{ margin: "20px 0" }}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <div className={styles.subHeader}>
        <div className={styles.logo}>
          <Link href="/">
            <a>
              <img
                src="/images/logo/flipkart.png"
                className={styles.logoimage}
                alt=""
              />
            </a>
          </Link>
          <Link href="/">
            <a style={{ marginTop: "-10px" }}>
              <span className={styles.exploreText}>Explore</span>
              <span className={styles.plusText}>Plus</span>
              <img
                src="/images/logo/golden-star.jpg"
                className={styles.goldenStar}
                alt=""
              />
            </a>
          </Link>
        </div>
        <div
          style={{
            padding: "0 10px",
          }}
        >
          <div className={styles.searchInputContainer}>
            <input
              className={styles.searchInput}
              placeholder={"search for products, brands and more"}
            />
            <div className={styles.searchIconContainer}>
              <IoIosSearch
                style={{
                  color: "#2874f0",
                }}
              />
            </div>
          </div>
        </div>
        <div className={styles.rightMenu}>
          {auth.authenticated ? renderLoggedInMenu() : renderNonLoggedInMenu()}
          <DropdownMenu
            menu={
              <a className={styles.more}>
                <span>More</span> &nbsp;
                <IoIosArrowDown style={{ marginTop: "5px" }} />
              </a>
            }
            menus={[
              { label: "Notification Preference", href: "", icon: null },
              { label: "Sell on flipkart", href: "", icon: null },
              { label: "24x7 Customer Care", href: "", icon: null },
              { label: "Advertise", href: "", icon: null },
              { label: "Download App", href: "", icon: null },
            ]}
          />
          <div>
            <Link href="/cart">
              <a className={styles.cart}>
                <Cart count={Object.keys(cart.cartItems).length} />
                <span style={{ margin: "0 10px" }}>Cart</span>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
