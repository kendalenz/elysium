import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { placeOrder } from '../../store';

const OrderSuccess = () => {
  const { cart } = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(placeOrder(cart, navigate));
  }, []);

  return (
    <div id='order_success'>
      <h4>Thank you for shopping with us!</h4>
      <Link to="/orders">
        <button id="view_orders_btn">View Orders</button>
      </Link>
    </div>
  );
};

export default OrderSuccess;