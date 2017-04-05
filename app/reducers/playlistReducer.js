import { playlistDefaults } from './../statics/TypesAndDefaults'
import update from 'immutability-helper'

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

const reducer = (state = playlistDefaults, action) => {
  switch(action.type) {
    case ADD:
      console.log(action.track)
      // TODO:
      // Prepare object for the playlist (currentState:Playing etc)
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