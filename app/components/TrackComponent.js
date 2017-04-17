import React from 'react'

class TrackComponent extends React.Component {
  componentDidMount(){
    if(this.props.checkTrackStatusAction){
      this.props.checkTrackStatusAction(this.props.track, this.props.id)
    }
  }
  render() {    
    const props = this.props
    const loading = props.track.loading ? <p>{props.track.loading}</p> : ''
    const cover = props.track.cover ? <img src={props.track.cover.url} alt="cover"/> : ''
    return(
      <div className="album">
        <h3>{props.track.title}</h3>
        {loading}
        {cover}
        <button onClick={() => props.playTrackAction(props.track, props.id)}>Play</button>
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