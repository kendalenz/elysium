import React, { useState } from 'react';
import { attemptLogin } from '../../store';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState({});

  const onChange = (ev) => {
    setCredentials({ ...credentials, [ev.target.name]: ev.target.value });
  };

  const navigate = useNavigate();
  
  const login = async(ev) => {
    ev.preventDefault();
    try {
      await dispatch(attemptLogin(credentials));
      navigate('/');
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
    <div>
      <form onSubmit={login}>
        <div className="form-group">
          <label>Email address</label>
          <input type="email" className="form-control" placeholder="Enter email" value={credentials.email} name='email' onChange={ onChange }/>
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" placeholder="Password" value={credentials.password} name='password' onChange={ onChange }/>
        </div>
        <button type="submit" className="btn btn-primary">Log in</button>
      </form>
    </div>
  );
};

export default Login;