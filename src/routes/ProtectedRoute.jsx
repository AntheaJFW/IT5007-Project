import React, { useContext } from 'react';
import jwt_decode from 'jwt-decode';
import { AuthContext } from '../contexts/AuthContext';

import { Navigate, useLocation } from 'react-router-dom';

function ProtectedRoute({ children }) {
  let location = useLocation();
  let userAuthContext = useContext(AuthContext);

  function hasJWT() {
    let flag = false;
    var decodedToken;

    if (userAuthContext?.currentUser?.token !== undefined) {
      decodedToken = jwt_decode(userAuthContext.currentUser.token);
    } else if (localStorage.getItem('userGlobals') !== null) {
      const userGlobals = localStorage.getItem('userGlobals');
      decodedToken = jwt_decode(JSON.parse(userGlobals).token);
    }
    if (decodedToken === undefined) return false;

    const dateNow = new Date();
    if (decodedToken.exp > dateNow.getTime() / 1000) {
      console.log('token not expired, considered valid', decodedToken);
      flag = true;
    }

    return flag;
  }

  if (!hasJWT()) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return children;
}

export default ProtectedRoute;
