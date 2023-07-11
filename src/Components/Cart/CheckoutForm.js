import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CheckoutDetails = () => {
  const { cart } = useSelector((state) => state);
  const [addressDetails, setAddressDetails] = useState({
    shippingAddressStreet1: '',
    shippingAddressStreet2: '',
    shippingAddressCity: '',
    shippingAddressState: '',
    shippingAddressZip: '',
    billingSameAsShipping: false,
    billingAddressStreet1: '',
    billingAddressStreet2: '',
    billingAddressCity: '',
    billingAddressState: '',
    billingAddressZip: '',
  });

  const onChange = (e) => {
    setAddressDetails({
      ...addressDetails,
      [e.target.name]: e.target.value,
    });
  };

  const setBillingSameAsShipping = (e) => {
    const currentSetting = addressDetails.billingSameAsShipping;
    setAddressDetails({
      ...addressDetails,
      billingSameAsShipping: !currentSetting,
      billingAddressStreet1: currentSetting ? '' : addressDetails.shippingAddressStreet1,
      billingAddressStreet2: currentSetting ? '' : addressDetails.shippingAddressStreet2,
      billingAddressCity: currentSetting ? '' : addressDetails.shippingAddressCity,
      billingAddressState: currentSetting ? '' : addressDetails.shippingAddressState,
      billingAddressZip: currentSetting ? '' : addressDetails.shippingAddressZip,
    });
  };

  const checkout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/create-checkout-session', cart);
      window.open(response.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <form onSubmit={checkout}>
      <div className='my-4'>
        <h3>Shipping Address</h3>
        <div className='form-group'>
          <input
            className='form-control mb-2'
            name='shippingAddressStreet1'
            placeholder='Street'
            required
            value={addressDetails.shippingAddressStreet1}
            onChange={onChange}
          />
        </div>
        <div className='form-group mb-2'>
          <input
            className='form-control'
            name='shippingAddressStreet2'
            placeholder='Unit/Apt/Floor (optional)'
            value={addressDetails.shippingAddressStreet2}
            onChange={onChange}
          />
        </div>
        <div className='form-group mb-2'>
          <input
            className='form-control'
            name='shippingAddressCity'
            placeholder='City'
            required
            value={addressDetails.shippingAddressCity}
            onChange={onChange}
          />
        </div>
        <div className='form-group mb-2'>
          <input
            className='form-control'
            name='shippingAddressState'
            placeholder='State'
            required
            value={addressDetails.shippingAddressState}
            onChange={onChange}
          />
        </div>
        <div className='form-group mb-4'>
          <input
            className='form-control'
            name='shippingAddressZip'
            placeholder='Zip Code'
            required
            value={addressDetails.shippingAddressZip}
            onChange={onChange}
          />
        </div>
        <h3>Billing Address</h3>
        <div className='form-group mb-2'>
          <div className='form-check'>
            <input
              className='form-check-input'
              type='checkbox'
              name='same-as-shipping'
              value={addressDetails.billingSameAsShipping}
              onChange={setBillingSameAsShipping}
              id='same-as-shipping'
            />
            <label className='form-check-label' htmlFor='same-as-shipping'>
              Same as Shipping Address?
            </label>
          </div>
        </div>
        <div className='form-group mb-2'>
          <input
            className='form-control'
            name='billingAddressStreet1'
            placeholder='Street'
            value={addressDetails.billingAddressStreet1}
            onChange={onChange}
          />
        </div>
        <div className='form-group mb-2'>
          <input
            className='form-control'
            name='billingAddressStreet2'
            placeholder='Unit/Apt/Floor (optional)'
            value={addressDetails.billingAddressStreet2}
            onChange={onChange}
          />
        </div>
        <div className='form-group mb-2'>
          <input
            className='form-control'
            name='billingAddressCity'
            placeholder='City'
            value={addressDetails.billingAddressCity}
            onChange={onChange}
          />
        </div>
        <div className='form-group mb-2'>
          <input
            className='form-control'
            name='billingAddressState'
            placeholder='State'
            value={addressDetails.billingAddressState}
            onChange={onChange}
          />
        </div>
        <div className='form-group mb-4'>
          <input
            className='form-control'
            name='billingAddressZip'
            placeholder='Zip Code'
            value={addressDetails.billingAddressZip}
            onChange={onChange}
          />
        </div>
      </div>
      <button className='btn btn-dark'>Checkout</button>
    </form>
  );
};

const Message = ({ message }) => {
  return (
    <section>
      <p>{message}</p>
    </section>
  );
};

const CheckoutForm = () => {
  const [message, setMessage] = useState('');
  const { cart } = useSelector((state) => state);
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    if (query.get('success')) {
      setMessage('Order placed! You will receive an email confirmation.');
    }

    if (query.get('canceled')) {
      setMessage(
        "Order cancelled. Continue to shop and checkout when you're ready."
      );
      navigate('/order-cancelled');
    }
  }, []);

  return message ? (
    <Message message={message} />
  ) : cart.isCart ? (
    <CheckoutDetails />
  ) : (
    ''
  );
};

export default CheckoutForm;