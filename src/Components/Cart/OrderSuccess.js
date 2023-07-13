import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { placeOrder } from '../../store';

const OrderSuccess = () => {
  const { cart, auth } = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(placeOrder(cart, navigate));
  }, []);

  return (
    <div className='mx-4 my-4'>
      <h4 className='mb-3'>Thank you for shopping with us!</h4>
      <Link to={`/user/${auth.id}`}>
        <button className='btn btn-dark'>View Orders</button>
      </Link>
    </div>
  );
};

export default OrderSuccess;