import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const Product = () => {
  const { products } = useSelector((state) => state);
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find((product) => product.id === id);
  if(!product) return <h4>...loading</h4>

  return (
    <div>
      {product.name}
    </div>
  );
};

export default Product;