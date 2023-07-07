import React from 'react';

const Home = () => {
  return (
    <div>
      <section className="bg-image container-fluid d-flex"> 
        <div className="align-items-center container-fluid d-flex justify-content-center">
          <div className='hero-text text-white'>
            <h1 className='h1 light-font' id='hero-heading1'>Elysium</h1>
            <h2 className='h2 light-font'>Eat right. Work hard. Feel good.</h2>
          </div> 
        </div>
      </section>
      <div className="lead" id='home-text'>
        <strong>Elysium takes great pride in being both a Certified Organic Retailer and a Certified B Corp.</strong> At Elysium, we firmly believe that nourishment is the gateway to a vibrant way of living. By means of our establishments, we strive to offer extraordinary organic goods that foster informed choices and healthier societies.
      </div>
    </div>
    )
};

export default Home;