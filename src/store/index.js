import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import auth from './auth';
import products from "./products";
import cart from './cart';

// import users from './users';

export const getToken = () => {
  return window.localStorage.getItem('token');
};

export const setToken = (data) => {
  return window.localStorage.setItem('token', data);
};

const reducer = combineReducers({
  auth,
  products, 
  cart
  // users
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;

export * from './auth';
export * from './products';
export * from './cart';
// export * from './users';