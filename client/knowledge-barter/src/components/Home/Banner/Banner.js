import './Banner.css'
import knowledgeIcon from '../../../images/knowledgeIcon.png'
import wave from '../../../images/wave1.png'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
export const Banner = () => {
    const [search, setSearch] = useState();
    const navigate = useNavigate();
    const onChange = (e) => {
        setSearch(e.target.value)
    }
    const onSearch = (e) => {
        e.preventDefault();
        navigate(`/lesson/all?search=${search}`)
    }

    return (
        <section id="banner">
            <div className="container">
                <div className="row">
                    <div className="main-text col-md-6">
                        <h1 className="promo-title">Knowledge</h1>
                        <h1 className="promo-title-2">Barter</h1>
                        <p>Learn new things by sharing knowledge you have.</p>
                        <p>Barter your knowledge.</p>
                        <form className="d-flex justify-content-center" role="search" onSubmit={onSearch}>
                            <input
                                type="text"
                                className="form-control"
                                name="title"
                                id="home-search"
                                placeholder="Search for a lesson"
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
                    <div className="col-md-6 text-center">
                        <img
                            id="knowledge-image"
                            className="image-fluid"
                            src={knowledgeIcon}
                            alt="icon"
                        />
                    </div>
                </div>
            </div>
            <img className="wave-image" src={wave} alt="wave" />
        </section>
    )
}