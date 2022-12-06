import { cartConstants } from "../actions/types";

const initialState = {
    cartItems: {
        // 123: {
        //     _id: 123,
        //     name: "Samsung mobile",
        //     image: 'some.jpg',
        //     price: 200,
        //     qty: 2
        // }
    },
    updatingCart: false,
    error: null
}

export default function(state=initialState, action) {
    switch (action.type) {
        case cartConstants.ADD_TO_CART_REQUEST:
            return {
                ...state,
                updatingCart: true
            };
        case cartConstants.ADD_TO_CART_SUCCESS:
            return {
                ...state,
                cartItems: action.payload.cartItems,
                updatingCart: false
            }
        case cartConstants.ADD_TO_CART_FAILURE:
            return {
                ...state,
                updatingCart: false,
                error: action.payload.error
            } 
        case cartConstants.RESET_CART:
            return {
                ...state,
                cartItems: {},
                updatingCart: false,
                error: null,
            }
        default:
            return state
            
    }
}
