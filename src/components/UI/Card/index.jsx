import React from "react";

import styles from "./index.module.css";

function Card(props) {
  return (
    <>
      <div className={styles.card} {...props}>
        {(props.headerleft || props.headerright) && (
          <div className={styles.cardHeader}>
            {props.headerleft && (
              <div
                style={{
                  // alignSelf: "center",
                  // fontSize: "20px",
                  // fontWeight: "500",
                }}
              >
                {props.headerleft}
              </div>
            )}
            {props.headerright && props.headerright}
          </div>
        )}
        {props.children}
      </div>
    </>
  );
}

export default Card;
