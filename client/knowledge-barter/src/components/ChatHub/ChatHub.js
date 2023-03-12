import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const ChatHub = () => {
    const [search, setSearch] = useState();
    const navigate = useNavigate();
    
    const onChange = (e) => {
        setSearch(e.target.value)
    }
    const onSearch = (e) => {
        e.preventDefault();
        navigate(`/lesson/all/${search}`)
    } 

    return (
        <div className="row mx-3">
            <div className="col-md-6 col-6 pt-5">
                <h1>Recent Messages</h1>
                <div className="card card-display w-100 py-2">
                    <div className="card comment-card card-display-details mx-5 my-2">
                        <div className="row">
                            <div className="col-1">
                                <img
                                    className="img-fluid rounded-circle profile-comment m-3"
                                    src='https://avatars.githubusercontent.com/u/74610360?v=4'
                                    alt="Lesson Pic"
                                    style={{ objectFit: 'contain' }}
                                />
                            </div>
                            <div className="col-11">
                                <p className="mt-4">GOSHO</p>
                            </div>
                        </div>
                        <div className="row mx-3">
                        </div>
                    </div>

                    <div className="card comment-card card-display-details mx-5 my-2">
                        <div className="row">
                            <div className="col-1">
                                <img
                                    className="img-fluid rounded-circle profile-comment m-3"
                                    src='https://avatars.githubusercontent.com/u/74610360?v=4'
                                    alt="Lesson Pic"
                                    style={{ objectFit: 'contain' }}
                                />
                            </div>
                            <div className="col-11">
                                <p className="mt-4">GOSHO</p>
                            </div>
                        </div>
                        <div className="row mx-3">
                        </div>
                    </div>

                    <div className="card comment-card card-display-details mx-5 my-2">
                        <div className="row">
                            <div className="col-1">
                                <img
                                    className="img-fluid rounded-circle profile-comment m-3"
                                    src='https://avatars.githubusercontent.com/u/74610360?v=4'
                                    alt="Lesson Pic"
                                    style={{ objectFit: 'contain' }}
                                />
                            </div>
                            <div className="col-11">
                                <p className="mt-4">GOSHO</p>
                            </div>
                        </div>
                        <div className="row mx-3">
                        </div>
                    </div>
                </div>
            </div>

            {/* Search */}
            <div className="col-md-6 col-6 pt-5 ">
                <h1>Search for a user</h1>
                <div className="card py-2 card-display w-100">
                    <div className="p-3 mx-5">
                        <form className="d-flex justify-content-center" role="search" onSubmit={onSearch}>
                            <input
                                type="text"
                                className="form-control"
                                name="title"
                                id="home-search"
                                placeholder="Search"
                                value={search}
                                onChange={onChange}
                            />
                            <button
                                className="btn btn-outline-warning"
                                style={{ backgroundColor: "#636EA7" }}
                                type="submit"
                            >
                                Search
                            </button>
                        </form>
                    </div>
                    <div className="card comment-card card-display-details mx-5 my-2">
                        <div className="row">
                            <div className="col-1">
                                <img
                                    className="img-fluid rounded-circle profile-comment m-3"
                                    src='https://avatars.githubusercontent.com/u/74610360?v=4'
                                    alt="Lesson Pic"
                                    style={{ objectFit: 'contain' }}
                                />
                            </div>
                            <div className="col-11">
                                <p className="mt-4">GOSHO</p>
                            </div>
                        </div>
                        <div className="row mx-3">
                        </div>
                    </div>

                    <div className="card comment-card card-display-details mx-5 my-2">
                        <div className="row">
                            <div className="col-1">
                                <img
                                    className="img-fluid rounded-circle profile-comment m-3"
                                    src='https://avatars.githubusercontent.com/u/74610360?v=4'
                                    alt="Lesson Pic"
                                    style={{ objectFit: 'contain' }}
                                />
                            </div>
                            <div className="col-11">
                                <p className="mt-4">GOSHO</p>
                            </div>
                        </div>
                        <div className="row mx-3">
                        </div>
                    </div>

                    <div className="card comment-card card-display-details mx-5 my-2">
                        <div className="row">
                            <div className="col-1">
                                <img
                                    className="img-fluid rounded-circle profile-comment m-3"
                                    src='https://avatars.githubusercontent.com/u/74610360?v=4'
                                    alt="Lesson Pic"
                                    style={{ objectFit: 'contain' }}
                                />
                            </div>
                            <div className="col-11">
                                <p className="mt-4">GOSHO</p>
                            </div>
                        </div>
                        <div className="row mx-3">
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}