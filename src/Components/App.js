import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Routes, Route } from 'react-router-dom';
import { fetchProducts } from '../store/products';
import Home from './Home';
import Products from './Product/Products';
import Product from './Product/Product';
import Login from './Login/Login';
import User from './User/User';
import Cart from './Cart/Cart';
import Orders from './Cart/Orders';
import OrderSuccess from './Cart/OrderSuccess';

import { loginWithToken } from '../store';
import { logout } from '../store';
import { fetchCart } from '../store';
import OrderCancelled from './Cart/OrderCancelled';

import { CartElement } from '@stripe/react-stripe-js';

const App = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(loginWithToken());
  }, []);

  useEffect(() => {
    if (auth.id) {
      dispatch(fetchCart());
    }
  }, [auth]);


  return (
    <div>
      {!!auth.id ? (
        <div>
          <nav className='navbar navbar-expand-sm'>
            <Link className='navbar-brand link-dark mx-4' to='/'>Elysium</Link>
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
                  <Link className='link-dark mx-4' to='/cart'>Cart</Link>
                </li>
                <li className='nav-item'>
                  <Link className='link-dark mx-4' to='/orders'>Orders</Link>
                </li>
                <li className='nav-item'>
                  <Link className='link-dark mx-4' to={`/user/${auth.id}`}>Account</Link>
                </li>
                <li className='nav-item'>
                  <Link className='link-dark mx-4' to='#' onClick={() => dispatch(logout())}>Log Out</Link>
                </li>
              </ul>
            </div>
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path='/order-cancelled' element={<OrderCancelled />} />
            <Route path="/user/:id" element={<User />} />
          </Routes>
        </div>
      ) : (
        <div>
          <nav className='navbar navbar-expand-sm'>
            <Link className='navbar-brand link-dark mx-4' to='/'>Elysium</Link>
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
        </div>
      )}
    </div>
  )
};

export default App;