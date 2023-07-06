import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import UpdateItemQuantity from './UpdateItemQuantity';

const Cart = () => {
  const { cart, products } = useSelector((state) => state);

  const Card = (props) => {
    const { lineItem, quantity } = props; 
    return (
      <div className="card mb-2" id='cartCard'>
        <div className='row no-gutters align-items-center'>
          <div className='col-md-4 ml-2'>
            <a href={`#/products/${props.id}`}>
                <img
                  src={props.photo}
                  className="card-img ml-2"
                />
            </a>
          </div>
          <div className='col-md-8'>
            <div className='card-body'>
              <div className='mb-4'>
               <h5 className='card-title'>{props.name}</h5>
                ${props.price} each
                <br/>
                Itemized subtotal: {lineItem.quantity} x ${props.price} = ${lineItem.quantity * props.price}
              </div>
              <UpdateItemQuantity
                key={lineItem.id}
                id={lineItem.id}
                quantity={lineItem.quantity}
                productId={props.id}
              />
            </div>
          </div>
        </div>
      </div>
    )
  };

  return (
    <div className='mx-4'>
      <h1>Cart</h1>
      <div>
        <div>
          {cart.lineItems.length > 0 ? (
            cart.lineItems.map((lineItem) => {
              const product = products.find((product) => product.id === lineItem.productId);
              return (
                <div key={product.id}>
                  <div>
                    <Card
                      id={product.id}
                      key={product.id}
                      photo={product.photo}
                      name={product.name}
                      price={product.price}
                      lineItem={lineItem}
                      quantity={lineItem.quantity}
                    />
                  </div>
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