import { useState } from "react"

export const useAuth = (key, value) => {
    const [auth, setAuth] = useState(() => {
        const storedData = localStorage.getItem(key);

        return storedData ? JSON.parse(storedData) : value;
    });

    function setAuthValue(newValue){
        setAuth(newValue)

        localStorage.setItem(key, JSON.stringify(newValue));
    }

    return [
        auth,
        setAuthValue
    ]
}