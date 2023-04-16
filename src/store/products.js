import axios from "axios";

const products = (state = [], action) => {
  if(action.type === 'GET_PRODUCTS') {
    return action.dogs;
  }
  return state;
};

const getProducts = (products) => {
  return {
    type: 'GET_PRODUCTS',
    products  
  };
};

export const fetchProducts = () => {
  return async(dispatch) => {
    const response = await axios.get('/api/products');
    dispatch(getProducts(response.data))
  };
};

export default products;
