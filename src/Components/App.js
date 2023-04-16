import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Products from './Product/Products';

const App = () => {
  return (
    <div>
      <nav className='navbar navbar-expand-sm'>
        <Link className='navbar-brand link-dark mx-4' to='/'>Earthen Foods</Link>
        <button 
          type='button' 
          data-bs-toggle='collapse' 
          data-bs-target='#navbarNav' 
          className='navbar-toggler'
          aria-controls='navbarNav'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div id='navbarNav' class="collapse navbar-collapse mx-4 justify-content-end">
          <ul className='navbar-nav'>
            <li className='nav-item'>
              <Link className='link-dark mx-4' to='/products'>Shop</Link>
            </li>
            <li className='nav-item'>
              <Link className='link-dark mx-4' to='/#'>Cart</Link>
            </li>
          </ul>
        </div>
      </nav>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/products" element={<Products />}/>
      </Routes>
      <Home />
    </div>
  )
};

export default App;