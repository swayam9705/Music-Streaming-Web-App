import React from "react"
import { Link } from "react-router-dom"

const ListItem = ({song}) => {
    return (
        <Link to={`/song/${song.id}`} className="ListItem">
            <img src={song.image} alt="Song image" />
            <span>{ song.song }</span>
        </Link>
    )
}

export default ListItem