 import React from "react";
import { useGlobalContext } from "../Context/global";
import { Link } from "react-router-dom";

export default function Upcoming() {
    const { upcomingAnimes, isSearching, getUpcomingrAnimes } = useGlobalContext();

    React.useEffect(() => {
        getUpcomingrAnimes();
    }, []);
    
    const upcomingRender = () => {
        if (!isSearching && Array.isArray(upcomingAnimes) && upcomingAnimes.length > 0) {
            return upcomingAnimes.map((anime) => (
                <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
                    <img src={anime.images.jpg.large_image_url} alt="" className="anime" />
                </Link>
            ));
        }

        if (isSearching || !Array.isArray(upcomingAnimes)) {
            return <p>Loading...</p>;
        }
    
        return <p>No animes found.</p>; 
    };
    

    return (
        <div className="section">
            <h1 className="pageTitle">Upcoming</h1>
            <div className="animes upcoming-anime">
                {upcomingRender()}
            </div>
        </div>
    );
}
