import React, { useEffect } from "react"
import "./Hero.css"
import { Route, Routes } from "react-router-dom"

import MusicBox from "../MusicBox/MusicBox"
import Collection from "../Collection/Collection"

function Hero() {
    return (
        <div className="Hero">
            <Routes>
                <Route path="/" element={<Collection />} />
                <Route path="song/:id" element={<MusicBox />} />
            </Routes>
        </div>
    )
}

export default Hero