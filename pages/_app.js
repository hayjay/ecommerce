import React from "react";
import { Provider, useDispatch } from "react-redux";

import "../styles/globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import store from "../src/store";
import App from "./App.js";


if (process.browser) {
  window.store = store;
}
function MyApp({ Component, pageProps }) {
  
  return (
    <Provider store={store}>
      <App />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
