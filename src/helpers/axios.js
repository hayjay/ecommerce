import axios from "axios";
import { authConstant } from "../actions/types";
import store from '../store'

export const api = process.env.api;

let token
// const token = store.getState().auth.token ;
const isServer = typeof window === 'undefined'
if (!isServer) {
  token = localStorage.getItem('token')
} 
// console.log("token", token)

const axiosInstance = axios.create({
  baseURL: api,
  headers: {
    "x-auth-token": token ? token : ""
  }
});
// if (token) axiosInstance.defaults.headers['x-auth-token'] = token
axiosInstance.interceptors.request.use(req => {
  const {auth} = store.getState();
  if (auth.token) {
    req.headers["x-auth-token"] = token;
  }
  return req;
})
axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    console.log(error.response);
    const status = error.response ? error.response.status : 500
    if (status && status == 500){
      // if (!isServer) {
        localStorage.clear();
        store.dispatch({type: authConstant.LOGOUT_SUCCESS});
      // } 
    }
    return Promise.reject(error)
  }
  )
export default axiosInstance;
