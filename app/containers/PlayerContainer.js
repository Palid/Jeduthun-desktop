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
    this.handlePlay = this.handlePlay.bind(this)
  }

  prepareAudioObject() {
    if(this.props.drive.file){
      let file = URL.createObjectURL(this.props.drive.file)
      return (
        <audio controls src={file}></audio>
      )   
    }
  }

  handlePlay() {
    const props = this.props
    const currentState = {
      drive: props.drive,
      memory: props.memory,
      option: props.options,
      state: props.state,
    }
    this.props.dispatch(start(currentState))
  }

  render() { 
    const audioObject = this.props.drive.file ? this.prepareAudioObject() : null
    return(
    <div className='container'>
      <h2>Player</h2>
      {audioObject}
      <button onClick={this.handlePlay}>Play</button>
    </div>
  )}
}

const mapStateToProps = (state) => {
  return state.playerReducer
}

export default connect(mapStateToProps)(PlayerContainer)