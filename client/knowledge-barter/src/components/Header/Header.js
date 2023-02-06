import './Header.css'
import logo from '../../images/logo.png'
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
export const Header = () => {
    const { isAuthenticated, auth } = useContext(AuthContext);
    const [search, setSearch] = useState();
    const [selection, setSelection] = useState('Lesson');
    const navigate = useNavigate();

    const onChange = (e) => {
        setSearch(e.target.value)
    }

    const changeSelection = (e) => {
        setSelection(e.target.innerText)
    }

    const onSearch = (e) => {
        e.preventDefault();

        if (search !== '') {
            navigate(`/${selection.toLowerCase()}/all?search=${search}`);
        } else {
            navigate(`/${selection.toLowerCase()}/all`);
        }
    }

    return (
        <section id="nav-bar">
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        <img src={logo} alt="" width={60} height={35} />
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <i className="fa fa-bars" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {auth?.role === 'administrator'
                                ?
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link active text-light" to="/">
                                            Admin
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link active text-light" to="/comment/all">
                                            Comments
                                        </Link>
                                    </li>
                                </>
                                :
                                <li className="nav-item">
                                    <Link className="nav-link active text-light" to="/">
                                        Home
                                    </Link>
                                </li>}
                            <li className="nav-item">
                                <Link className="nav-link text-light" to="/lesson/all">
                                    Lessons
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-light" to="/course/all">
                                    Courses
                                </Link>
                            </li>
                            <li className="nav-item">
                                <form className="d-flex" role="search" onSubmit={onSearch}>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="title"
                                        id="title"
                                        placeholder={`Search for a ${selection.toLowerCase()}`}
                                        value={search}
                                        onChange={onChange}
                                    />
                                    <div className="input-group-append ms-1 me-2">
                                        <div className="dropdown">
                                            <a
                                                className="dropdown-toggle btn btn-outline-warning"
                                                href="/"
                                                id="navbarDropdown"
                                                role="button"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                            >
                                                {selection}
                                            </a>
                                            <ul
                                                className="dropdown-menu text-light"
                                                aria-labelledby="navbarDropdown"
                                            >
                                                <li>
                                                    <h5 className="dropdown-item" onClick={changeSelection} >
                                                        Lesson
                                                    </h5>
                                                </li>
                                                <li>
                                                    <h5 className="dropdown-item" onClick={changeSelection} >
                                                        Course
                                                    </h5>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <button className="btn btn-outline-warning" type="submit">
                                        Search
                                    </button>
                                </form>
                            </li>
                        </ul>
                        <ul className="navbar-nav me-auto-reverse mb-2 mb-lg-0">
                            {isAuthenticated
                                ?
                                <>

                                    <li className="nav-item dropdown">
                                        <a
                                            className="nav-link dropdown-toggle text-light"
                                            href="/lesson/create"
                                            style={{ fontWeight: 600, fontSize: "large", paddingRight: 20 }}
                                            id="navbarDropdown"
                                            role="button"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            Create
                                        </a>
                                        <ul
                                            className="dropdown-menu text-light"
                                            aria-labelledby="navbarDropdown"
                                        >
                                            <li>
                                                <Link className="dropdown-item" to="/lesson/create">
                                                    Lesson
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className="dropdown-item" to="/course/create">
                                                    Course
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link text-light" to="/profile">
                                            KBPoints: {auth.kbPoints}
                                        </Link>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <a
                                            className="nav-link dropdown-toggle text-light"
                                            href="/profile"
                                            style={{ fontWeight: 600, fontSize: "large", paddingRight: 80 }}
                                            id="navbarDropdown"
                                            role="button"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            Profile
                                        </a>
                                        <ul
                                            className="dropdown-menu text-light"
                                            aria-labelledby="navbarDropdown"
                                        >
                                            <li>
                                                <Link className="dropdown-item" to="/profile">
                                                    Information
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className="dropdown-item" to="/lesson/yours">
                                                    Your Lessons
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className="dropdown-item" to="/course/yours">
                                                    Your Courses
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className="dropdown-item" to="/lesson/bought">
                                                    Bought Lessons
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className="dropdown-item" to="/course/bought">
                                                    Bought Courses
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className="dropdown-item" to="/liked">
                                                    Liked
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className="dropdown-item" to="/logout">
                                                    Logout
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>
                                </> :
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link active text-light" to="/register">
                                            Register
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link text-light" to="/login">
                                            Login
                                        </Link>
                                    </li>
                                </>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </section>
    )
}