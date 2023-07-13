import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const states = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming',
];

const CheckoutDetails = () => {
  const { cart } = useSelector((state) => state);
  const [addressDetails, setAddressDetails] = useState({
    shippingFirstName: '',
    shippingLastName: '',
    shippingAddressStreet1: '',
    shippingAddressStreet2: '',
    shippingAddressCity: '',
    shippingAddressState: '',
    shippingAddressZip: '',
    billingFirstName: '',
    billingLastName: '',
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
      billingFirstName: currentSetting ? '' : addressDetails.shippingFirstName,
      billingLastName: currentSetting ? '' : addressDetails.shippingLastName,
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
            name='shippingFirstName'
            placeholder='First Name'
            required
            value={addressDetails.shippingFirstName}
            onChange={onChange}
          />
        </div>
        <div className='form-group mb-2'>
          <input
            className='form-control mb-2'
            name='shippingLastName'
            placeholder='Last Name'
            required
            value={addressDetails.shippingLastName}
            onChange={onChange}
          />
        </div>
        <div className='form-group mb-2'>
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
          <select
            className='form-control'
            name='shippingAddressState'
            value={addressDetails.shippingAddressState}
            onChange={onChange}
            required
          >
            <option value=''>Select State</option>
            {states.map((state) => (
              <option value={state} key={state}>
                {state}
              </option>
            ))}
          </select>
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
        <div className='form-group'>
          <input
            className='form-control mb-2'
            name='billingFirstName'
            placeholder='First Name'
            required
            value={addressDetails.billingFirstName}
            onChange={onChange}
          />
        </div>
        <div className='form-group mb-2'>
          <input
            className='form-control mb-2'
            name='billingLastName'
            placeholder='Last Name'
            required
            value={addressDetails.billingLastName}
            onChange={onChange}
          />
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
          <select
            className='form-control'
            name='billingAddressState'
            value={addressDetails.billingAddressState}
            onChange={onChange}
          >
            <option value=''>Select State</option>
            {states.map((state) => (
              <option value={state} key={state}>
                {state}
              </option>
            ))}
          </select>
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