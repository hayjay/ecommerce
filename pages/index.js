import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { isUserLoggedIn } from '../src/actions/authActions';

// import styles from "../styles/Home.module.css";
import HomePage from "../src/containers/Home";

export default function Home() {

  return (
    <div>
      <HomePage />
    </div>
  );
}
