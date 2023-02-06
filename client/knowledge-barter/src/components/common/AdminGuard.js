import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const AdminGuard = ({ children }) => {
    const { auth } = useContext(AuthContext);

    if (auth?.role !== 'administrator') {
        return <Navigate to='/' replace />
    }

    return children ? children : <Outlet />;
};

export default AdminGuard;