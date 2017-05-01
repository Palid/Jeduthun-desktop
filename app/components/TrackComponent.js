import React from 'react'
import styles from './TrackComponent.css'
import LoadingBar from '../components/LoadingBarComponent'

class TrackComponent extends React.Component {
  componentDidMount() {
    if(this.props.checkTrackStatusAction){
      this.props.checkTrackStatusAction(this.props.track, this.props.id)
    }
  }
  getLoadingState() {
    if(this.props.track.status === 'READY' || this.props.track.status === 'PLAYING' || this.props.track.status === 'PAUSED'){
      return 100
    } else if(this.props.track.loading){
      return this.props.track.loading
    } else {
      return 0
    }
  }
  getLoadingBg() {
    if(this.props.track.status === 'READY') {
      return '#fbfbfb'
    } else if(this.props.track.status === 'PLAYING') {
      return '#c1c960'
    } else if(this.props.track.status === 'PAUSED'){
      return '#e7ee98'
    } else {
      return '#fbfbfb'
    }
  }
  getNameStyle() {
    if(this.props.track.status === 'READY') {
      return styles.trackNameNormal
    } else if(this.props.track.status === 'PLAYING') {
      return styles.trackNamePlaying
    } else if(this.props.track.status === 'PAUSED'){
      return styles.trackNamePaused
    } else {
      return styles.trackNameLoading
    }
  }
  render() {
    const props = this.props
    const loading = this.getLoadingState()
    const loadingBg = this.getLoadingBg()
    const nameStyle = this.getNameStyle()
    return(
      <div
      className={styles.track}
      onClick={() => props.playTrackAction(props.track, props.id)}
      ref={(ref) => { this.trackEl = ref }}>
        <h3 className={nameStyle}>
          {props.track.title}
        </h3>
        <LoadingBar
        parentWidth={this.trackEl ? this.trackEl.offsetWidth : 0}
        parentHeight={this.trackEl ? this.trackEl.offsetHeight : 0}
        loadingStatus={loading} 
        bgColor={loadingBg}/>
      </div>
    )
  }
}

TrackComponent.propTypes = {
  track: React.PropTypes.object.isRequired,
  playTrackAction: React.PropTypes.func,
  stopTrackAction: React.PropTypes.func,
  downloadTrackAction: React.PropTypes.func,
  saveTrackAction: React.PropTypes.func,
  checkTrackStatusAction: React.PropTypes.func,
  move: React.PropTypes.func,
  deleteTrack: React.PropTypes.func,
}

export default TrackComponent