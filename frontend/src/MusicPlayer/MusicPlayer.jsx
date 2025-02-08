import React, { useEffect, useRef, useState } from "react"
import "./MusicPlayer.css"


// icons
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import PauseIcon from '@mui/icons-material/Pause';


function MusicPlayer(props) {

    const [isPlaying, setIsPlaying] = useState(false)
    const progressBar = useRef(null)
    const song = useRef(null)
    const playBtn = useRef(null)

    useEffect(() => {
        if (song.current.play()) {
            setInterval(() => {
                progressBar.current.value = song.current.currentTime
            }, 500)
        }
    }, [])

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
                ref={song}
                onLoadedMetadata={() => {
                    progressBar.current.max = song.current.duration
                    progressBar.current.value = song.current.currentTime
                }}
            >
                <source
                    src={props.link}
                    type="audio/mpeg"
                />
            </audio>
            <div className="MusicPlayer__container">
                <div className="MusicPlayer__part MusicPlayer__part--left">
                    <img src={props.img} alt="music" />
                    <div className="MusicPlayer__description">
                        <span className="MusicPlayer__title">{ props.title }</span>
                        <span className="MusicPlayer__artist">{ props.artist }</span>
                    </div>
                </div>
                <div className="MusicPlayer__part MusicPlayer__part--center">
                    <div className="MusicPlayer__controls">
                        <input
                            className="range"
                            ref={progressBar}
                            type="range"
                            onChange={() => {
                                song.current.play()
                                song.current.currentTime = progressBar.current.value
                            }}
                        />

                        <div className="skip-previous ctr-btn">
                            <SkipPreviousIcon />
                        </div>

                        <div
                            onClick={() => playPause()}
                            className="play ctr-btn"
                            ref={playBtn}
                        >
                            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                        </div>

                        <div className="skip-next ctr-btn">
                            <SkipNextIcon />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default MusicPlayer