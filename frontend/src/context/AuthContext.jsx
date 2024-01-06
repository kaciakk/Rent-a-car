import { createContext, useReducer } from 'react'

export const AuthContext = createContext()

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
  const [state, dispatch] = useReducer(authReducer, { 
    username: null,
    accessToken: null,
    email: null,
    roles: null,
    _id: null,
  })

  console.log('AuthContext state:', state)
  
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AuthContext.Provider>
  )

}