import { useContext } from "react";
import { Outlet, useParams, Navigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { CourseContext } from "../../contexts/CourseContext";

const CourseOwner = ({ children }) => {
    const { select } = useContext(CourseContext);
    const { auth, isAuthenticated } = useContext(AuthContext);
    const { id } = useParams();

    const currentCourse = select(id);

    if (isAuthenticated && auth._id !== currentCourse.owner && auth?.role !== 'administrator') {
        return <Navigate to='/course/all' replace />
    }

    return children ? children : <Outlet />;
};

export default CourseOwner;