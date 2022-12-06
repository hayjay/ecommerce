import React from "react";
import { useRouter } from "next/router";
import { IoIosArrowForward, IoIosStar, IoMdCart } from "react-icons/io";
import { AiFillThunderbolt } from 'react-icons/ai'
import { BiRupee } from 'react-icons/bi'
import * as ReactRedux from 'react-redux'
import { getProductDetailsById } from "../../actions/productAction";
import Layout from "../../components/Layout";
import { MaterialButton } from "../../components/MaterialUI";
import { addToCart } from "../../actions/cartAction";
import styles from './index.module.css'


function ProductDetailsPage(props) {

    const {productId} = props;
    const dispatch = ReactRedux.useDispatch()
    const product = ReactRedux.useSelector(state => state.product)
    const history = useRouter()
    
    React.useEffect( () => {
        // if (!productId) {
        //   return;
        // }
        console.log(productId)
        const payload = {
            params: {
                productId
            }
        }
        dispatch(getProductDetailsById(payload))
    }, [productId] )

    if (Object.keys(product.productDetails).length === 0) {
        return null;
    }
  return (
    <Layout>
    {/* <div>{product.productDetails.name}</div> */}
    `<div className={`${styles.productDescriptionContainer}`}>
      <div className={`${styles.flexRow}`}>
        <div className={`${styles.verticalImageStack}`}>
          {/* {
            product.productDetails.productPictures.map((thumb, index) => 
            <div key={index} className={`${styles.thumbnail}`}>
              <img src={`${process.env.PUBLIC_URL}/${thumb.image}`} alt={thumb.image} />
            </div>
            )
          } */}
          <div className={`${styles.thumbnail}`}>
            {
              product.productDetails.productPictures.map((thumb, index) => 
              <img src={`${process.env.PUBLIC_URL}/${thumb.image}`} alt={thumb.image}  />)
            }
          </div>
        </div>
        <div className={`${styles.productDescContainer}`}>
          <div className={`${styles.productDescImgContainer}`}>
            <img src={`${process.env.PUBLIC_URL}/${product.productDetails.productPictures[0].image}`} alt={`${product.productDetails.productPictures[0].image}`} />
          </div>

          {/* action buttons */}
          <div className={`${styles.flexRow}`}>
            <MaterialButton
              title="ADD TO CART"
              bgColor="#ff9f00"
              textColor="#ffffff"
              style={{
                marginRight: '5px'
              }}
              icon={<IoMdCart />}
              onClick={ () => {
                const{_id, name, price} = product.productDetails;
                const image = product.productDetails.productPictures[0].image;
                dispatch(addToCart({_id, name, price, image}))
                history.push('/cart')
              }}
            />
            <MaterialButton
              title="BUY NOW"
              bgColor="#fb641b"
              textColor="#ffffff"
              style={{
                marginLeft: '5px'
              }}
              icon={<AiFillThunderbolt />}
            />
          </div>
        </div>
      </div>
      <div>

        {/* home > category > subCategory > productName */}
        <div className={`${styles.breed}`}>
          <ul>
            <li><a href="#">Home</a><IoIosArrowForward /></li>
            <li><a href="#">Mobiles</a><IoIosArrowForward /></li>
            <li><a href="#">Samsung</a><IoIosArrowForward /></li>
            <li><a href="#">{product.productDetails.name}</a></li>
          </ul>
        </div>
        {/* product description */}
        <div className={`${styles.productDetails}`}>
            <p className={`${styles.productTitle}`}>{product.productDetails.name}</p>
          <div>
            <span className={`${styles.ratingCount}`}>4.3 <IoIosStar /></span>
            <span className={`${styles.ratingNumbersReviews}`}>72,234 Ratings & 8,140 Reviews</span>
          </div>
          <div className={`${styles.extraOffer}`}>Extra <BiRupee />4500 off </div>
          <div className={`${styles.flexRow}  ${styles.priceContainer}`}>
            <span className={`${styles.price}`}><BiRupee />{product.productDetails.price}</span>
            <span className={`${styles.discount}`} style={{ margin: '0 10px' }}>22% off</span>
            {/* <span>i</span> */}
            </div>
          <div>
            <p style={{ 
              color: '#212121', 
              fontSize: '14px',
              fontWeight: '600' 
              }}>Available Offers</p>
            <p style={{ display: 'flex' }}>
              <span style={{
                width: '100px',
                fontSize: '12px',
                color: '#878787',
                fontWeight: '600',
                marginRight: '20px'
            }}>Description</span>
            <span style={{
              fontSize: '12px',
              color: '#212121',
            }}>{product.productDetails.description ? product.productDetails.description : 'N/A' }</span>
            </p>
          </div>
        </div>
        

      </div>
    </div>
  </Layout>
  );
}

export default ProductDetailsPage;
