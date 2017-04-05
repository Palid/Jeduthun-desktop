// @flow
import update from 'immutability-helper'

// TODO:
// 1.) Modify according to recieved data for album
// 2.) Work through every function to make it really work

const PLAY_ALBUM = 'albums/PLAY_ALBUM'
const STOP_ALBUM = 'albums/STOP_ALBUM'
const DOWNLOAD_ALBUM = 'albums/DOWNLOAD_ALBUM'
const SAVE_ALBUM = 'albums/SAVE_ALBUM'

export const playAlbumAction = (album) => ({
  type: PLAY_ALBUM,
  album
})
export const stopAlbumAction = (album) => ({
  type: STOP_ALBUM,
  album
})
export const downloadAlbumAction = (album) => ({
  type: DOWNLOAD_ALBUM,
  album
})
export const saveAlbumAction = (album) => ({
  type: SAVE_ALBUM,
  album
})

const reducer = (state = {}, action) => {
  switch(action.type) {
    case PLAY_ALBUM:
      return update(state, {$merge: {flag: 'playing'}})
    case STOP_ALBUM:
      return update(state, {$merge: {flag: undefined}})
    case DOWNLOAD_ALBUM:
      return update(state, {$merge: action.album})
      break
    case SAVE_ALBUM:
      return update(state, {$merge: action.album})
      break
    default:
      return state
  }
}

export default reducer