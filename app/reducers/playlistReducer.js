import { playlistDefaults } from './../statics/TypesAndDefaults'
import update from 'immutability-helper'
import trackReducer from './trackReducer'
import { checkLibrary } from '../utils/fileUtils'

const ADD = 'playlist/ADD'
const DELETE = 'playlist/DELETE'
const MOVE = 'playlist/MOVE'
const PLAY = 'playlist/PLAY'
const ORDER_CHANGE = 'playlist/ORDER_CHANGE'

export const add = (track) => ({
  type: ADD,
  track
})
export const deleteTrack = (index) => ({
  type: DELETE,
  index
})
export const move = (track, index, newIndex) => ({
  type: MOVE,
  track,
  index,
  newIndex
})
export const play = (track) => ({
  type: PLAY,
  track
})
export const orderChange = (order) => ({
  type: ORDER_CHANGE,
  order
})
export function loadExistingFiles (library) {
  console.log(library)
  return dispatch => {
    checkLibrary(library).then(function(files){
      let savedFiles = []
      files.forEach(file => {
        console.log(file)
        console.log(library + file)
        dispatch(add({
          file: library + '\\' + file,
          title: file,
          status: 'READY'
        }))
      });
    })
  }
}

// TODO:
// Load all saved tracks from pointed folder
const reducer = (state = playlistDefaults, action) => {
  if(action.type.startsWith('tracks/')) {
    return update(state, {
      tracks: {$set: [
        ...state.tracks.slice(0, action.index),
        trackReducer(state.tracks[action.index], action),
        ...state.tracks.slice(action.index + 1)
      ]}
    })
  }
  switch(action.type) {
    case ADD:
      return update(state, {tracks: {$push: [action.track]}})
      break
    case DELETE:
      return update(state.tracks, {$splice: [action.index, 1]})
      break
    case MOVE:
      // TODO:
      // dispatch DELETE on MOVE and then add at new index
      return update(state.tracks, {$splice: [action.index, 1]})
      break
    case ORDER_CHANGE:
      return update(state, {order: {$set: action.order}})
      break
    default:
      return state
  }
}

export default reducer