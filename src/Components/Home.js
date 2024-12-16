import React from "react";
import { useState } from "react";
import Popular from "./Popular";
import Airing from "./Airing";
import Upcoming from "./Upcoming";
import { useGlobalContext } from "../Context/global";
import { useNavigate } from "react-router-dom";

export default function Home () {

    const [rendered, setRendered] = useState("popular");
    const { searchAnime, isSearching } = useGlobalContext();
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e) => {
        searchAnime(query, navigate); 
    };

    const switchComponent = () => {
        switch (rendered) {
            case "popular" :
                return <Popular rendered={rendered}/>
            case "airing" :
                return <Airing rendered={rendered}/>
            case "upcoming" :
                return <Upcoming rendered={rendered}/>
            default :
                return <Popular rendered={rendered}/>
        }
    }
    
    return (
        <div>
            <header className="header">
                <button className="popularBtn btn" onClick={() => setRendered("popular")}>
                    Popular
                    <i className="fas fa-fire"></i>
                </button>
            
                <div className="searchContainer">
                    <form className="searchForm" onSubmit={handleSearch}>
                        <input className="searchInput" value={query} onChange={(e) => setQuery(e.target.value)}></input>
                        <button className="searchBtn btn" type="submit">Search</button>
                    </form>
                </div>

                <button className="upcomingBtn btn" onClick={() => setRendered("upcoming")}>
                        Upcoming
                </button>

                <button className="airingBtn btn" onClick={() => setRendered("airing")}>
                        Airing
                </button>
            </header>
            {switchComponent()}
        </div>
    )
}