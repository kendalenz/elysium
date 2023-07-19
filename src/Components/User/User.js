import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';

const User = () => {
  const { auth, cart, products } = useSelector((state) => state);

  const { id } = useParams();;

  return (
    <div className='container my-4'>
      <div className='row'>
        <div className='col-12'>
          <h2>Account Overview</h2>
          <hr/>
          <h4>Profile Details</h4>
          {auth.firstName} {auth.lastName}
          <br/>
          {auth.email}
          <br/>
          <Link to={`/users/${auth.id}/edit`}>Edit Details</Link>
        </div>
      </div>
      <div className='row'>
        <div className='col-12'>
          <hr/>
          <h4>Past Orders</h4>
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
  </div>
  );
};

export default User;