import React, { useEffect } from "react"
import "./Hero.css"

import MusicBox from "../MusicBox/MusicBox"

// Context API
import { useStateValue } from "../ContextManager"

import DOMPurify from "dompurify"

function Hero() {

    const [ state, dispatch ] = useStateValue()

    useEffect(() => {
        console.log(state.searchedSong?.album)
    }, [])

    let content

    if (state.loading) {
        content = (
            <p>The song is loading</p>
        )
    }
    else if (state.searchedSong && !state.loading){
        content = (
            <MusicBox />
        )
    }

    return (
        <div className="Hero">
            { content }
        </div>
    )
}

export default Hero