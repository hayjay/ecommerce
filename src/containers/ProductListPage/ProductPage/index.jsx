import React from "react";
import * as ReactRedux from "react-redux";
import Image from 'next/image'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { getProductPage } from "../../../actions/productAction";
import Card from "../../../components/UI/Card";

function ProductPage({ cid, type }) {
  const dispatch = ReactRedux.useDispatch();
  const product = ReactRedux.useSelector((state) => state.product);
  const { page } = product;
  // console.log(page)
  React.useEffect(() => {
    const payload = {
      cid,
      type,
    };
    dispatch(getProductPage(payload));
  }, []);
  return (
    <div style={{margin: '0 10px'}}>
      <h1>{page.title}</h1>
      <Carousel
       renderThumbs={() => {}}
      >
          {
              page.banners && page.banners.map((banner, index) => 
               <a key={index}
                style={{display: 'block'}}
                href={banner.navigateTo}
               >
                   <img  src={banner.img} alt=""/>
               </a>
              )
          }
      </Carousel>
      <div style={{display: 'flex', 
         justifyContent: 'center',
          flexWrap: 'wrap',
          margin: '10px 0'
        }}
        >
        {
          page.products && page.products.map((product, index) => 
            <Card key={index}
             style={{
               width:'250px',
               height: '200px',
               margin: '5px'
             }}
            >
              <img style={{height: '100%',
               width: '',
               
               }} src={product.img} alt="" />
            </Card>
          )
        }
      </div>
    </div>
  );
}

export default ProductPage;
