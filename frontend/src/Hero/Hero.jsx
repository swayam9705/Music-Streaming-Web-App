import React, { useEffect } from "react"
import "./Hero.css"

import MusicBox from "../MusicBox/MusicBox"

// Context API
import { useStateValue } from "../ContextManager"

import SkeletonHero from "../Skeleton/Skeleton"

function Hero() {

    const [ state, dispatch ] = useStateValue()

    useEffect(() => {
        console.log(state.searchedSong?.album)
    }, [])

    let content

    if (state.loading) {
        content = (
            <SkeletonHero />
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
            <div className="shadow"></div>
        </div>
    )
}

export default Hero