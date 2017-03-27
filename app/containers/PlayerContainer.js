import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import {
  start,
  stop,
  pause,
  mute,
  optionsChange,
  next,
  prev,
  change
} from '../reducers/playerReducer'

class PlayerContainer extends Component {
  constructor(props) {
    super(props)
  }

  prepareAudioObject() {
    if(this.props.drive.file){
      let file = URL.createObjectURL(this.props.drive.file)
      return (
        <audio controls src={file}></audio>
      )   
    }
  }

  render() { 
    const audioObject = this.props.drive.file ? this.prepareAudioObject() : null
    return(
    <div className='container'>
      <h2>Player</h2>
      {audioObject}
    </div>
  )}
}

const mapStateToProps = (state) => {
  return state.playerReducer
}

export default connect(mapStateToProps)(PlayerContainer)