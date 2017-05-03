import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import bindIndexToActionCreators from '../reducers/bindIndexToActionCreators'

import {
  playTrackAction,
  stopTrackAction,
  downloadTrackAction,
  saveTrackAction
} from '../reducers/trackReducer'
import {
  add,
  deleteTrack,
  move,
  play,
  orderChange,
  loadExistingFiles
} from '../reducers/playlistReducer'
import TrackComponent from '../components/TrackComponent'
import styles from './PlaylistContainer.css'

class PlaylistContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount(nextProps) {
    if(!nextProps){
      this.props.dispatch(loadExistingFiles())
    }
  }

  render() { 
    return (
      <div className={styles.playlist}>
        {this.props.tracks.map((item, index) =>
          <TrackComponent track={item} key={index} id={index}
          {...trackDispatchProperties(index)(this.props.dispatch)}/>
        )}
      </div>
  )}
}

const mapStateToProps = (state) => {
  return state.playlistReducer
}

const trackDispatchProperties =
  index =>
    dispatch => bindActionCreators(
      bindIndexToActionCreators({
        playTrackAction,
        stopTrackAction,
        downloadTrackAction,
        saveTrackAction,
        move,
        deleteTrack
      }, index),
    dispatch)

export default connect(mapStateToProps)(PlaylistContainer)