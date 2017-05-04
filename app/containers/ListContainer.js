import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { 
  youtubeSearchConfig
} from '../statics/TypesAndDefaults'
import {
  addAlbumAction,
  searchQueryAction,
  loadResultsPageAction,
  addToPlaylistAction,
  updateListSettingsAction
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
  renderItems() {
    return this.props.albums.map((value, index) => 
      <AlbumContainer album={value} key={index} addToPlaylistAction={this.handleAddingAlbum}/>
    )
  }
  renderLoading() {
    return (
      <div>
        <svg x="0px" y="0px" width="40px" height="40px" viewBox="0 0 40 40" enableBackground="new 0 0 40 40">
          <path opacity="0.2" fill="#fff" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
            s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
            c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>
          <path fill="#fff" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
            C22.32,8.481,24.301,9.057,26.013,10.047z">
          <animateTransform attributeType="xml"
            attributeName="transform"
            type="rotate"
            from="0 20 20"
            to="360 20 20"
            dur="0.5s"
            repeatCount="indefinite"/>
          </path>
        </svg>
      </div>
    )
  }
  render() {
    const items = !this.props.listConfiguration.loading ? 
    this.renderItems() : this.renderLoading()
    return(
    <div>
      <div className={styles.list}>
        <SearchContainer 
          searchQueryAction={this.handleSearch}
          nextPageToken={this.props.listConfiguration.pageInfo.nextPageToken}
          prevPageToken={this.props.listConfiguration.pageInfo.prevPageToken}
        />
        {this.props.albums.length ? 
          <PaginationComponent
            handlePageLoadNext={() => this.handleSearch(this.props.listConfiguration.query, this.prepareNavObj(this.props.listConfiguration.pageInfo.nextPageToken))}
            handlePageLoadPrev={() => this.handleSearch(this.props.listConfiguration.query, this.prepareNavObj(this.props.listConfiguration.pageInfo.prevPageToken))}
          /> : ''
        }
        {items}
        {this.props.albums.length ? 
          <PaginationComponent
            handlePageLoadNext={() => this.handleSearch(this.props.listConfiguration.query, this.prepareNavObj(this.props.listConfiguration.pageInfo.nextPageToken))}
            handlePageLoadPrev={() => this.handleSearch(this.props.listConfiguration.query, this.prepareNavObj(this.props.listConfiguration.pageInfo.prevPageToken))}
          /> : ''
        }
      </div>
    </div>
  )}
}

const mapStateToProps = (state) => {
  return state.listReducer
}

export default connect(mapStateToProps)(ListContainer)