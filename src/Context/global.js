import React, {createContext, useContext, useReducer, useEffect} from "react";

const GlobalContext = createContext();

const baseUrl = "https://api.jikan.moe/v4";

const ACTIONS = {
    LOADING : "LOADING",
    SEARCH : "SEARCH",
    GET_POPULAR_ANIMES : "GET_POPULAR_ANIMES",
    GET_UPCOMING_ANIMES : "GET_UPCOMING_ANIMES",
    GET_AIRING_ANIMES : "GET_AIRING_ANIMES",
    GET_SEARCH_RESULTS: "GET_SEARCH_RESULTS"
}

const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.LOADING:
            return {...state, loading: true};
        case ACTIONS.GET_POPULAR_ANIMES:
            return {...state, popularAnimes: action.payload, loading: false};
        case ACTIONS.GET_AIRING_ANIMES:
            return {...state, airingAnimes: action.payload, loading: false}
        case ACTIONS.GET_UPCOMING_ANIMES:
            return {...state, upcomingAnimes: action.payload, loading: false};
        case ACTIONS.GET_SEARCH_RESULTS:
            return { ...state, searchResult: action.payload, isSearching: true, loading: false };
        case ACTIONS.SEARCH:
            return { ...state, isSearching: action.payload };
        default:
            return state;
    }
} 

export const GlobalContextProvider = ({children}) => {
    const initialState = {
        popularAnimes : [],
        upcomingAnimes : [],
        airingAnimes : [],
        pictures : [],
        isSearching : false,
        searchResult : [],
        loading : false
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    const getPopularAnimes = async () => {
        dispatch({type: ACTIONS.LOADING}); // Dispatch pour envoyer l'action LOAD ANIME
        const response = await fetch(`${baseUrl}/top/anime?filter=bypopularity`);
        const popularAnimes = await response.json();
        dispatch({type: ACTIONS.GET_POPULAR_ANIMES, payload: popularAnimes.data});
    }

    const getAiringAnimes = async () => {
        dispatch({type: ACTIONS.LOADING});
        const response = await fetch(`${baseUrl}/top/anime?filter=airing`);
        const airingAnimes = await response.json();
        dispatch({type: ACTIONS.GET_AIRING_ANIMES, payload: airingAnimes.data});
    }

    const getUpcomingrAnimes = async () => {
        console.log('hahaha')
        dispatch({type: ACTIONS.LOADING});
        const response = await fetch(`${baseUrl}/top/anime?filter=upcoming`);
        const upcomingAnimes = await response.json();
        console.log(upcomingAnimes)
        dispatch({type: ACTIONS.GET_UPCOMING_ANIMES, payload: upcomingAnimes.data});
    }

    const searchAnime = async (query, navigate) => {
        dispatch({ type: ACTIONS.LOADING });
        const response = await fetch(`${baseUrl}/anime?q=${query}&limit=10`);
        const searchResult = await response.json();
        const anime = searchResult.data[0]; // Récupère le premier résultat
        navigate(`/anime/${anime.mal_id}`);
    };

    React.useEffect(() => {
        getPopularAnimes();
    }, [])

    return (
        <GlobalContext.Provider value={{...state, getPopularAnimes, getAiringAnimes, getUpcomingrAnimes, searchAnime}}> 
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext);
}