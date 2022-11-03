import React, { Children, useContext } from 'react';
import { Store } from '../Store';
import { Navigate } from 'react-router-dom';

const LoginUserRoutes = ({ children }) => {
  const { state } = useContext(Store);
  const { inspiration_userInfo } = state;
  return inspiration_userInfo ? children : <Navigate to="/" />;
};

export default LoginUserRoutes;
