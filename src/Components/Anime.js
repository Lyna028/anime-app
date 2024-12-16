import React from "react";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Anime() {
    const { id } = useParams();

    const [anime, setAnime] = useState({});
    const [characters, setCharacters] = useState([]);
    const [showMore, setShowMore] = useState(false);

    // anime informations 
    const {
        title, 
        synopsis, 
        trailer,
        duration,
        aired, 
        season, 
        images, 
        rank, 
        score,
        scored_by, 
        popularity, 
        status, 
        rating, 
        source } = anime;


    // get anime with his id
    const getAnime = async(anime) => {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${anime}`);
        const animeData = await response.json();
        setAnime(animeData.data);
    }

    // get characters from anime id 
    const getCharacters = async(anime) => {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${anime}/characters`);
        const charactersData = await response.json();
        setCharacters(charactersData.data);
        console.log(charactersData.data)
    }

    // On the initial render
    useEffect(() => { 
        getAnime(id); 
        getCharacters(id) }, 
    []);

    return (
        <div className="animePage">
            <h1 className="animeTitle">{title}</h1>
            <div className="animeDetails">
                <div className="animeImage">
                    <img src={images?.jpg.large_image_url} alt="" ></img>
                </div>
                <div className="animeInfos">
                    <p><span>Aired : </span><span>{aired?.string}</span></p>
                    <p><span>Rating : </span><span>{rating}</span></p>
                    <p><span>Rank : </span><span>{rank}</span></p>
                    <p><span>Score : </span><span>{score}</span></p>
                    <p><span>Scored by : </span><span>{scored_by} users</span></p>
                    <p><span>Popularity : </span><span>{popularity}</span></p>
                    <p><span>Status : </span><span>{status}</span></p>
                    <p><span>Season : </span><span>{season}</span></p>
                    <p><span>Duration : </span><span>{duration}</span></p>
                    <div className="synopsis">
                        {showMore? synopsis : synopsis?.substring(0, 450) + '...'}
                        <button className="showMoreBtn" onClick={() => {setShowMore(!showMore)}}>
                            {showMore? "Show less" : "Show more"}
                        </button>
                    </div>
                </div>
            </div>
            <div className="sectionTitle">Trailer</div>
            <div className="trailer">
                {trailer?.embed_url ? 
                    <iframe 
                        src={trailer?.embed_url} 
                        title="Inline Frame Example"
                        width="800"
                        height="450"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen>
                    </iframe> :
                    <h3>Trailer not available</h3>
                }
            </div>
            <div className="sectionTitle">Characters</div>
            <div className="characters">
                {characters?.map((character, index) => {
                    const {images, name, mal_id} = character.character;
                    return <Link to={`/character/${mal_id}`} key={index}>
                                <div className="character">
                                    <img src={images?.jpg.image_url} alt=""></img>
                                    <p className="characterName">{name}</p>
                                </div>
                            </Link>
                })}
            </div>
        </div>
    )
}