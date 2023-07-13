import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, createUser } from '../../store';
import { useNavigate } from 'react-router-dom';

const CreateAccount = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    firstName: '',
    lastName: '',
    password: '',
    email: '',
  });

  const [error, setError] = useState({});

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const register = async (e) => {
    e.preventDefault();
    try {
      if (auth.isAdmin) {
        await dispatch(createUser(credentials));
        navigate('/users');
      } else if (!auth.id) {
        await dispatch(addUser(credentials));
        navigate('/');
      }
    } catch (err) {
      setError(err.response.data);
    }
  };

  let messages = [];
  if (error.errors) {
    messages = error.errors.map((e) => e.message);
  } else if (error.status) {
    if (error.status === 401) {
      messages.push('invalid credentials');
    } else messages.push(error.status);
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
        <div>
      {!auth.id ? <h2>Create An Account With Us!</h2> : null}
      {auth.isAdmin ? <h2>Create a New User Account</h2> : null}
      <ul>
        {messages.map((message) => {
          return <li key={message}>{message}</li>;
        })}
      </ul>
      <form onSubmit={register}>
        <div className="row">
          <div className="col-sm-6">
            <input
              placeholder="First Name"
              className="form-control mb-2"
              value={credentials.firstName}
              name="firstName"
              onChange={onChange}
            />
          </div>
          <div className="col-sm-6">
            <input
              placeholder="Last Name"
              className="form-control mb-2"
              value={credentials.lastName}
              name="lastName"
              onChange={onChange}
            />
          </div>
        </div>
        <div className="form-group">
          <input
            placeholder="Email"
            className="form-control mb-2"
            value={credentials.email}
            name="email"
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            placeholder="Password"
            type="password"
            className="form-control mb-2"
            value={credentials.password}
            name="password"
            onChange={onChange}
          />
        </div>
        {!auth.id ? (
          <button className="btn btn-dark">Create Account & Login</button>
        ) : null}
        {auth.isAdmin ? (
          <button className="btn btn-primary">Create New User</button>
        ) : null}
    </form>
    </div>
  </div>
 );
};

export default CreateAccount;