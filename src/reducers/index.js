import { combineReducers } from "redux";
import authReducers from "./authReducers"
import productReducers from "./productReducers";
import categoryReducers from "./categoryReducers";
// import orderReducers from "./orderReducers";
import cartReducers from "./cartReducers";
import userReducers from './userReducers';

export default combineReducers({
  auth: authReducers,
  product: productReducers,
  category: categoryReducers,
  cart: cartReducers,
  user: userReducers
});
