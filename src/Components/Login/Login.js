import React, { useState } from 'react';
import { attemptLogin } from '../../store';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({
    username: '',
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

}

export default Login;