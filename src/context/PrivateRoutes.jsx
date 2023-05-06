import { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import AuthContext from './AuthProvider';

const PrivateRoutes = () => {
    const location = useLocation();
    const { auth } = useContext(AuthContext);



    if (auth === undefined) {
        return null;
    }

    return Object.keys(auth).length
        ? <Outlet />
        : <Navigate to="/login" replace state={{ from: location }} />;
}

export default PrivateRoutes;