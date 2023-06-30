import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { putInCart } from '../../store';

const AddToCart = () => {
  const { cart, products } = useSelector((state) => state);
  const { id } = useParams();
  const product = products.find((product) => product.id === id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState('');

  const addItem = async (e) => {
    e.preventDefault();
    if (!cart.userId) {
      alert('Log in or create an account');
      navigate('/login');
    }
    try {
      await dispatch(putInCart({ product }, quantity));
      navigate('/cart');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form onSubmit={addItem}>
        <div className='form-group'>
          <input
            placeholder="How many?"
            className='form-control'
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          ></input>
        </div>
        <button className='btn btn-dark mt-4'>Add to Cart</button>
      </form>
    </div>
  );
};

export default AddToCart;