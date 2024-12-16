import React from "react";
import { useGlobalContext } from "../Context/global";

export default function Airing() {
    
    const { airingAnimes, isSearching, getAiringAnimes } = useGlobalContext();
    getAiringAnimes();

    
}