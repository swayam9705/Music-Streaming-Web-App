import React, { useEffect, useRef, useState } from "react"
import "./MusicPlayer.css"


// icons
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import PauseIcon from '@mui/icons-material/Pause';

// content
import { useStateValue } from "../ContextManager";


function MusicPlayer() {

    const [ state, _ ] = useStateValue()

    const [isPlaying, setIsPlaying] = useState(false)
    const progressBar = useRef(null)
    const song = useRef(null)
    const playBtn = useRef(null)

    useEffect(() => {
        progressBar.current.value = 0
        song.current.src = state.currentSong.media_url
        console.log(state.currentSong.media_url)
    }, [state])

    const onMusicPlaying = () => {
        setInterval(() => {
            progressBar.current.value = song.current?.currentTime
        }, 500)
    }

    const playPause = () => {
        setIsPlaying(!isPlaying)

        if (isPlaying) {
            song.current.pause()
        }
        else {
            song.current.play()
        }
    }

    return (
        <div className="MusicPlayer">
            <audio
                onPlaying={onMusicPlaying}
                ref={song}
                onLoadedMetadata={() => {
                    progressBar.current.max = song.current.duration
                    progressBar.current.value = song.current.currentTime
                }}
            >
                <source
                    src={ state.currentSong.media_url }
                    type="audio/mpeg"
                />
            </audio>
            <div className="MusicPlayer__container">
                <div className="MusicPlayer__part MusicPlayer__part--left">
                    <img src={state.currentSong.image} alt="music" />
                    <div className="MusicPlayer__description">
                        <span className="MusicPlayer__title">{ state.currentSong.album }</span>
                        <ul className="MusicPlayer__artist">{ Object.keys(state.currentSong.artistMap).map(key => <li key={key}> { key }</li>) }</ul>
                    </div>
                </div>
                <div className="MusicPlayer__part MusicPlayer__part--center">
                    <div className="MusicPlayer__controls">
                        <input
                            className="range"
                            ref={progressBar}
                            type="range"
                            value={0}
                            onChange={() => {
                                song.current.play()
                                song.current.currentTime = progressBar.current.value
                            }}
                        />

                        <div
                            className="skip-previous ctr-btn"
                            onClick={() => {
                                if (song.current.currentTime > 10) {
                                    song.current.currentTime -= 10
                                }
                            }}
                        >
                            <SkipPreviousIcon />
                        </div>

                        <div
                            onClick={() => playPause()}
                            className="play ctr-btn"
                            ref={playBtn}
                        >
                            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                        </div>

                        <div
                            className="skip-next ctr-btn"
                            onClick={() => {
                                if (song.current.duration - song.current.currentTime > 10) {
                                    song.current.currentTime += 10
                                }
                            }}
                        >
                            <SkipNextIcon />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default MusicPlayer