import React from 'react';
import { attemptLogin } from '../../store';
import { useDispatch } from 'react-redux';

const Login = () => {
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  
}

export default Login;