import React from "react";
import Link from "next/link";
import * as ReactRedux from "react-redux";
import { IoIosArrowForward } from "react-icons/io";
import { BiRupee } from "react-icons/bi";

import { getOrders } from "../../actions/userActions";
import Layout from "../../components/Layout";
import { Breed } from "../../components/MaterialUI";
import Card from "../../components/UI/Card";
import styles from "./index.module.css";
import Price from "../../components/UI/Price";

function OrderPage() {
  const dispatch = ReactRedux.useDispatch();
  const auth = ReactRedux.useSelector((state) => state.auth);
  const user = ReactRedux.useSelector((state) => state.user);

  React.useEffect(() => {
    auth.authenticated && dispatch(getOrders());
  }, [auth.authenticated]);
  return (
    <Layout>
      <div style={{ maxWidth: "1168px", margin: "5px auto" }}>
        <Breed
          breed={[
            { name: "Home", href: "/" },
            { name: "My Account", href: "/account" },
            { name: "My Orders", href: "/account/orders" },
          ]}
          breedIcon={<IoIosArrowForward />}
        />

        {user.orders.map((order) => {
          return order.items.map((item, index) => (
            <div key={index}>
            <Card style={{ display: "block", margin: "5px auto" }}>
              <Link
                href={`/order_details/${order._id}`}
                className={`${styles.orderItemContainer}`}
              >
                <a>
                  <div className={styles.orderImgContainer}>
                    <img
                      className={styles.orderImg}
                      src={`${process.env.PUBLIC_URL}/${item.productId.productPictures[0].image}`}
                      alt=""
                    />
                  </div>
                  <div className={styles.orderRow}>
                    <div className={styles.orderName}>
                      {item.productId.name}
                    </div>
                    <div className={styles.orderPrice}>
                      {" "}
                      <Price value={item.payablePrice} />
                    </div>
                    <div>{order.paymentStatus}</div>
                  </div>
                </a>
              </Link>
            </Card>
            </div>
          ));
        })}
      </div>
    </Layout>
  );
}

export default OrderPage;
