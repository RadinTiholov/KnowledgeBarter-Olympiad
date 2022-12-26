import { useContext, useState, useEffect } from "react"
import {AuthContext} from '../contexts/AuthContext'
import * as lessonsService from '../services/lessonsService'
import * as coursesService from '../services/coursesService'
export const useOwner = (id, isLesson) => {
    const {auth} = useContext(AuthContext)
    const [isOwner, setIsOwner] = useState(false);

    useEffect(() => {
        if(auth){
            if(isLesson){
                lessonsService.getDetails(id)
                .then(res => setIsOwner(res.owner === auth?._id))
            }else{
                coursesService.getDetails(id)
                .then(res => setIsOwner(res.owner === auth?._id))
            }
        }
    }, [])
    return [
        isOwner
    ]
}