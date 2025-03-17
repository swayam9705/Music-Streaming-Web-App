import React, { useEffect, useState } from "react"
import "./MusicBox.css"
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify"
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import { useStateValue } from "../ContextManager";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebase_config"

import { app } from "../config/firebase_config";

const MusicBox = () => {

    const [ song, setSong ] = useState({})
    const [ state, dispatch ] = useStateValue()

    const [ lyrics, setLyrics ] = useState([])

    // get the params of the url of react router
    const { id } = useParams()

    useEffect(() => {
        const fetchSong = async () => {
            const fetchedSong = state.songList.find(song => song.id == id)
            dispatch({
                type: "ADD_RECENT",
                song: fetchedSong
            })

            setSong({...fetchedSong})
        }

        const fetchTranslatedLyrics = async () => {
            const q = query(collection(db, "users"), where("song", "==", id))

            const querySnapshot = await getDocs(q)
            querySnapshot.forEach(doc => {
                console.log(doc.id, "=>", doc.data());
                setLyrics(lyrics => [...lyrics, doc.data()])
            })
            
        }

        console.log(lyrics)
        
        fetchSong()
        fetchTranslatedLyrics()
    }, [id])



    return (
        <div className="MusicBox">
            <div className="MusicBox__info">
                <img src={song.image} alt="Song image" />
                <div className="MusicBox__info-desc">
                    <span className="MusicBox__info-title">{ song.song }</span>
                    <span className="MusicBox__info-artists">
                        <span className="MusicBox__info-artist-title">Artist: { song.singer }</span>
                    </span>
                    <span className="MusicBox__info-releastDate">
                        <span className="MusicBox__info-releaseDate-title">Release: </span> <br />
                        { song.release_date }
                    </span>
                    <div
                        className="MusicBox__info-playbutton"
                    >
                        <PlayArrowRoundedIcon className="playbutton" />
                    </div>
                </div>
            </div>
            <div className="MusicBox__lyrics">
                <h3 className="MusicBox__lyrics__title">Lyrics: </h3>
                <div className="MusicBox__lyrics-box">
                    <div className="MusicBox__lyrics-container">
                        <div className="MusicBox__lyrics-actual-lyrics">
                            <div className="MusicBox__lyrics-lang">Original:</div>
                            <p dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(song.lyrics)}}></p>
                        </div>
                        <div className="MusicBox__lyrics-actual-lyrics">
                            <div className="MusicBox__lyrics-lang">Hindi:</div>
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(
                                        lyrics.length > 0 && lyrics[0].lyrics ? lyrics[0].lyrics : "No hindi lyrics available"
                                    )
                                }} 
                            ></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MusicBox