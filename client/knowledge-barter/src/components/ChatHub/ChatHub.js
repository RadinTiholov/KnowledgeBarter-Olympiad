import "./ChatHub.css"
import { useContext } from 'react';
import { useState } from 'react'
import { ProfileContext } from '../../contexts/ProfileContext';
import { ProfileCard } from './ProfileCard/ProfileCard';
import { useEffect } from "react";
import * as authService from "../../dataServices/authService"
import { BookSpinner } from "../common/Spinners/BookSpinner";

export const ChatHub = () => {

    const [search, setSearch] = useState('');
    const { profiles } = useContext(ProfileContext);
    const [searchResult, setSearchResult] = useState([]);

    const [contactsIds, setContactsIds] = useState([]);
    const [areLoadingContacts, setAreLoadingContacts] = useState(true);

    useEffect(() => {
        authService.getAllContacts()
            .then(res => {
                setContactsIds(res);

                setAreLoadingContacts(false);
            })
    }, []);

    const onSearch = (e) => {
        e.preventDefault();

        setSearchResult(profiles.filter(x => x.userName.toLowerCase().includes(search.toLowerCase())))
    }

    return (
        <>
            <div className="chat-hub row mx-3 flex-wrap">
                <div className="hub-component col-md-6 col-6 pt-5">
                    <h1>Contacts</h1>
                    <div className="card card-display w-100 py-2 chat-scroll" style={{ height: "70vh" }}>
                        {areLoadingContacts ?
                            <BookSpinner /> :
                            profiles.filter(p => contactsIds.includes(p.id)).map(x => <ProfileCard key={x.id} {...x} />)}
                    </div>
                </div>

                {/* Search */}
                <div className="hub-component col-md-6 col-6 pt-5 pb-2 ">
                    <h1>Search for a user</h1>
                    <div className="card py-2 card-display w-100 chat-scroll" style={{ height: "70vh" }}>
                        <div className="p-3 mx-5">
                            <form className="d-flex justify-content-center" role="search" onSubmit={onSearch}>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="title"
                                    id="home-search"
                                    placeholder="Search"
                                    value={search}
                                    onChange={(e) => { setSearch(e.target.value) }}
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
                        {searchResult.length === 0 ?
                            profiles.map(x => <ProfileCard key={x.id} {...x} />) :
                            searchResult.map(x => <ProfileCard key={x.id} {...x} />)}
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="articles card" style={{ backgroundColor: "#f0ad4e" }}>
                            <div className="card-header d-flex align-items-center">
                                <h2 className="h3">Contacts</h2>
                            </div>
                            <div className="card-body no-padding">

                                <div className="item d-flex align-items-center">
                                    <div className="image">
                                        <img
                                            src="https://bootdey.com/img/Content/avatar/avatar3.png"
                                            alt="..."
                                            className="img-fluid rounded-circle"
                                        />
                                    </div>
                                    <div className="text">
                                        <a href="#">
                                            <h3 className="h5">Lorem Ipsum Dolor</h3>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="articles card" style={{ backgroundColor: "#f0ad4e" }}>
                            <div className="card-header d-flex align-items-center">
                                <h2 className="h3">Search for a user</h2>
                            </div>
                            <div className="m-3">
                                <form className="d-flex justify-content-center" role="search" onSubmit={onSearch}>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="title"
                                        id="home-search"
                                        placeholder="Search"
                                        value={search}
                                        onChange={(e) => { setSearch(e.target.value) }}
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
                            <div className="card-body no-padding">
                                <div className="item d-flex align-items-center">
                                    <div className="image">
                                        <img
                                            src="https://bootdey.com/img/Content/avatar/avatar3.png"
                                            alt="..."
                                            className="img-fluid rounded-circle"
                                        />
                                    </div>
                                    <div className="text">
                                        <a href="#">
                                            <h3 className="h5">Lorem Ipsum Dolor</h3>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}