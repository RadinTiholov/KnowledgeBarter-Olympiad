import {createContext, useEffect, useState} from 'react'
import * as coursesService from '../services/coursesService'

export const CourseContext = createContext();

export const CourseProvider = ({children}) => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        coursesService.getAll()
            .then(res => setCourses(res))
            .catch(err => alert(err))
    }, [])
    const create = (course) => {
        setCourses(state => [...state, course])
    }
    const update = (course) => {
        setCourses(state => courses.map(x => x._id === course._id ? course : x));
    }
    const delCourse = (id) => {
        setCourses(state => courses.filter(x => x._id !== id));
    }
    const select = (id) => {
        return courses.find(x => x._id === id) || {};
    };
    return (
        <CourseContext.Provider value={{courses, create, update, delCourse,select}}>
            {children}
        </CourseContext.Provider>  
    );
}