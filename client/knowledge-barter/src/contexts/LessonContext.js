import {createContext, useEffect, useState} from 'react'
import * as lessonsService from '../dataServices/lessonsService'

export const LessonContext = createContext();

export const LessonProvider = ({children}) => {
    const [lessons, setLessons] = useState([]);
    useEffect(() => {
        lessonsService.getAll()
            .then(res => setLessons(res))
            .catch(err => alert(err))
    }, [])
    const create = (lesson) => {
        setLessons(state => [...state, lesson])
    }
    const update = (lesson) => {
        setLessons(state => lessons.map(x => x.id === lesson.id ? lesson : x));
    }
    const delLesson = (id) => {
        setLessons(state => lessons.filter(x => x.id != id));
    }
    const select = (id) => {
        return lessons.find(x => x.id == id) || {};
    };
    return (
        <LessonContext.Provider value={{lessons, create, update, delLesson, select}}>
            {children}
        </LessonContext.Provider>  
    );
}