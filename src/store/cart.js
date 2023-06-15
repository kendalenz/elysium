import axios from 'axios';
import { getToken } from '.';

const cart = (state = { lineItems: [] }, action) => {
  if(action.type === 'SET_CART') {
    return action.cart;
  }
  if(
    action.type === 'ADD_TO_CART' ||
    action.type === 'REMOVE_FROM_CART' ||
    action.type === 'PLACE_ORDER'
  ) {
    return { ...state, ...action.cart };
  }
  return state;
};

export const fetchCart = () => {
  return async (dispatch) => {
    const token = getToken();
    const response = await axios.get('/api/orders/cart', {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: 'SET_CART', cart: response.data });
  };
};

export const putInCart = ({ product }, quantity) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await axios.post(
      '/api/orders/cart',
      { product, quantity },
      {
        headers: {
          authorization: token,
        },
      }
    );
    dispatch({ type: 'ADD_TO_CART', cart: response.data });
  };
};

export const deleteFromCart = ({ product }, quantityToRemove) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await axios.put(
      '/api/orders/cart',
      { product, quantityToRemove },
      {
        headers: {
          authorization: token,
        },
      }
    );
    dispatch({ type: 'REMOVE_FROM_CART', cart: response.data });
  };
};

export const placeOrder = (cart, navigate) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await axios.post('api/orders', cart, {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: 'PLACE_ORDER', cart: response.data });
    navigate('/order-success');
  };
};

export default cart;