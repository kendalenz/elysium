import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const User = () => {
  const { auth, cart, products } = useSelector((state) => state);

  const { id } = useParams();;

  return (
    <div className='mx-4'>
      <hr></hr>
        {auth.firstName}
        <div>
        <h2>Past Orders</h2>
        <div>
          {!cart.isCart
            ? cart.lineItems.map((item) => {
                const product = products.find((p) => p.id === item.productId);
                const copyText = item.quantity > 1 ? 'items' : 'item';
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

export default User;