import React from "react"

const ListItem = ({song}) => {
    return (
        <div className="ListItem">
            <img src={song.image} alt="Song image" />
            <span>{ song.song }</span>
        </div>
    )
}

export default ListItem