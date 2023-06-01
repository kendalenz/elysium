import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, Routes, Route } from 'react-router-dom';
import { fetchProducts } from '../store/products';
import Home from './Home';
import Products from './Product/Products';
import Product from './Product/Product';
import Login from './Login/Login';
import { loginWithToken } from '../store';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(loginWithToken());
  }, []);

  return (
    <div>
      <nav className='navbar navbar-expand-sm'>
        <Link className='navbar-brand link-dark mx-4' to='/'>Earthen Foods</Link>
        <button 
          type='button' 
          data-bs-toggle='collapse' 
          data-bs-target='#navbarNav' 
          className='navbar-toggler mx-4'
          aria-controls='navbarNav'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div id='navbarNav' className="collapse navbar-collapse mx-4 justify-content-end">
          <ul className='navbar-nav'>
            <li className='nav-item'>
              <Link className='link-dark mx-4' to='/products'>Shop</Link>
            </li>
            <li className='nav-item'>
              <Link className='link-dark mx-4' to='/#'>Cart</Link>
            </li>
            <li className='nav-item'>
              <Link className='link-dark mx-4' to='/login'>Log In</Link>
            </li>
          </ul>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path='/login' element={<Login />} />
      </Routes>
      {/* <Home /> */}
    </div>
  )
};

export default App;