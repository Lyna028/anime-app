import React, {createContext, useContext, useReducer, useEffect} from "react";

const GlobalContext = createContext();

const baseUrl = "https://api.jikan.moe/v4";

const ACTIONS = {
    LOADING : "LOADING",
    SEARCH : "SEARCH",
    GET_POPULAR_ANIMES : "GET_POPULAR_ANIMES",
    GET_UPCOMING_ANIMES : "GET_UPCOMING_ANIMES",
    GET_AIRING_ANIMES : "GET_AIRING_ANIMES"
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
        dispatch({type: ACTIONS.LOADING});
        const response = await fetch(`${baseUrl}/top/anime?filter=upcoming`);
        const upcomingAnimes = await response.json();
        dispatch({type: ACTIONS.GET_UPCOMING_ANIMES, payload: upcomingAnimes.data});
    }

    React.useEffect(() => {
        getPopularAnimes();
    }, [])

    return (
        <GlobalContext.Provider value={{...state, getPopularAnimes, getAiringAnimes, getUpcomingrAnimes}}> 
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext);
}