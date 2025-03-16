import React, { useEffect, useState } from "react"
import "./Collection.css"

import Card from "../Card/Card"

// firebase import statements
import { db } from "../config/firebase_config"
import { getDocs, collection } from "firebase/firestore"

// context API
import { useStateValue } from "../ContextManager"

function Collection() {

    const [ state, _] = useStateValue()

    return (
        <div className="Collection">
            <h2 className="Collection__title">Collection</h2>
            <div className="Collection__cards">
                {
                    state.songList.map(song => {
                        return <Card song={song} key={song.id}/>
                    })
                }
            </div>
        </div>
    )
}

export default Collection