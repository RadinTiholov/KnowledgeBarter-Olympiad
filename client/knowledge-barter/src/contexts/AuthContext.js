import { createContext } from "react";
import { useAuth } from "../hooks/useAuth";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useAuth('auth', null);

    const userLogin = (authData) => {
        setAuth(authData);
    };
    const updatePoints = (points) => {
        let temp = {...auth}
        temp.kbpoints += points;  
        setAuth(temp);
    };

    const userLogout = () => {
        setAuth(null);
    };

    return (
        <AuthContext.Provider value={{auth, userLogin, userLogout, updatePoints, isAuthenticated: !!auth?.accessToken}}>
            {children}
        </AuthContext.Provider>  
    );
}