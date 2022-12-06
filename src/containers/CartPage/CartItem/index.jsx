import React from 'react'
import styles from "./index.module.css";


export default function CartItem(props) {

    const [qty, setQty] = React.useState(props.cartItem.qty)

    const {_id, name, price, image} = props.cartItem;

    const onQuantityIncrement = () => { 
        setQty(qty + 1)
        props.onQuantityInc(_id, qty+1)
    }

    const onQuantityDecrement = () => {
        if (qty <= 1 ) return;
        setQty(qty - 1)
        props.onQuantityDec(_id, qty-1)
    }

   
    return (
        <div className={styles.cartItemContainer}>
             <div className={styles.flexRow}>
              <div className={styles.cartProImgContainer}>
                <img src={`${process.env.PUBLIC_URL}/${image}`} alt="" />
              </div>
              <div className={styles.cartItemDetails}>
                <div>
                    <p>{name}</p>
                    <p>NGN.{price}</p>
                </div>
                <div>Delivery in 3 - 5 days</div>
              </div>
            </div>
            <div
                style={{
                    display: 'flex',
                    margin: '5px 0'
                }}
            >
                <div className={`${styles.quantityControl}`}>
                    <button onClick={onQuantityDecrement}>-</button>
                    <input value={qty} readOnly/>
                    <button onClick={onQuantityIncrement}>+</button>
                </div>
                <button className={`${styles.cartActionBtn}`}>Save for later</button>
                <button className={`${styles.cartActionBtn}`}
                 onClick={() => props.onRemoveCartItem(_id)}
                >Remove</button>
            </div>
        </div>
    )
}


