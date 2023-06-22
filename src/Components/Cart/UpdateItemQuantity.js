import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFromCart, putInCart } from '../../store';

const UpdateItemQuantity = (props) => {
  const { cart, products } = useSelector((state) => state);
  const dispatch = useDispatch();
  const product = products.find((p) => p.id === props.productId);
  const item = cart.lineItems.find((item) => item.id === props.id);
  const [quantity, setQuantity] = useState(item.quantity);

  const updateQuantity = async (e) => {
    e.preventDefault();
    if (quantity < 0) {
      alert('Enter a positive number!');
      setQuantity(item.quantity)
      throw new Error('invalid quantity');
    }
    try {
      if (quantity > item.quantity) {
        const quantityToAdd = quantity - item.quantity;
        await dispatch(putInCart({ product }, quantityToAdd)); 
      } else {
        const quantityToRemove = item.quantity - quantity;
        await dispatch(deleteFromCart({ product }, quantityToRemove));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form onSubmit={updateQuantity}>
        <label htmlFor="quantity">Update Quantity</label>
        <input
          type="number"
          name="quantity"
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
        <button>Update Cart</button>
      </form>
    </div>
  );
};

export default UpdateItemQuantity;