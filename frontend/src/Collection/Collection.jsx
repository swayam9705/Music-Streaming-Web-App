import React, { useEffect } from "react"
import "./Collection.css"

import Card from "../Card/Card"

// firebase import statements
import { db } from "../config/firebase_config"
import { getDocs, collection } from "firebase/firestore"

// context API
import { useStateValue } from "../ContextManager"

function Collection() {

    const [ state, dispatch ] = useStateValue()

    // get all documents from the collection
    const getCollection = async () => {
        const querySnapshot = await getDocs(collection(db, "songs"))
        querySnapshot.forEach((doc) => {
            dispatch({
                type: 'ADD_SONG',
                song: doc.data()
            })
        })
    }

    useEffect(() => {
        getCollection()
    }, [])

    console.log(state.songList)

    return (
        <div className="Collection">
            <h2 className="Collection__title">Collection</h2>
            <div className="Collection__cards">
                {
                    state.songList.map(song => {
                        return <Card song={song} />
                    })
                }
            </div>
        </div>
    )
}

export default Collection