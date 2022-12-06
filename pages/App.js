import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn } from '../src/actions/authActions';
import {updateCart } from '../src/actions/cartAction';

function App() {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth)

    React.useEffect(() => {
      if (!auth.authenticated) {
        dispatch(isUserLoggedIn());
      }
    }, [auth.authenticated]);
    React.useEffect( () => {
      // dispatch(getCartItems())
      dispatch(updateCart())
    }, [auth.authenticated])
    return null
}

export default App
