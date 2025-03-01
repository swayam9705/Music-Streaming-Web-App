import React, { useState } from 'react';
import "./Navbar.css";

import SearchIcon from '@mui/icons-material/Search';
import Logo from "../assets/logo.svg"

import { useStateValue } from '../ContextManager';

// firebase imports
import { signOut } from "firebase/auth"
import { auth } from "../config/firebase_config"


const Navbar = () => {

    const [ query, setQuery ] = useState("")
    const [ state, dispatch ] = useStateValue()

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

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                dispatch({ type: 'LOGGED_OUT' })
            })
            .catch((error) => {
                console.log("sign out error, you messed up")
            })
    }

    return (
        <nav class="Navbar">
            <img className='Navbar__logo' src={Logo} alt="logo" />
            <div className="Navbar__search-bar">
                <input
                    autoComplete='off'
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
            <div className="Navbar__username">
                <div className="Navbar__username-circle">{ state.user.displayName[0] }</div>
                <div className="Navbar__username-name">{ state.user.displayName }</div>
                <div className="Navbar__username__dropdown">
                    <button
                        onClick={() => {
                            handleLogout()
                        }}
                        className="logout"
                    >Logout</button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;