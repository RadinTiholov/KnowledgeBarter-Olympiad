import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';


const GuestGuard = ({children}) => {
    const { isAuthenticated } = useContext(AuthContext);
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    return children ? children : <Outlet />  
};

export default GuestGuard;