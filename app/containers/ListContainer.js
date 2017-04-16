import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { 
  youtubeSearchConfig
} from '../statics/TypesAndDefaults'
import {
  addAlbumAction,
  searchQueryAction,
  loadResultsPageAction,
  addToPlaylistAction
} from '../reducers/listReducer'
import AlbumContainer from '../components/AlbumComponent'
import SearchContainer from './SearchContainer'
import PaginationComponent from '../components/PaginationComponent'
import styles from './ListContainer.css'

class ListContainer extends Component {
  constructor(props) {
    super(props)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleAddingAlbum = this.handleAddingAlbum.bind(this)
  }
  prepareNavObj(direction) {
    let options = youtubeSearchConfig
    options.pageToken = direction
    return options
  }
  handleSearch(query, options) {
    this.props.dispatch(searchQueryAction(query, options))
  }
  handlePageLoad(query, options, pageToken) {
    this.props.dispatch(loadResultsPageAction(query, options, pageToken))
  }
  handleAddingAlbum(album) {
    this.props.dispatch(addToPlaylistAction(album))
  }
  render() { return(
    <div className={styles.list}>
      <SearchContainer 
        searchQueryAction={this.handleSearch}
        nextPageToken={this.props.listConfiguration.pageInfo.nextPageToken}
        prevPageToken={this.props.listConfiguration.pageInfo.prevPageToken}
      />
      {this.props.albums.map((value, index) => 
        <AlbumContainer album={value} key={index} addToPlaylistAction={this.handleAddingAlbum}/>
      )}
      <PaginationComponent
        handlePageLoadNext={() => this.handleSearch(this.props.listConfiguration.query, this.prepareNavObj(this.props.listConfiguration.pageInfo.nextPageToken))}
        handlePageLoadPrev={() => this.handleSearch(this.props.listConfiguration.query, this.prepareNavObj(this.props.listConfiguration.pageInfo.prevPageToken))}
      />
    </div>
  )}
}

const mapStateToProps = (state) => {
  return state.listReducer
}

export default connect(mapStateToProps)(ListContainer)