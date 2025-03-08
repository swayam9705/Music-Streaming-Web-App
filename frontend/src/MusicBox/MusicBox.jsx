import React, { useEffect, useState } from "react"
import "./MusicBox.css"
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify"
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import { useStateValue } from "../ContextManager";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase_config"

const MusicBox = () => {

    const [ song, setSong ] = useState({})
    const [ loading, setLoading ] = useState(true)

    // get the params of the url of react router
    const { id } = useParams()

    useEffect(() => {
        const fetchSong = async () => {
            try {
                const docRef = doc(db, "songs", id)
                const docSnap = await getDoc(docRef)

                if (docSnap.exists()) {
                    setSong(docSnap.data())
                } else {
                    console.log("No such document!")
                }
            }
            catch (err) {
                console.log("Error getting document:", err)
            }
            finally {
                setLoading(false)
            }
        }

        fetchSong()
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
                    <div className="MusicBox__lyrics-box-langs">
                        <span className="MusicBox__lyrics-lang">Original</span>
                        <span className="MusicBox__lyrics-lang">Hindi</span>
                    </div>
                    <div className="MusicBox__lyrics-actual-lyrics">
                        <p dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(song.lyrics)}}></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MusicBox