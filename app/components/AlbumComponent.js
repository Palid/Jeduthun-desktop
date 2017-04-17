import React from 'react'
import styles from './AlbumComponent.css'
import { truncateString } from '../utils/componentUtils'
import imagePlus from '../media/add-to-playlist.svg'

const AlbumComponent = props =>
  <div className={styles.album}>
    <img src={props.album.cover.url} alt="cover"/>
    <h2>{truncateString.apply(props.album.title, [28, false])}</h2>
    <div className={styles.albumButton}>
      <button onClick={() => props.addToPlaylistAction(props.album)}>
        <svg width="50px" height="50px" viewBox="0 0 50 50">
          <polygon fillRule="evenodd" clipRule="evenodd" fill="#888131" points="33,17 33,0 17,0 17,17 0,17 0,33 17,33 17,50 33,50 
		33,33 50,33 50,17 	"/>
        </svg>
      </button>
    </div>
  </div>

export default AlbumComponent