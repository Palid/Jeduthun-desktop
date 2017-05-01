import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import {
  start,
  stop,
  pause,
  mute,
  optionsChange,
  memoryChange,
  next,
  change,
} from '../reducers/playerReducer'
import ProgressBar from '../components/ProgressBarComponent'
import styles from './PlayerContainer.css'

class PlayerContainer extends Component {
  constructor(props) {
    super(props)
    this.handlePlayEvent = this.handlePlayEvent.bind(this)
    this.handlePauseEvent = this.handlePauseEvent.bind(this)
    this.handleEndEvent = this.handleEndEvent.bind(this)
    this.handleTimeUpdateEvent = this.handleTimeUpdateEvent.bind(this)
    this.handleAudioLoadEvent = this.handleAudioLoadEvent.bind(this)
    this.handleNext = this.handleNext.bind(this)
    this.handlePrev = this.handlePrev.bind(this)
    this.handlePlay = this.handlePlay.bind(this)
    this.handlePause = this.handlePause.bind(this)
    this.handleVolumeChange = this.handleVolumeChange.bind(this)
    this.handleSeek = this.handleSeek.bind(this)
    this.toggleRepeatMode = this.toggleRepeatMode.bind(this)
    this.toggleShuffleMode = this.toggleShuffleMode.bind(this)
  }

  prepareAudioObject() {
    if(this.props.drive.file){
      return (
        <audio
        controls
        src={this.props.drive.file}
        onPlay={this.handlePlayEvent}
        onPause={this.handlePauseEvent}
        onEnded={this.handleEndEvent}
        onTimeUpdate={this.handleTimeUpdateEvent}
        onLoadedData={this.handleAudioLoadEvent}
        ref={(ref) => { this.audioEl = ref }}
        loop={this.props.options.repeatOne}
        ></audio>
      )
    }
  }

  componentDidUpdate(nextProps) {
    if(nextProps.drive != this.props.drive){
      this.audioEl.play()
    }
  }

  handlePlayEvent() {
    this.props.dispatch(start('PLAY'))
  }

  handlePauseEvent() {
    this.props.dispatch(stop('PAUSE'))
  }

  handleEndEvent() {
    this.props.dispatch(stop('STOP'))
    if (this.props.options.repeatAll) {
      this.props.dispatch(next(this.props.drive.index + 1))
    }
  }

  handleTimeUpdateEvent() {
    const currentTime = this.audioEl.currentTime
    this.props.dispatch(memoryChange({
      ...this.props.memory, 
      currentTime: this.audioEl.currentTime
    }))
  }

  handleAudioLoadEvent() {
    if (this.audioEl) {
      this.props.dispatch(optionsChange({
        ...this.props.options,
        volume: this.audioEl.volume
      }))
      this.props.dispatch(memoryChange({
        ...this.props.memory,
        currentDuration: this.audioEl.duration
      }))
    }
  }

  handlePlay() {
    if (this.audioEl) {
      this.audioEl.play()
    }
  }

  handlePause() {
    if (this.audioEl) {
      this.audioEl.pause()
    }
  }

  handleNext() {
    this.props.dispatch(memoryChange({...this.props.memory, prev: this.props.drive.index}))
    this.props.dispatch(next(this.props.drive.index + 1))
  }

  handlePrev() {
    this.props.dispatch(memoryChange({...this.props.memory, prev: this.props.drive.index}))
    this.props.dispatch(next(this.props.drive.index - 1))
  }

  handleVolumeChange(value) {
    if (this.audioEl) {
      this.audioEl.volume = value
      this.props.dispatch(optionsChange({
        ...this.props.options,
        volume: this.audioEl.volume
      }))
    }
  }

  handleSeek(event) {
    if (event) {
      try {
        this.audioEl.currentTime = this.audioEl.duration * (event / this.containerEl.offsetWidth)
      }
      catch (err) {
        if (window.console && console.error("Error:" + err));
      }
    }
  }

  getRepeatStatus() {
    const props = this.props
    if(props.options.repeatOne){
      return 'repeat one'
    } else if(props.options.repeatAll){
      return 'repeat all'
    } else if(!props.options.repeatOne && !props.options.repeatAll) {
      return 'no repeat'
    }
  }

  getShuffleStatus() {
    const props = this.props
    if(props.options.shuffle){
      return 'shuffle: on'
    } else {
      return 'shuffle: off'
    }
  }

  toggleRepeatMode() {
    const props = this.props
    if(props.options.repeatOne){
      props.dispatch(optionsChange({...props.options, repeatOne: false, repeatAll: false}))
    } else if(props.options.repeatAll){
      props.dispatch(optionsChange({...props.options, repeatOne: true, repeatAll: false}))
    } else if(!props.options.repeatOne && !props.options.repeatAll) {
      props.dispatch(optionsChange({...props.options, repeatOne: false, repeatAll: true}))
    }
  }

  toggleShuffleMode() {
    const props = this.props
    if(props.options.shuffle){
      props.dispatch(optionsChange({...props.options, shuffle: false}))
    } else {
      props.dispatch(optionsChange({...props.options, shuffle: true}))
    }
  }

  render() {
    const props = this.props
    const audioObject = props.drive.file ? this.prepareAudioObject() : null
    const repeatStatus = this.getRepeatStatus()
    const shuffleStatus = this.getShuffleStatus()
    const nowPlaying = props.drive ? <span>Now Playing: {props.drive.title}</span> : ''
    const playPauseButton = props.status === 'PAUSE' ? <button onClick={() => this.handlePlay()}>Play</button> : <button onClick={() => this.handlePause()}>Pause</button>
    const muteButton = props.options.volume === 0 ? <button onClick={() => this.handleVolumeChange(1)}>unmute</button> : <button onClick={() => this.handleVolumeChange(0)}>mute</button>
    return(
    <div className={styles.player} ref={(ref) => { this.containerEl = ref }}>
      <h2>Player</h2>
      {nowPlaying}
      <button onClick={() => this.handlePrev()}>Prev</button>
      <button onClick={() => this.handleNext()}>Next</button>
      {audioObject}
      <button onClick={() => this.toggleRepeatMode()}>{repeatStatus}</button>
      <button onClick={() => this.toggleShuffleMode()}>{shuffleStatus}</button>
      {muteButton}
      {playPauseButton}
      <ProgressBar
      playerWidth={this.containerEl ? this.containerEl.offsetWidth : 0}
      songDuration={props.memory.currentDuration}
      currentTime={props.memory.currentTime}
      seek={(event) => this.handleSeek(event)}/>
    </div>
  )}
}

const mapStateToProps = (state) => {
  return state.playerReducer
}

export default connect(mapStateToProps)(PlayerContainer)
