import {createContext, useEffect, useState} from 'react'
import * as authService from '../dataServices/authService'

export const ProfileContext = createContext();

export const ProfileProvider = ({children}) => {
    const [profiles, setProfiles] = useState([]);
    
    useEffect(() => {
        authService.getAllProfiles()
            .then(res => setProfiles(res))
            .catch(err => alert(err))
    }, [])

    return (
        <ProfileContext.Provider value={{profiles}}>
            {children}
        </ProfileContext.Provider>  
    );
}