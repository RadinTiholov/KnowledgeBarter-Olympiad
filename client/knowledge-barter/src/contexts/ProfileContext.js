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
    const getProfileByUsername = (username) => {
        return profiles.find(x => x.userName === username)
    }
    return (
        <ProfileContext.Provider value={{profiles, getProfileByUsername}}>
            {children}
        </ProfileContext.Provider>  
    );
}