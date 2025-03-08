import React, { useEffect } from "react"
import "./Hero.css"
import { Route, Routes } from "react-router-dom"

import MusicBox from "../MusicBox/MusicBox"
import Collection from "../Collection/Collection"

// Context API
import { useStateValue } from "../ContextManager"

import SkeletonHero from "../Skeleton/Skeleton"

function Hero() {

    const [ state, dispatch ] = useStateValue()

    let content = <Collection />

    // if (state.loading) {
    //     content = (
    //         <SkeletonHero />
    //     )
    // }
    // else if (state.searchedSong && !state.loading){
    //     content = (
    //         <MusicBox />
    //     )
    // }

    return (
        <div className="Hero">
            <Routes>
                <Route path="/" element={<Collection />} />
                <Route path="song/:id" element={<MusicBox />} />
            </Routes>
            {/* { content } */}
            {/* <div className="shadow"></div> */}
        </div>
    )
}

export default Hero