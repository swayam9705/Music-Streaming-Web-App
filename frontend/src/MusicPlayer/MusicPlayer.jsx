import React, { useEffect, useRef, useState } from "react"
import "./MusicPlayer.css"


// icons
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import PauseIcon from '@mui/icons-material/Pause';

// content
import { useStateValue } from "../ContextManager";


function MusicPlayer({ song }) {

    const [ state, _ ] = useStateValue()

    const [isPlaying, setIsPlaying] = useState(false)
    const progressBar = useRef(null)
    const songRef = useRef(null)
    const playBtn = useRef(null)

    useEffect(() => {
        progressBar.current.value = 0
        songRef.current.src = song.media_url
        console.log(song.media_url)
    }, [state])

    const onMusicPlaying = () => {
        setInterval(() => {
            progressBar.current.value = songRef.current?.currentTime
        }, 500)
    }

    const playPause = () => {
        setIsPlaying(!isPlaying)

        if (isPlaying) {
            songRef.current.pause()
        }
        else {
            songRef.current.play()
        }
    }

    return (
        <div className="MusicPlayer">
            <audio
                onPlaying={onMusicPlaying}
                ref={songRef}
                onLoadedMetadata={() => {
                    progressBar.current.max = songRef.current.duration
                    progressBar.current.value = songRef.current.currentTime
                }}
            >
                <source
                    src={ song.media_url }
                    type="audio/mpeg"
                />
            </audio>
            <div className="MusicPlayer__container">
                <div className="MusicPlayer__part MusicPlayer__part--left">
                    <img src={song.image} alt="music" />
                    <div className="MusicPlayer__description">
                        <span className="MusicPlayer__title">{ song.song }</span>
                        <span className="MusicPlayer__artist">{ song.singer }</span>
                    </div>
                    <div className="shadow"></div>
                </div>
                <div className="MusicPlayer__part MusicPlayer__part--center">
                    <div className="MusicPlayer__controls">
                        <input
                            className="range"
                            ref={progressBar}
                            type="range"
                            value={0}
                            onChange={() => {
                                songRef.current.play()
                                songRef.current.currentTime = progressBar.current.value
                            }}
                        />

                        <div
                            className="skip-previous ctr-btn"
                            onClick={() => {
                                if (songRef.current.currentTime > 10) {
                                    songRef.current.currentTime -= 10
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
                                if (songRef.current.duration - songRef.current.currentTime > 10) {
                                    songRef.current.currentTime += 10
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