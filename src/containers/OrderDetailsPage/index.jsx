import React from "react";
import * as ReactRedux from "react-redux";

import { getOrder } from "../../actions/userActions";
import Layout from "../../components/Layout";
import Card from "../../components/UI/Card";
import Price from "../../components/UI/Price";

import styles from "./index.module.css";

function OrderDetailsPage(props) {
  let { orderId } = props;
  let dispatch = ReactRedux.useDispatch();
  let orderDetails = ReactRedux.useSelector((state) => state.user?.orderDetails);
  
  // console.log(orderDetails)
  React.useEffect(() => {
    if (!orderId) {
      return;
    }
    
    const payload = {
      orderId: orderId,
    };
    dispatch(getOrder(payload));
  }, [orderId]);

  const formatDate = (date) => {
    if (date) {
      const d = new Date(date);
      return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    }
    return "";
  };

  const formatDate2 = (date) => {
    const month = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    if (date) {
      const d = new Date(date);
      return `${month[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
    }
  };

  if (!orderDetails) {
    return null
  }
  return (
    
    <Layout>
      <div
        style={{
          width: "1160px",
          margin: "10px auto",
        }}
      >
        <Card>
          <div className={styles.delAddressContainer}>
            <div className={styles.delAdrDetails}>
              <div className={styles.delTitle}>Delivery Address</div>
              <div className={styles.delName}>{}</div>
              <div className={styles.delName}>{}</div>
              <div className={styles.delPhoneNumber}>Phone number {}</div>
            </div>
            <div className={styles.delMoreActionContainer}>
              <div className={styles.delTitle}>More Actions</div>
              <div className={styles.delName}>Download Invoice</div>
            </div>
          </div>
        </Card>

        {orderDetails &&
          // orderDetails.map((orderDetail, index) => {
            orderDetails[0].items.map((item, index) => (
              <div key={index}>
                <Card
                  style={{
                    display: "flex",
                    padding: "20px 0",
                    margin: "10px 0",
                  }}
                >
                  <div className={styles.flexRow}>
                    <div className={styles.delItemImgContainer}>
                      <img src={`${process.env.PUBLIC_URL}/${item.productId.productPictures[0].image}`} alt="" />
                    </div>
                    <div style={{ width: "250px" }}>
                      <div className={styles.delItemName}>
                        {item.productId.name}
                      </div>
                      <Price value={item.payablePrice} />
                    </div>
                  </div>
                  <div style={{ padding: "25px 50px" }}>
                    <div className={styles.orderTrack}>
                      {orderDetails[0].orderStatus.map((status, index) => (
                        <div key={index}
                          className={`${styles.orderStatus} ${
                            status.isCompleted ? "active" : ""
                          }`}
                        >
                          <div
                            className={`${styles.point} ${
                              status.isCompleted ? "active" : ""
                            }`}
                          ></div>
                          <div className={styles.orderInfo}>
                            <div className={styles.status}>{status.type}</div>
                            <div className={styles.date}>
                              {formatDate(status.date)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ fontWeight: "500", fontSize: 14 }}>
                    {orderDetails[0].orderStatus[3].isCompleted &&
                      `Delivered on ${formatDate2(
                        orderDetails[0].orderStatus[3].date
                      )}`}
                  </div>
                </Card>
              </div>
            ))
                      }
      </div>
    </Layout>
  );
}

export default OrderDetailsPage;
