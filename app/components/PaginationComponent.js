import React from 'react'

const PaginationComponent = props =>
  <div className="pagination">
    <button onClick={props.handlePageLoadPrev}>PrevPage</button>
    <button onClick={props.handlePageLoadNext}>NextPage</button>
  </div>

export default PaginationComponent