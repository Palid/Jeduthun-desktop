import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import {
  addAlbumAction,
  searchQueryAction,
  loadResultsPageAction,
  addToPlaylistAction
} from '../reducers/listReducer'
import AlbumContainer from '../components/AlbumComponent'
import SearchContainer from './SearchContainer'

class ListContainer extends Component {
  constructor(props) {
    super(props)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleAddingAlbum = this.handleAddingAlbum.bind(this)
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
    <div className='container'>
      <SearchContainer 
        searchQueryAction={this.handleSearch}
        nextPageToken={this.props.listConfiguration.nextPageToken}
        prevPageToken={this.props.listConfiguration.prevPageToken}
      />
      {this.props.albums.map((value, index) => 
        <AlbumContainer album={value} key={index} addToPlaylistAction={this.handleAddingAlbum}/>
      )}
    </div>
  )}
}

const mapStateToProps = (state) => {
  return state.listReducer
}

export default connect(mapStateToProps)(ListContainer)