import { useContext, useState, useEffect } from "react"
import {AuthContext} from '../contexts/AuthContext'
import * as lessonsService from '../dataServices/lessonsService'
import * as coursesService from '../dataServices/coursesService'
export const useOwner = (id, isLesson) => {
    const {auth} = useContext(AuthContext)
    const [isOwner, setIsOwner] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if(auth){
            if(isLesson){
                lessonsService.getDetails(id)
                .then(res => {
                    setIsOwner(res.owner == auth?._id || auth?.role === 'administrator')

                    setIsLoading(false);
                })
            }else{
                coursesService.getDetails(id)
                .then(res => {
                    setIsOwner(res.owner == auth?._id || auth?.role === 'administrator')
                
                    setIsLoading(false);
                })
            }
        }else{
            setIsLoading(false);
        }
    }, [id])
    return [
        isOwner,
        isLoading
    ]
}