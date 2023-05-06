import React, { useContext } from 'react'
import { useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import AuthContext from './AuthProvider'
import jwt_decode from "jwt-decode";

// function RequireAuth(props) {
function RequireAuth(props) {
    const { auth, setAuth } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const token = localStorage.getItem("auth-token");

    useEffect(() => {

        if (token) {
            let decoded = jwt_decode(localStorage.getItem('auth-token'));

            if (decoded.exp * 1000 > Date.now()) {
                setAuth(token);
            } else {
                localStorage.removeItem("auth-token");
                setAuth(localStorage.getItem('auth-token'));
            }
            // (props?.allowedRoles?.includes(decoded?.userType)) ? props.childern
            //     : navigate('/warehouses', { replace: true });
            props.childern
        }
        else {
            navigate('/login');
        }
    }, [navigate])


    if (auth === undefined) {
        return null;
    }

    let decoded;
    if (auth != null) {
        decoded = jwt_decode(auth);
    }

    return (props?.allowedRoles?.includes(decoded?.userType)) ? props.childern
        : navigate('/warehouses', { replace: true });
}

export default RequireAuth