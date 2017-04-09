import React from 'react'

const AlbumComponent = props =>
  <div className="album">
    <h3>{props.album.title}</h3>
    <img src={props.album.cover.url} alt="cover"/>
    <button onClick={() => props.addToPlaylistAction(props.album)}>Add to playlist</button>
  </div>

export default AlbumComponent