import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { deleteFromCart } from '../../store';
import dayjs from 'dayjs';
import CheckoutForm from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
  'pk_test_51NLrpVKklvewn0QxA0XMDMtzjGv9H2wP5lPgHVHx0frZaB5SHDkM4wI7hx36sz9cDO8YypVGnsGMZ9c7LckhdPuq00kLdMrXvn'
);

const Orders = () => {
  const { cart, products } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [amountDue, setAmountDue] = useState('');

  const appearance = {
    theme: 'stripe',
  };

  const options = {
    appearance,
  };

  const deleteProduct = (product, quantity) => {
    dispatch(deleteFromCart({ product }, quantity));
  };

  useEffect(() => {
    setAmountDue(
      cart.lineItems.reduce((acc, curr) => {
        acc += curr.product.price * curr.quantity;
        return acc;
      }, 0)
    );
  }, [cart]);

  return (
    <div id="checkout_page">
      <h1>Checkout</h1>
      <div>
        {cart.lineItems.length > 0 && cart.isCart ? (
          cart.lineItems.map((item) => {
            const book = products.find((p) => p.id === item.productId);
            const copyText = item.quantity > 1 ? 'copies' : 'copy';
            return (
              <div key={product.id}>
                <div id="checkout_info">
                  <div id="checkout_text">
                    {product.name}  ({item.quantity} {copyText} @
                    ${product.price} each)
                    <br></br>
                    <br></br>
                    <br></br>
                    <div id="checkout_buttons">
                      <div id="edit_quantity_button">
                        <button onClick={() => navigate('/cart')}>
                          Edit Quantity
                        </button>
                      </div>
                      <button onClick={() => deleteProduct(product, item.quantity)}>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <Link to="/products">
            <p>Your cart is empty — Click here to shop.</p>
          </Link>
        )}
        <br></br>
        {cart.isCart ? <><strong>Amount Due:</strong> ${Math.round(parseFloat((amountDue * Math.pow(10, 2)).toFixed(2))) / Math.pow(10, 2)}</> : ''}
      </div>
      {cart.lineItems.length > 0 && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
      <div id='past_orders_div'>
        <h2>Past Orders</h2>
        <div>
          {!cart.isCart
            ? cart.lineItems.map((item) => {
                const product = products.find((p) => p.id === item.productId);
                const copyText = item.quantity > 1 ? 'copies' : 'copy';
                return (
                  <div key={item.id}>
                    {product.name} - {item.quantity} {copyText} ordered on{' '}
                    {dayjs(cart.updatedAt).format('MM/DD/YYYY').toString()}
                  </div>
                );
              })
            : 'You have no past orders.'}
        </div>
      </div>
    </div>
  );
};

export default Orders;