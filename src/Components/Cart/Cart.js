import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import UpdateItemQuantity from './UpdateItemQuantity';

const Cart = () => {
  const { cart, products } = useSelector((state) => state);

  return (
    <div id='cart_page'>
      <h1>Cart</h1>
      <div>
        <div>
          {cart.lineItems.length > 0 ? (
            cart.lineItems.map((lineItem) => {
              const product = products.find((product) => product.id === lineItem.productId);
              return (
                <div key={product.id}>
                  <img></img>
                  <pre>
                    {product.name} 
                    <br/> 
                    ${product.price}
                    <br/>
                    (You have {lineItem.quantity} in your cart)
                  </pre>
                  <UpdateItemQuantity
                    key={lineItem.id}
                    id={lineItem.id}
                    quantity={lineItem.quantity}
                    productId={product.id}
                  />
                </div>
              );
            })
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
        <div id="cart-actions">
          <div>
            <Link to="/products">
              <button className="buy_btn">Buy More</button>
            </Link>
          </div>
          <br />
          <div>
            <Link to="/orders">
              <button
                className="checkout_btn"
                disabled={cart.lineItems.length === 0}
              >
                Checkout
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;