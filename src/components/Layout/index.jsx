import React from "react";
import Head from 'next/head'
import Header from "../Header";
import MenuHeder from "../MenuHeader";

export default function Layout(props) {
  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700&family=Roboto:wght@300;400;500;700;900&display=swap" rel="stylesheet" />
        <title>Flipcart Ecom</title>

      </Head>
      <header>
        <Header />
        <MenuHeder />
      </header>
      {props.children}
    </>
  );
}
