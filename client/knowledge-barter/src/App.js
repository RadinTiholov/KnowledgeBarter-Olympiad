import './App.css';
import {
    Routes,
    Route
} from "react-router-dom";

import { BoughtCourses } from './components/BoughtCourses/BoughtCourses';
import { BoughtLessons } from './components/BoughtLessons/BoughtLessons';
import { Courses } from './components/Courses/Courses';
import { CreateCourse } from './components/CreateCourse/CreateCourse';
import { CreateLesson } from './components/CreateLesson/CreateLesson';
import { EditCourse } from './components/EditCourse/EditCourse';
import { EditLesson } from './components/EditLesson/EditLesson';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { Home } from './components/Home/Home';
import { Lessons } from './components/Lessons/Lessons';
import { Login } from './components/Login/Login';
import { Profile } from './components/Profile/Profile';
import { Register } from './components/Register/Register';
import { YourCourses } from './components/YourCourses/YourCourses';
import { YourLessons } from './components/YourLessons/YourLessons';
import { DetailsLesson } from './components/DetailsLesson/DetailsLesson';
import { DetailsCourse } from './components/DetailsCourse/DetailsCourse';
import { Liked } from './components/Liked/Liked';
import { LessonProvider } from './contexts/LessonContext';
import { CourseProvider } from './contexts/CourseContext';
import { AuthProvider } from './contexts/AuthContext';
import { Logout } from './components/Logout/Logout';
import { NotFound } from './components/NotFound/NotFound';
import GuestGuard from './components/common/GuestGuard';
import UserGuard from './components/common/UserGuard';
import LessonOwner from './components/common/LessonOwner';
import CourseOwner from './components/common/CourseOwner';
import { SendEmail } from './components/SendEmail/SendEmail';
import { Comments } from './components/Comments/Comments';
import AdminGuard from './components/common/AdminGuard';
import { About } from './components/About/About';

function App() {
    return (
        <>
            <AuthProvider>
                <Header />
                <CourseProvider>
                    <LessonProvider>
                        <section id='main'>
                            <Routes>
                                <Route path='/' element={<Home />} />
                                <Route path='/about' element={<About />} />
                                <Route path='/course/all' element={<Courses />} />
                                <Route path='/lesson/all' element={<Lessons />} />
                                <Route path='/lesson/details/:id' element={<DetailsLesson />} />
                                <Route path='/course/details/:courseId/:lessonId' element={<DetailsCourse />} />
                                <Route element={<GuestGuard />}>
                                    <Route path='/logout' element={<Logout />} />
                                    <Route path='/profile/:id' element={<Profile />} />
                                    <Route path='/lesson/create' element={<CreateLesson />} />
                                    <Route path='/lesson/bought' element={<BoughtLessons />} />
                                    <Route path='/lesson/yours' element={<YourLessons />} />
                                    <Route path='/course/create' element={<CreateCourse />} />
                                    <Route path='/course/bought' element={<BoughtCourses />} />
                                    <Route path='/course/yours' element={<YourCourses />} />
                                    <Route path='/liked' element={<Liked />} />
                                    <Route path='/lesson/contact/:id' element={<SendEmail />} />
                                </Route>
                                <Route element={<LessonOwner />}>
                                    <Route path='/lesson/edit/:id' element={<EditLesson />} />
                                </Route>
                                <Route element={<CourseOwner />}>
                                    <Route path='/course/edit/:id' element={<EditCourse />} />
                                </Route>
                                <Route element={<AdminGuard />}>
                                    <Route path='/comment/all' element={<Comments />} />
                                </Route>
                                <Route element={<UserGuard />}>
                                    <Route path='/login' element={<Login />} />
                                    <Route path='/register' element={<Register />} />
                                </Route>
                                <Route path='*' element={<NotFound />} />
                            </Routes>
                        </section>
                    </LessonProvider>
                </CourseProvider>
            </AuthProvider>
            <Footer />
        </>

    );
}

export default App;
