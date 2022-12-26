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
        navigate(`/lesson/all/${search}`)
    }

    return (
        <section id="banner">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h1 className="promo-title">Knowledge</h1>
                        <h1 style={{ marginLeft: 250, fontSize: 70, fontWeight: 600 }}>
                            Barter
                        </h1>
                        <p>Learn new things by sharing knowledge you have.</p>
                        <p style={{ marginLeft: 340 }}>Barter your knowledge.</p>
                        <form className="d-flex" role="search" onSubmit={onSearch}>
                            <input
                                type="text"
                                className="form-control"
                                name="title"
                                id="title"
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