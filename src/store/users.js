import axios from 'axios';

const users = (state = [], action) => {
  if (action.type === 'SET_USERS') {
    state = action.users;
  }
//   if (action.type === 'UPDATE_ADMIN') {
//     state = state.map((user) =>
//       user.id === action.user.id ? action.user : user
//     );
//   }
  if (action.type === 'CREATE_USER') {
    state = [...state, action.user];
  }
  if (action.type === 'DELETE_USER') {
    state = state.filter((user) => user.id !== action.user.id);
  }
  return state;
};

export const fetchUsers = () => {
  return async (dispatch) => {
    const response = await axios.get('/api/users');
    dispatch({ type: 'SET_USERS', users: response.data });
  };
};

// export const editIsAdmin = (user) => {
//   return async (dispatch) => {
//     const response = await axios.put(`/api/users/${user.id}`, user);
//     dispatch({ type: 'UPDATE_ADMIN', user: response.data });
//   };
// };

export const createUser = (user) => {
  return async (dispatch) => {
    const response = await axios.post(`/api/users`, user);
    dispatch({ type: 'CREATE_USER', user: response.data });
  };
};

// export const adminDeleteUser = (user) => {
//   return async (dispatch) => {
//     await axios.delete(`/api/users/${user.id}`);
//     dispatch({ type: 'DELETE_USER', user });
//   };
// };

export default users;