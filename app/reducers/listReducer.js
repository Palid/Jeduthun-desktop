// @flow
import albumReducer from './albumReducer'
import { add } from './playlistReducer'
import searchYoutube from 'youtube-search'
import update from 'immutability-helper'
import fileDownload from './../utils/fileDownload'

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
  // TODO:
  // addToPlaylist should just dispatch event for the playlist with album object
  // then there should be an action always dispatched when new element arrives in the playlist
  // should start download and set it up to be playable in the album store
  // then dispatch start playing.
  // Build playlist first, then go on with it^
  return dispatch => {
    const src = `./library/${album.title}.mp3`
    fileDownload({
        remoteFile: `http://www.youtubeinmp3.com/fetch/?video=${album.link}`,
        localFile: src,
        onProgress: function (received,total){
            var percentage = (received * 100) / total;
            console.log(percentage + "% | " + received + " bytes out of " + total + " bytes.");
        }
    }).then(function() {
      let responseObject = {
        title: album.title,
        file: src
      }
      dispatch(add(responseObject))
      console.log("File succesfully downloaded");
    })
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