import { useContext } from "react";
import { Outlet, useParams, Navigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { LessonContext } from "../../contexts/LessonContext";

const LessonOwner = ({ children }) => {
    const { select } = useContext(LessonContext);
    const { auth } = useContext(AuthContext);
    const { id } = useParams();

    const currentLesson = select(id);
    if (auth?._id !== currentLesson.owner) {
        return <Navigate to='/lesson/all' replace />
    }

    return children ? children : <Outlet />;
};

export default LessonOwner;