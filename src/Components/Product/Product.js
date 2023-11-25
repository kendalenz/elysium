import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import AddToCart from '../Cart/AddToCart';

const Product = () => {
  const { products } = useSelector((state) => state);
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find((product) => product.id === id);
  if(!product) return <h4>...loading</h4>

  return (
    <div className='container mt-4'>
      <div className='row'>
        <div className='col-sm d-flex justify-content-center'>
        <img src={product.photo} className='img-fluid' id='productPhoto'></img>
        </div>
        <div className='col-sm'>
        <strong>{product.name}</strong>
        <br/>
        ${product.price}
        <br/>
        <br/>
        {product.description}
        <div className='mt-4'>
          <AddToCart />
        </div>
        </div>
      </div>
    </div>
  );
};

export default Product;