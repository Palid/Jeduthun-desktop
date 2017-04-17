// @flow
import trackReducer from './trackReducer'
import { add } from './playlistReducer'
import searchYoutube from 'youtube-search'
import update from 'immutability-helper'
import { getYtLength } from '../utils/fileUtils'
import { youtubeSearchConfig } from '../statics/TypesAndDefaults'

const SEARCH_QUERY = 'SEARCH_QUERY'
const ADD_ALBUM = 'ADD_ALBUM'
const CLEAR_LIST = 'CLEAR_LIST'
const UPDATE_LIST_SETTINGS = 'UPDATE_LIST_SETTINGS'

export const addAlbumAction = (album) => ({
  type: ADD_ALBUM,
  album
})

export const clearListAction = () => ({
  type: CLEAR_LIST
})

export const updateListSettingsAction = (options) => ({
  type: UPDATE_LIST_SETTINGS,
  options
})

export function addToPlaylistAction (album) {
  album.status = 'NEW'
  return dispatch => {
    dispatch(add(album))
  }
}

export function prepareAlbumAction (album) {
  return dispatch => {
    getYtLength(album.id, youtubeSearchConfig.key)
    .then(function(duration){
      dispatch(addAlbumAction({
        cover: album.thumbnails.high,
        id: album.id,
        title: album.title,
        description: album.description,
        link: album.link,
        duration: duration
      }))
    })
  }
}

export function searchQueryAction (query, options) {
  return dispatch => {
    dispatch(clearListAction())
    searchYoutube(query, options, function(err, results, pageInfo){
      if(err) return console.error(err)
      dispatch(updateListSettingsAction({pageInfo: pageInfo, query: query}))
      results.forEach(function (item, i) {
        dispatch(prepareAlbumAction(item))
      })
    })
  }
}

export const INITIAL_STATE = {
  albums: [],
  listConfiguration: {
    query: '',
    pageInfo: {}
  },
}

const reducer = (state = INITIAL_STATE, action) => {
  if(action.type.startsWith('albums/')) {
    return update(state, {
      albums: {$set: [
        ...state.albums.slice(0, action.index),
        albumReducer(state.albums[action.index], action),
        ...state.albums.slice(action.index + 1)
      ]}
    })
  }
  switch (action.type) {
    case ADD_ALBUM:
      return update(state, {
        albums: {$push: [action.album]}
      })
    case SEARCH_QUERY:
      return {
        ...state
      }
    case CLEAR_LIST:
      return update(state, {
        albums: {$set: []}
      })
    case UPDATE_LIST_SETTINGS:
      return update(state, {
        listConfiguration: {$merge: action.options}
      })
    default:
      return {
        ...state
      }
  }
}

export default reducer