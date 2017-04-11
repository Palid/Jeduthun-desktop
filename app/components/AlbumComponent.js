import React from 'react'
import styles from './AlbumComponent.css'

const AlbumComponent = props =>
  <div className={styles.album}>
    <img src={props.album.cover.url} alt="cover"/>
    <h2>{props.album.title}</h2>
    <button onClick={() => props.addToPlaylistAction(props.album)}>Add to playlist</button>
  </div>

export default AlbumComponent