import React from 'react'
import BasicInputComponent from '../components/formInputs/BasicInput'
import { 
  youtubeSearchConfig,
  videoLengths, 
  videoQualities, 
  listOrdering,
  searchDefaults
} from '../statics/TypesAndDefaults'
import PaginationComponent from '../components/PaginationComponent'
import styles from './SearchContainer.css'

class SearchContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = searchDefaults
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }
  prepareOptionsObj(direction) {
    // This is dirty, to be improved
    let options = youtubeSearchConfig
    if (this.state.videoLength.length > 0) {
      options.videoDuration = this.state.videoLength
    }
    if (this.state.videoLength.length > 0) {
      options.videoDefinition = this.state.videoQuality
    }
    if (this.state.videoLength.length > 0) {
      options.maxResults = this.state.resultsPerPage
    }
    if (this.state.videoLength.length > 0) {
      options.order = this.state.resultsOrder
    }
    if (this.props.nextPageToken && direction === 'next') {
      options.pageToken = this.props.nextPageToken
    }
    if (this.props.prevPageToken && direction === 'prev') {
      options.pageToken = this.props.prevPageToken
    }
    return options
  }
  handleSubmit(event, direction) {
    // TODO:
    // Validation
    if(event){
      event.preventDefault()
    }
    const stringOr = this.state.stringOr.length ? ' |'+ this.state.stringOr : ''
    const stringNot = this.state.stringNot.length ? ' -' + this.state.stringNot : '' 
    const query = `${this.state.stringMain}${stringOr}${stringNot}` 
    const options = this.prepareOptionsObj(direction)
    this.props.searchQueryAction(query, options)
  }
  render() {
    return(
      <div className={styles.search}>
        <form onSubmit={this.handleSubmit}>
          <div className={styles.formPart}>
            <h3>Search phrase:</h3>
            <BasicInputComponent
              name="stringMain"
              type="text"
              value={this.state.stringMain}
              onChange={this.handleChange}
            />
          </div>
          <div className={styles.formPart}>
            <h3>Additional phrase options:</h3>
            <BasicInputComponent
              name="stringOr"
              label="Or instead:"
              type="text"
              value={this.state.stringOr}
              onChange={this.handleChange}
              wrapperClass={styles.formPart_SplitHorizontal}
            />
            <BasicInputComponent
              name="stringNot"
              label="Exclude if contains:"
              type="text"
              value={this.state.stringNot}
              onChange={this.handleChange}
              wrapperClass={styles.formPart_SplitHorizontal}
            />
          </div>
          <div className={styles.formPart}>
            <h3>Video details:</h3>
            <BasicInputComponent
              name="videoLength"
              label="Video length:"
              type="select"
              value={this.state.videoLength}
              onChange={this.handleChange}
              options={videoLengths}
              wrapperClass={styles.formPart_SplitHorizontal}
            />
            <BasicInputComponent
              name="videoQuality"
              label="Video quality:"
              type="select"
              value={this.state.videoQuality}
              onChange={this.handleChange}
              options={videoQualities}
              wrapperClass={styles.formPart_SplitHorizontal}
            />
          </div>
          <div className={styles.formPart}>
            <h3>Results options:</h3>
            <BasicInputComponent
              name="resultsOrder"
              label="View order:"
              type="select"
              value={this.state.resultsOrder}
              onChange={this.handleChange}
              options={listOrdering}
              wrapperClass={styles.formPart_SplitHorizontal}
            />
            <BasicInputComponent
              name="resultsPerPage"
              label="Results per page:"
              type="text"
              value={this.state.resultsPerPage}
              onChange={this.handleChange}
              wrapperClass={styles.formPart_SplitHorizontal}
            />
          </div>
          <input type="submit" value="Submit"/>
        </form>
        
        <PaginationComponent
          handlePageLoadNext={() => this.handleSubmit(null, 'next')}
          handlePageLoadPrev={() => this.handleSubmit(null, 'prev')}
        />
      </div>
    )
  }
}

SearchContainer.propTypes = {
  searchParams: React.PropTypes.object
}

export default SearchContainer