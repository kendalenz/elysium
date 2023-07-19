import axios from 'axios';
import { getToken, setToken } from '.';

const auth = (state = {}, action) => {
  if(action.type === 'SET_AUTH') {
    return action.auth;
  }
  if(action.type === 'UPDATE_AUTH') {
    state = { ...state, auth: action.auth };
  }
  return state;
};

export const logout = () => {
  window.localStorage.removeItem('token');
  return { type: 'SET_AUTH', auth: {} };
};

// export const logout = (navigate) => {
//   return async(dispatch) => {
//     console.log('Navigate function:', navigate);

//     window.localStorage.removeItem('token');
//     dispatch({ type: 'SET_AUTH', auth: {} });
//     navigate('/');
//   };
// };

export const loginWithToken = () => {
  return async(dispatch) => {
    const token = getToken();
    if(token) {
      const response = await axios.get('/api/auth', {
        headers: {
          authorization: token,
        },
      });
      dispatch({ type: 'SET_AUTH', auth: response.data });
    }
  };
};

export const updateAuth = (auth, navigate)=> {
  return async(dispatch)=> {
    const token = window.localStorage.getItem('token');
    const response = await axios.put('/api/auth', auth, {
      headers: {
        authorization: token
      }
    });
    dispatch({ type: 'SET_AUTH', auth: response.data });
    navigate(`/users/${auth.id}`);
  };
};

export const attemptLogin = (credentials, navigate) => {
  return async(dispatch) => {
    const response = await axios.post('/api/auth', credentials);
    window.localStorage.setItem('token', response.data);
    dispatch(loginWithToken());
    navigate(-1);
  };
};

export const register = (credentials)=> {
  return async(dispatch)=> {
    const response = await axios.post('/api/auth/register', credentials);
    window.localStorage.setItem('token', response.data);
    dispatch(loginWithToken());
  };
};

export const editUser = (user, navigate) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await axios.put('/api/users', user, {
      headers: { authorization: token },
    });
    dispatch({ type: 'UPDATE_AUTH', auth: response.data });
    navigate(`/users/${response.data.id}`);
  };
};

export const addUser = (credentials) => {
  return async (dispatch) => {
    const response = await axios.post('/api/auth/register', credentials);
    setToken(response.data);
    dispatch(loginWithToken());
  };
};

//add delete

export default auth;
