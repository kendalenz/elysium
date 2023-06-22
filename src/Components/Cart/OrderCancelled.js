import React from 'react';

const OrderCancelled = () => {
  return (
    <div id="order_cancelled">
      <h4>
        Aw, snap! Go toss some more products in your cart and checkout when you're
        ready!
      </h4>
      <Link to="/products">
        <button className="buy_btn">Buy More!</button>
      </Link>
    </div>
  );
};

export default OrderCancelled;