import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const User = () => {
  const { auth } = useSelector((state) => state);
  const { id } = useParams();;

  return (
    <div className='mx-4'>
      <hr></hr>
        {auth.firstName}
    </div>
  );
};

export default User;