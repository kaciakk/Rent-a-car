import React, { createContext, useReducer } from 'react';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        accessToken: action.payload.accessToken,
        username: action.payload.username,
        email: action.payload.email,
        roles: action.payload.roles,
        _id: action.payload._id
      };
    case 'LOGOUT':
      return { accessToken: null, username: null, email: null, roles: null, _id: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const storedAccessToken = localStorage.getItem('accessToken');
  const storedUsername = localStorage.getItem('username');
  const storedEmail = localStorage.getItem('email');
  const storedRoles = localStorage.getItem('roles');
  const stored_Id = localStorage.getItem('_id');
  // Sprawdź, czy istnieje token dostępu w localStorage
  const initialState = storedAccessToken
    ? { accessToken: storedAccessToken, username: storedUsername, email: storedEmail, roles: storedRoles, _id: stored_Id}
    : { 
        username: null,
        accessToken: null,
        email: null,
        roles: null,
        _id: null,
      };

  const [state, dispatch] = useReducer(authReducer, initialState);

  console.log('AuthContext state:', state);
  
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};