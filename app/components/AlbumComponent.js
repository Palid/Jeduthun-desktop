import React from 'react'
import styles from './AlbumComponent.css'
import { truncateString } from '../utils/componentUtils'

const AlbumComponent = props =>
  <div className={styles.album}>
    <img src={props.album.cover.url} alt="cover"/>
    <h2>{truncateString.apply(props.album.title, [28, false])}</h2>
    <div className={styles.albumButton}>
      <button onClick={() => props.addToPlaylistAction(props.album)}>Add to playlist</button>
    </div>
  </div>

export default AlbumComponent