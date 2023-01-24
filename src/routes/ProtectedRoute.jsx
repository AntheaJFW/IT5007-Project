import React from 'react';

import { Navigate, useLocation } from 'react-router-dom';

function ProtectedRoute({children}) {
    let location = useLocation();
    function hasJWT() {
        console.log("ran check")
        let flag = false;

        // Need to implement express side, maybe check header
        // Authorization: Bearer <token>
        localStorage.getItem("token") ? flag=true : flag=false;

        return flag
    }

    if (!hasJWT()) {
        return <Navigate to="/login" state={{from: location}} />
    }

    return children;
}

export default ProtectedRoute;