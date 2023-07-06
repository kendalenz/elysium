import React, { useState } from 'react';
import { attemptLogin } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';

const Login = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState({});

  // const onChange = (ev) => {
  //   setCredentials({ ...credentials, [ev.target.name]: ev.target.value });
  // };

  const onChange = (ev) => {
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [ev.target.name]: ev.target.value,
    }));
  };

  const login = (ev) => {
    ev.preventDefault();
    try {
      dispatch(attemptLogin(credentials, navigate));
      // navigate('/');
    } catch(err) {
        setError(err.response.data);
    }
  };

  let messages = [];
    if(error.errors) {
      messages = error.errors.map((e) => e.message);
    } else if(error.status) {
      if (error.status === 401) {
        messages.push('invalid credentials');
     } else messages.push(error.status);
  };

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
    <form id='login-form'onSubmit={login}>
      <h1 className='light-font'>Welcome to Earthen Foods</h1>
      <hr></hr>
      <div className="form-group">
        <label className='mt-4 light-font'>Email</label>
        <input className="form-control" value={credentials.email} onChange={onChange} name='email' />
      </div>
      <div className="form-group">
        <label className='mt-4 light-font'>Password</label>
        <input className="form-control" value={credentials.password} onChange={onChange} name='password' />
      </div>
      <button type="submit" className="btn btn-primary btn-light mt-4" onClick={login}>Log in</button>
    </form>
  </div>
  );
};

export default Login;