import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { editUser, updateAuth } from '../../store';

const EditUser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { auth } = useSelector((state) => state);
 
    const [firstName, setFirstName] = useState(auth.firstName || '');
    const [lastName, setLastName] = useState(auth.lastName || '');
    const [email, setEmail] = useState(auth.email || '');

    const update = (ev) => {
        ev.preventDefault();
        dispatch(updateAuth({id: auth.id, firstName, lastName, email}, navigate))
    };

    return (
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <form onSubmit={update}>
              <h1>Profile Details</h1>
              <div className='row my-4'>
                <div className='col'>
                  <label><strong>First Name</strong></label>
                  <input
                    className='form-control'
                    name='firstName'
                    defaultValue={auth.firstName}
                    onChange={ev => setFirstName(ev.target.value)}
                  />
                </div>
                <div className='col'>
                  <label><strong>Last Name</strong></label>
                  <input
                    className='form-control'
                    name='lastName'
                    defaultValue={auth.lastName}
                    onChange={ev => setLastName(ev.target.value)}
                  />
                </div>
              </div>
              <div className='row my-4'>
                <div className='col'>
                  <label><strong>Email</strong></label>
                  <input
                    className='form-control'
                    name='email'
                    defaultValue={auth.email}
                    onChange={ev => setEmail(ev.target.value)}
                  />
                </div>
              </div>
              <button className='btn btn-dark'>Save Details</button>
            </form>
          </div>
        </div>
      </div>
    );
};

export default EditUser;