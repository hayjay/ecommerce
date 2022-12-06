import React from "react";
import * as ReactRedux from "react-redux";
import Link from "next/link";
import { getProductsBySlug } from "../../../actions/productAction";

import style from "../index.module.css";
import Card from "../../../components/UI/Card";
import { MaterialButton } from "../../../components/MaterialUI";
import Price from "../../../components/UI/Price";

function ProductStore({ slug }) {

  const product = ReactRedux.useSelector((state) => state.product);
  const [priceRange, setPriceRange] = React.useState(product.priceRange);

  const dispatch = ReactRedux.useDispatch();
  React.useEffect(() => {
    if (!slug) {
      return;
    }
    console.log(slug);
    dispatch(getProductsBySlug(slug));
  }, [slug]);
  return (
    <>
      {Object.keys(product.productsByPrice).map((key, index) => {
        return (
          <Card key={index}
           headerleft={`${slug} mobile under ${priceRange[key]}`}
           headerright={<MaterialButton
             title={"View All"}
             style={{
               width: '96px',
               fontSize: '12px'
             }}
             bgColor='#2874f0'
            />}
           style={{width: 'cal(100% - 40px)',
             margin: '20px'
           }}
           
          >
            <div style={{ display: "flex" }}>
              {product.productsByPrice[key].map((product) => (
                <div key={product._id} className={style.productContainer}>
                  <Link href={{pathname:"[slug]/[productId]/p"}}
                    as={`${product.slug}/${product._id}/p`}>
                    <a>
                      <div className={style.productImgContainer}>
                        <img
                          src={`${process.env.PUBLIC_URL}/${product.productPictures[0].image}`}
                          alt=""
                        />
                      </div>
                      <div className={style.productInfo}>
                        <div style={{ margin: "5px 0" }}>{product.name}</div>
                        <div>
                          <span>4.3</span> &nbsp;
                          <span>3553</span>
                        </div>
                        
                        <div className={style.productPrice}>
                         <Price value={product.price} /> 
                        </div>
                      </div>
                    </a>
                  </Link>
                </div>
              ))}
            </div>
          </Card>
        );
      })}
    </>
  );
}

export default ProductStore;
