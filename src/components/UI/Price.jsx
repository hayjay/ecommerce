
import React from "react";
// import { B } from "react-icons/bi";

/**
 * @author
 * @function Price
 **/

const Price = (props) => {
  return (
    <div
      style={{
        fontSize: props.fontSize ? props.fontSize : "14px",
        fontWeight: "bold",
        margin: "5px 0",
      }}
    >
      {/* <BiDollar /> */}
      &#8358;
      {props.value}
    </div>
  );
};

export default Price;