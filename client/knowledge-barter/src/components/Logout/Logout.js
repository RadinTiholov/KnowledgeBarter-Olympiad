import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext";

export const Logout = () => {
    const navigate = useNavigate();
    const { userLogout } = useContext(AuthContext);
    useEffect(() => {
        userLogout();
        localStorage.clear();
        navigate('/');
    }, [])

    return null;
}