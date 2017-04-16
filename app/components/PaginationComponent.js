// @flow
import React from 'react'
import styles from './PaginationComponent.css'
import imageArrowNext from '../media/arrow-next.svg'
import imageArrowPrev from '../media/arrow-prev.svg'

const PaginationComponent = props =>
  <div className={styles.pagination}>
    <button onClick={props.handlePageLoadPrev}>
      <svg width="11.314px" height="22.627px" viewBox="0 0 11.314 22.627">
        <polygon fill="#E4E4E4" points="0,11.314 11.314,0 11.314,22.627 	"/>
      </svg>
      PREV
    </button>
    <button onClick={props.handlePageLoadNext}>
      NEXT
      <svg width="11.314px" height="22.627px" viewBox="0 0 11.314 22.627" >
        <polygon fill-rule="evenodd" clip-rule="evenodd" fill="#E4E4E4" points="11.314,11.313 0,22.627 0,0 	"/>
      </svg>
    </button>
  </div>

export default PaginationComponent