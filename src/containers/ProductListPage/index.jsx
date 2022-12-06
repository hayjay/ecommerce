import React from "react";
import Layout from "../../components/Layout";
import style from "./index.module.css";
import ProductPage from "./ProductPage";
import ProductStore from "./ProductStore";


export default function ProductListPage(props) {
  const {type} = props
  

  const renderProduct = () => {
    // console.log(props)
    let content = null
    switch(type) {
      case 'store':
        content = <ProductStore  {...props} />
        break
      case 'page':
        content = <ProductPage {...props} />
        break
      default:
        content = null
    }
    return content;
  }
  return (
    <Layout>
      {renderProduct()}
    </Layout>
  );
}
