import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';


const UserGuard = ({children}) => {
    const { isAuthenticated } = useContext(AuthContext);
    if (isAuthenticated) {
        return <Navigate to="/" replace />
    }

    return children ? children : <Outlet />  
};

export default UserGuard;