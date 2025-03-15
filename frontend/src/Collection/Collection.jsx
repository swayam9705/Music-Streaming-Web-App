import React, { useEffect, useState } from "react"
import "./Collection.css"

import Card from "../Card/Card"

// firebase import statements
import { db } from "../config/firebase_config"
import { getDocs, collection } from "firebase/firestore"

// context API
import { useStateValue } from "../ContextManager"

function Collection() {

    const [ state, dispatch ] = useStateValue()
    const [ songs, setSongs] = useState([])

    // get all documents from the collection
    const getCollection = async () => {
        const querySnapshot = await getDocs(collection(db, "songs"))
        querySnapshot.forEach((doc) => {
            setSongs(song => [...song, { id: doc.id, ...doc.data()}])
        })
    }

    // getCollection()

    useEffect(() => {
        getCollection()
        dispatch({
            type: "ADD_SONG",
            songs: songs
        })
    }, [])

    console.log(state.songList)

    return (
        <div className="Collection">
            <h2 className="Collection__title">Collection</h2>
            <div className="Collection__cards">
                {
                    songs.map(song => {
                        return <Card song={song} key={song.id}/>
                    })
                }
            </div>
        </div>
    )
}

export default Collection