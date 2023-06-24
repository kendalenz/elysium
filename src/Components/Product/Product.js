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
    <div className='container'>
      <div className='row'>
        <div className='col-sm'>
        <img src={product.photo} id='productPhoto'></img>
        </div>
        <div className='col-sm'>
        <strong>{product.name}</strong>
        <br/>
        ${product.price}
        <div className='mt-4'>
          <AddToCart />
        </div>
        </div>
      </div>
    </div>
  );
};

<div className="row">
<div className="col-sm">
  <img src="/static/headshot.jpg" className='md-4' id='headshot'></img>
</div>
<div className="col-sm float-left" id='about-me-text'>
  <p>
    Kendal Enz is a fullstack software engineer with a professional background in project management, communications and writing. With an eye for design, she enjoys crafting beautiful experiences for website and application visitors. She holds an MA in Writing with a Concentration in Fiction from Johns Hopkins University, a BA in Communications with a Concentration in Journalism from Hood College and a Certificate of Software Engineering from Fullstack Academy. She is based in Brooklyn, NY, and spends her free time going on long runs through the city. 
  </p>
</div>
</div>

export default Product;