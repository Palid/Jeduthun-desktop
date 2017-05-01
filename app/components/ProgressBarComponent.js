// @flow
import React from 'react'
import styles from './ProgressBarComponent.css'

class ProgressBarComponent extends React.Component {
  constructor(props) {
    super(props)
    this.handleSeek = this.handleSeek.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.currentTime != this.props.currentTime) {
      this.handleTimeChange(nextProps.currentTime)
    }
  }

  handleTimeChange(elapsedTime) {
    if (this.canvasEl) {
      const canvas = this.canvasEl
      let ctx = canvas.getContext("2d")
      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
      ctx.fillStyle = "rgb(193, 201, 96)"
      const fWidth = (Math.round(elapsedTime)) / Math.round(this.props.songDuration) * (canvas.clientWidth)
      if (fWidth > 0) {
          ctx.fillRect(0, 0, fWidth, canvas.clientHeight)
      }
    }
  }

  handleSeek(event) {
    event.persist()
    if (this.props.seek) {
      this.props.seek(event.nativeEvent.offsetX)
    }
  }

  render () {
    const props = this.props
    return(
      <div className={styles.progressBar}>
        <div className={styles.progressBarInner}>
          <canvas
          ref={(ref) => { this.canvasEl = ref }}
          width={props.playerWidth - 40}
          height="20"
          onClick={(event) => this.handleSeek(event)}>
          </canvas>
        </div>
      </div>
    )
  }
}

ProgressBarComponent.propTypes = {
  playerWidth: React.PropTypes.number,
  songDuration: React.PropTypes.number.isRequired,
  currentTime: React.PropTypes.number.isRequired,
  seek: React.PropTypes.func,
}

export default ProgressBarComponent