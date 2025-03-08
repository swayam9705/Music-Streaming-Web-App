import React, { useEffect, useRef, useState } from "react"
import "./MusicPlayer.css"


// icons
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import SkipNextIcon from '@mui/icons-material/SkipNext'
import PauseIcon from '@mui/icons-material/Pause'

// content
import { useStateValue } from "../ContextManager"
import { useParams } from "react-router-dom"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../config/firebase_config"


function MusicPlayer() {

    const { id } = useParams();
    const [song, setSong] = useState(null); // Initialize as null
    const [isPlaying, setIsPlaying] = useState(false);
    const progressBar = useRef(null);
    const songRef = useRef(null);
    const intervalRef = useRef(null); // Ref for interval
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchSong = async () => {
            setIsLoading(true);
            try {
                const docRef = doc(db, "songs", id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setSong(docSnap.data());
                } else {
                    console.log("No such document!");
                }
            } catch (err) {
                console.error("Error getting document: ", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSong();

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [id]);

    useEffect(() => {
        if (song && song.media_url) {
            songRef.current.src = song.media_url
        }
    }, [song])


    const onMusicPlaying = () => {
        intervalRef.current = setInterval(() => {
            if (songRef.current) {
                progressBar.current.value = songRef.current.currentTime
            }
        }, 500)
    }

    const playPause = () => {
        if (!songRef.current) return;
        setIsPlaying(!isPlaying);

        if (isPlaying) {
            songRef.current.pause();
            clearInterval(intervalRef.current);
        } else {
            songRef.current.play();
            onMusicPlaying();
        }
    }

    const handleProgressBarChange = () => {
        if (songRef.current) {
            songRef.current.currentTime = progressBar.current.value

            if (!isPlaying) {
                songRef.current.play()
                setIsPlaying(true)
                onMusicPlaying()
            }
        }
    }

    if (isLoading) {
        return <p>Loading ...</p>
    }
    if (!song) {
        return <p>Song not found</p>
    }

    return (
        <div className="MusicPlayer">
            <audio
                ref={songRef}
                onLoadedMetadata={() => {
                    progressBar.current.max = songRef.current.duration
                    progressBar.current.value = songRef.current.currentTime
                }}
                onEnded={() => {
                    setIsPlaying(false)
                    clearInterval(intervalRef.current)
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
                            onChange={handleProgressBarChange}
                        />

                        <div
                            className="skip-previous ctr-btn"
                            onClick={() =>  {
                                if (songRef.current && songRef.current.currentTime > 10) {
                                    songRef.current.currentTime -= 10
                                }
                            }}
                        >
                            <SkipPreviousIcon />
                        </div>

                        <div
                            onClick={playPause}
                            className="play ctr-btn"
                        >
                            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                        </div>

                        <div
                            className="skip-next ctr-btn"
                            onClick={() => {
                                if (songRef.current && songRef.current.duration - songRef.current.currentTime > 10) {
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