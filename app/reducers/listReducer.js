// @flow
import trackReducer from './trackReducer'
import { add } from './playlistReducer'
import searchYoutube from 'youtube-search'
import update from 'immutability-helper'

const SEARCH_QUERY = 'SEARCH_QUERY'
const ADD_ALBUM = 'ADD_ALBUM'
const CLEAR_LIST = 'CLEAR_LIST'
const UPDATE_LIST_SETTINGS = 'UPDATE_LIST_SETTINGS'

function prepareAlbum(object) {
  return {
    cover: object.thumbnails.high,
    id: object.id,
    title: object.title,
    description: object.description,
    link: object.link
  }
}

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

export function searchQueryAction (query, options) {
  return dispatch => {
    dispatch(clearListAction())
    searchYoutube(query, options, function(err, results, pageInfo){
      if(err) return console.log(err)
      dispatch(updateListSettingsAction(pageInfo))
      results.forEach(function (item, i) {
        dispatch(addAlbumAction(item))
      })
    })
  }
}

export const INITIAL_STATE = {
  albums: [],
  listConfiguration: {},
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
        albums: {$push: [prepareAlbum(action.album)]}
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