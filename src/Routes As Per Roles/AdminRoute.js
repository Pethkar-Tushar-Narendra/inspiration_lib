import React, { useContext } from 'react';
import { Store } from '../Store';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const { state } = useContext(Store);
  const { inspiration_userInfo } = state;
  return inspiration_userInfo ? (
    inspiration_userInfo.isAdmin ? (
      children
    ) : (
      <Navigate to="/" />
    )
  ) : (
    <Navigate to="/" />
  );
};

export default AdminRoute;
