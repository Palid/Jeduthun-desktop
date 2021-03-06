import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import bindIndexToActionCreators from '../reducers/bindIndexToActionCreators'

import {
  playTrackAction,
  stopTrackAction,
  downloadTrackAction,
  saveTrackAction,
  checkTrackStatusAction
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

  componentWillReceiveProps(nextProps) {
    if(this.props.library !== nextProps.library){
      this.props.dispatch(loadExistingFiles(nextProps.library))
    }
  }

  render() { 
    return (
      <div className={styles.playlist}>
        {this.props.tracks.map((item, index) =>
          <TrackComponent track={item} key={index} id={index} library={this.props.library}
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
        checkTrackStatusAction,
        move,
        deleteTrack
      }, index),
    dispatch)

export default connect(mapStateToProps)(PlaylistContainer)