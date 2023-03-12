import "./ChatHub.css"
import { useContext } from 'react';
import { useState } from 'react'
import { ProfileContext } from '../../contexts/ProfileContext';
import { ProfileCard } from './ProfileCard/ProfileCard';
import { useEffect } from "react";
import * as authService from "../../dataServices/authService"

export const ChatHub = () => {

    const [search, setSearch] = useState('');
    const { profiles } = useContext(ProfileContext);
    const [searchResult, setSearchResult] = useState([]);

    const [ contactsIds, setContactsIds] = useState([]);
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
        <div className="chat-hub row mx-3 flex-wrap">
            <div className="hub-component col-md-6 col-6 pt-5">
                <h1>Contacts</h1>
                <div className="card card-display w-100 py-2 chat-scroll" style={{ height: "70vh" }}>
                    {profiles.filter(p => contactsIds.includes(p.id)).map(x => <ProfileCard key = {x.id} {...x}/>)}
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
                                onChange={(e) => {setSearch(e.target.value)}}
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
                    { searchResult.length === 0 ?
                    profiles.map(x => <ProfileCard key = {x.id} {...x}/>) :
                    searchResult.map(x => <ProfileCard key = {x.id} {...x}/>) }
                </div>
            </div>
        </div>
    )
}