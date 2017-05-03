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
import {
  changeTrackStatusAction
} from '../reducers/trackReducer'
import ProgressBar from '../components/ProgressBarComponent'
import { secondsToTime } from '../utils/componentUtils'
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

  prepareTimer() {
    if (this.props.memory) {
      const memoryTime = Math.round(this.props.memory.currentTime)
      const memoryDuration = Math.round(this.props.memory.currentDuration)
      const timeObj = secondsToTime(memoryTime)
      const durationObj = secondsToTime(memoryDuration)
      const time = `${timeObj.h > 0 ? timeObj.h + ':' : ''}${timeObj.m}:${timeObj.s < 10 ? '0' + timeObj.s : timeObj.s}`
      const duration = `${durationObj.h > 0 ? durationObj.h + ':' : ''}${durationObj.m}:${durationObj.s < 10 ? '0' + durationObj.s : durationObj.s}`
      return (
        <span className={styles.timer}>
          {time} / {duration}
        </span>
      )
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.drive.index != this.props.drive.index) {
      if (nextProps.drive.index != this.props.memory.prev) {
        this.props.dispatch(memoryChange({...this.props.memory, prev: this.props.drive.index}))
      }
      if (typeof(this.props.drive.index) === 'number') {
        this.props.dispatch(changeTrackStatusAction('READY', this.props.drive.index))
      }
    }
  }

  componentDidUpdate(nextProps) {
    if(nextProps.drive !== this.props.drive){
      this.audioEl.play()
    }
  }

  handlePlayEvent() {
    this.props.dispatch(start('PLAY'))
    this.props.dispatch(changeTrackStatusAction('PLAYING', this.props.drive.index))
  }

  handlePauseEvent() {
    this.props.dispatch(changeTrackStatusAction('PAUSED', this.props.drive.index))
    this.props.dispatch(stop('PAUSE'))
  }

  handleEndEvent() {
    this.props.dispatch(changeTrackStatusAction('READY', this.props.drive.index))
    this.props.dispatch(stop('STOP'))
    if (this.props.options.repeatAll) {
      this.props.dispatch(next(this.props.drive.index + 1, false))
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
    if (typeof(this.props.drive.index) !== 'string') {
      if (this.props.options.repeatOne) {
        this.audioEl.load()
        this.props.dispatch(next(this.props.drive.index, false))
      } else {
        this.props.dispatch(next(this.props.drive.index + 1, false))
      }
    }
  }

  handlePrev() {
    if (this.props.drive.index) {
      if (this.props.options.repeatOne) {
        this.audioEl.load()
        this.props.dispatch(next(this.props.drive.index, false))
      } else if (typeof(this.props.memory.prev) === 'number' && this.props.options.shuffle) {
        this.props.dispatch(next(this.props.memory.prev, true))
      } else {
        this.props.dispatch(next(this.props.drive.index - 1, false))
      }
    }
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
        const containerWidth = this.containerEl.offsetWidth - 40
        this.audioEl.currentTime = this.audioEl.duration * (event / containerWidth)
      }
      catch (err) {
        if (window.console && console.error("Error:" + err));
      }
    }
  }

  getRepeatStatus() {
    const props = this.props
    if(props.options.repeatOne){
      return {__html: 'repeat: <b>one</b>'}
    } else if(props.options.repeatAll){
      return {__html: 'repeat: <b>all</b>'}
    } else if(!props.options.repeatOne && !props.options.repeatAll) {
      return {__html: 'repeat: <b>none</b>'}
    }
  }

  getShuffleStatus() {
    const props = this.props
    if(props.options.shuffle){
      return {__html: 'shuffle: <b>on</b>'}
    } else {
      return {__html: 'shuffle: <b>off</b>'}
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
    const nowPlaying = props.drive ? <h1 className={styles.nowPlaying}>{props.drive.title}</h1> : ''
    const playPauseButton = props.status === 'PAUSE' ? 
    <button onClick={() => this.handlePlay()}>
      <svg>
        
      </svg>
    </button> :
    <button onClick={() => this.handlePause()}>
      <svg width="17px" height="20px" viewBox="0 0 17 20">
          <rect fillRule="evenodd" clipRule="evenodd" fill="#888131" width="6" height="20"/>
          <rect x="11" fillRule="evenodd" clipRule="evenodd" fill="#888131" width="6" height="20"/>
      </svg>
    </button>
    const muteButton = props.options.volume === 0 ? 
    <button className={styles.controlsButton} onClick={() => this.handleVolumeChange(1)}>unmute</button> :
    <button className={styles.controlsButton} onClick={() => this.handleVolumeChange(0)}>mute</button>
    const timerCount = this.prepareTimer()
    return(
    <div className={styles.player} ref={(ref) => { this.containerEl = ref }}>
      {audioObject}
      {nowPlaying}
      {timerCount}
      <ProgressBar
      playerWidth={this.containerEl ? this.containerEl.offsetWidth : 0}
      songDuration={props.memory.currentDuration}
      currentTime={props.memory.currentTime}
      seek={(event) => this.handleSeek(event)}/>
      <div className={styles.options}>
        <div className={styles.optionsLeft}>
          <button
          className={styles.controlsButton}
          onClick={() => this.toggleRepeatMode()}
          dangerouslySetInnerHTML={repeatStatus}
          ></button>
        </div>
        <div className={styles.optionsCenter}>
          <button
          className={styles.controlsButton}
          onClick={() => this.toggleShuffleMode()}
          dangerouslySetInnerHTML={shuffleStatus}
          ></button>
        </div>
        <div className={styles.optionsRight}>
          {muteButton}
        </div>
      </div>
      <div className={styles.controls}>
        <button onClick={() => this.handlePrev()}>
          <svg width="14.914px" height="12px" viewBox="0 0 14.914 12">
            <g transform="rotate(-180 7.456999778747559,5.999999999999999)">
              <polygon stroke="null" id="svg_1" points="7.375,6.13 7.375,12 14.914,6 7.375,0 7.375,5.87 0,0 0,12  " fill="#888131"/>
            </g>
          </svg>
        </button>
        {playPauseButton}
        <button onClick={() => this.handleNext()}>
          <svg width="14.914px" height="12px" viewBox="0 0 14.914 12">
              <polygon fill="#888131" points="7.375,6.13 7.375,12 14.914,6 7.375,0 7.375,5.87 0,0 0,12 	"/>
          </svg>
        </button>
      </div>
    </div>
  )}
}

const mapStateToProps = (state) => {
  return state.playerReducer
}

export default connect(mapStateToProps)(PlayerContainer)
