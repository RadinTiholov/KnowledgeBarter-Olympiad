import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext";
import * as authService from "../../services/authService" 

export const Logout = () => {
    const navigate = useNavigate();
    const {auth,userLogout} = useContext(AuthContext);
    useEffect(() => {
        authService.logout({accessToken: auth.accessToken})
            .then(res => {
                userLogout();
                localStorage.clear();
                navigate('/');
            })
            .catch(() => {
                navigate('/')
            })
    }, [])

    return null;
}