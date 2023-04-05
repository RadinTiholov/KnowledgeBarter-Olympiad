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
            <div className="container py-3">
                <div className="row gy-2">
                    <div className="col-lg-6">
                        <div className="articles card chat-scroll" style={{ backgroundColor: "#f0ad4e", height: "80vh" }}>
                            <div className="card-header d-flex align-items-center">
                                <h2 className="h3">Contacts</h2>
                            </div>
                            {areLoadingContacts ?
                                <BookSpinner /> :
                                profiles.filter(p => contactsIds.includes(p.id)).map(x => <ProfileCard key={x.id} {...x} />)}
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="articles card chat-scroll" style={{ backgroundColor: "#f0ad4e", height: "80vh" }}>
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
                            {searchResult.length === 0 ?
                                    profiles.map(x => <ProfileCard key={x.id} {...x} />) :
                                    searchResult.map(x => <ProfileCard key={x.id} {...x} />)}
                        </div>
                    </div>
                </div>
            </div>
    )
}