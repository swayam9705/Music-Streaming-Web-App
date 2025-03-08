import React from "react"
import "./Card.css"

import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded'
import { Link } from "react-router-dom"
function Card({ song }) {
    return (
        <div className="Card">
            <img
                className="Card__image"
                src={song.image}
                alt="Song Album Image"
            />
            <div className="Card__info">
                <h3 className="Card__title">{song.song}</h3>
                <p className="Card__singer">{song.singer}</p>
                <p className="Card__release-date">{song.release_date}</p>
                <Link to={`/song/${song.id}`} className="Card__play">
                    <PlayArrowRoundedIcon className="Card__playbn" />
                </Link>
            </div>
        </div>
    )
}

export default Card