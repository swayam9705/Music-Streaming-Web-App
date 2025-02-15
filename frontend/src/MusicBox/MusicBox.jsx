import React from "react"
import "./MusicBox.css"

import DOMPurify from "dompurify"

import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import { useStateValue } from "../ContextManager";

const MusicBox = () => {

    const [ state, dispatch ] = useStateValue()

    const playSearchedSong = () => {
        dispatch({
            type: 'SET_CURRENT_SONG',
            currentSong: state.searchedSong
        })
        console.log(state.currentSong.media_url)
    }

    return (
        <div className="MusicBox">
            <div className="MusicBox__info">
                <img src={state.searchedSong.image} alt="Song image" />
                <div className="MusicBox__info-desc">
                    <span className="MusicBox__info-title">{ state.searchedSong.album }</span>
                    <span className="MusicBox__info-artists">
                        <span className="MusicBox__info-artist-title">Artist: </span>
                        <ul>
                        {
                            Object.keys(state.searchedSong.artistMap).map(key => <li key={key}>{ key }</li>)
                        }
                        </ul>
                    </span>
                    <span className="MusicBox__info-releastDate">
                        <span className="MusicBox__info-releaseDate-title">Release: </span> <br />
                        { state.searchedSong.release_date }
                    </span>
                    <div
                        className="MusicBox__info-playbutton"
                        onClick={() => {
                            playSearchedSong()
                        }}
                    >
                        <PlayArrowRoundedIcon className="playbutton" />
                    </div>
                </div>
            </div>
            <div className="MusicBox__lyrics">
                <h3 className="MusicBox__lyrics">Lyrics</h3>
                <div className="MusicBox__lyrics-box">
                    <div className="MusicBox__lyrics-box-langs">
                        <span className="MusicBox__lyrics-lang">Original</span><span className="MusicBox__lyrics-lang">Marathi</span><span className="MusicBox__lyrics-lang">Hindi</span>
                    </div>
                    <div className="MusicBox__lyrics-actual-lyrics">
                        <p dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(state.searchedSong.lyrics)}}></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MusicBox