import React, { useState } from 'react';
import "./Navbar.css";

import SearchIcon from '@mui/icons-material/Search';
import Logo from "../assets/logo.svg"

import { useStateValue } from '../ContextManager';


const Navbar = () => {

    const [ query, setQuery ] = useState("")
    const [ _, dispatch ] = useStateValue()

    const fetchSongData = async () => {
        try {
            dispatch({ type: 'SET_LOADING' })
            const response = await fetch(`http://localhost:5000/result/?query=${query}&lyrics=true`)

            const json = await response.json()
            for (let songData of json) {
                if (songData.has_lyrics) {
                    dispatch({
                        type: "SET_SEARCHED_SONG",
                        searchedSong: songData
                    })
                    break
                }
            }
        }
        catch(err) {
            console.log("error occured, you messed up")
        }

        finally {
            dispatch({ type: "UNSET_LOADING" })
        }
    }

    return (
        <nav class="Navbar">
            <img className='Navbar__logo' src={Logo} alt="logo" />
            <div className="Navbar__search-bar">
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder='Search...'
                    className='Navbar__search-input' type="text" name="query" id="query" />
                <button
                    className='Navbar__search-btn'
                    onClick={() => {
                        fetchSongData()
                    }}
                >
                    <SearchIcon />
                </button>
            </div>
        </nav>
    );
};

export default Navbar;