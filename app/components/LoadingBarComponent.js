// @flow
import React from 'react'
import styles from './LoadingBarComponent.css'

class ProgressBarComponent extends React.Component {
  constructor(props) {
    super(props)
  }

  render () {
    const props = this.props
    return(
      <div className={styles.loadingBar}>
        <div
        className={styles.loadingBarInner} 
        style={
          {
            width: props.loadingStatus + '%',
            backgroundColor: props.bgColor
          }
        }></div>
      </div>
    )
  }
}

ProgressBarComponent.propTypes = {
  parentWidth: React.PropTypes.number.isRequired,
  parentHeight: React.PropTypes.number.isRequired,
  loadingStatus: React.PropTypes.number.isRequired,
  bgColor: React.PropTypes.string.isRequired,
}

export default ProgressBarComponent