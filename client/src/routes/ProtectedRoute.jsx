import React, { useContext } from 'react';
import jwt_decode from 'jwt-decode';
import { AuthContext } from '../contexts/AuthContext';

import { Navigate, useLocation } from 'react-router-dom';

function ProtectedRoute({ children }) {
  let location = useLocation();
  let userAuthContext = useContext(AuthContext);

  function hasJWT() {
    var decodedToken;

    if (userAuthContext.currentUser?.token !== undefined) {
      decodedToken = jwt_decode(userAuthContext?.currentUser?.token);
    } else {
      return false;
    }

    const dateNow = new Date();
    if (decodedToken.exp > dateNow.getTime() / 1000) {
      return true;
    }
  }

  if (!hasJWT()) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return children;
}

export default ProtectedRoute;
