import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import {
  add,
  deleteTrack,
  move,
  play,
  orderChange
} from '../reducers/playlistReducer'

class PlaylistContainer extends Component {
  constructor(props) {
    super(props)
  }

  render() { 
    return (
      <div className='container'>
        <h2>Playlist</h2>
        {this.props.tracks.map((item, index) =>
          <h4>{item.title}</h4>
        )}
      </div>
  )}
}

const mapStateToProps = (state) => {
  return state.playlistReducer
}

export default connect(mapStateToProps)(PlaylistContainer)