import React from "react";
import { useGlobalContext } from "../Context/global";
import { Link } from "react-router-dom";

export default function Popular() {
    const { popularAnimes, isSearching } = useGlobalContext();


    const initialRender = () => {
        if (!isSearching) {
            return popularAnimes?.map((anime) => {
                return <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
                    <img src={anime.images.jpg.large_image_url} alt="" className="anime"/>
                </Link>
            })
        }
    }
    
    return (
    <div className="section">
        <h1 className="pageTitle">Popular</h1>
        <div className="animes popular-anime">
            {initialRender()}
        </div>
    </div>
    )
}