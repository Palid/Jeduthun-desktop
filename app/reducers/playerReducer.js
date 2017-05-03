import { playerDefaults } from './../statics/TypesAndDefaults'
import update from 'immutability-helper'
import { getRandomArbitrary } from '../utils/fileUtils'
import {
  changeTrackStatusAction
} from '../reducers/trackReducer'

// TODO:
// 1.) Modify according to recieved data for album
// 2.) Work through every function to make it really work

const START = 'player/START'
const STOP = 'player/STOP'
const PAUSE = 'player/PAUSE'
const MUTE = 'player/MUTE'
const OPTIONS_CHANGE = 'player/OPTIONS_CHANGE'
const CHANGE = 'player/CHANGE'
const MEMORY_CHANGE = 'player/MEMORY_CHANGE'

export const start = (newState) => ({
  type: START,
  newState
})
export const stop = (newState) => ({
  type: STOP,
  newState
})
export const pause = (newState) => ({
  type: PAUSE,
  newState
})
export const mute = (newState) => ({
  type: MUTE,
  newState
})
export const optionsChange = (options) => ({
  type: OPTIONS_CHANGE,
  options
})
export const memoryChange = (memory) => ({
  type: MEMORY_CHANGE,
  memory
})
export const change = (album, index) => ({
  type: CHANGE,
  album,
  index
})
export function next (index) {
  return (dispatch, getState) => {
    const { playlistReducer, playerReducer } = getState()
    let nextTrack = null
    if(!playlistReducer){
      return console.error('PLAYER ERROR: No playlist found')
    }
    if(!playerReducer.options.shuffle) {
      const lastTrack = playlistReducer.tracks.length === index ? true : false
      if(lastTrack){
        nextTrack = playlistReducer.tracks[0]
        dispatch(change(nextTrack, 0))
        dispatch(changeTrackStatusAction('PLAYING', 0))
      } else {
        nextTrack = playlistReducer.tracks[index]
        dispatch(change(nextTrack, index))
        dispatch(changeTrackStatusAction('PLAYING', index))
      }
    } else {
      const nextTrackIndex = getRandomArbitrary(0, playlistReducer.tracks.length)
      nextTrack = playlistReducer.tracks[nextTrackIndex]
      dispatch(change(nextTrack, nextTrackIndex))
      dispatch(changeTrackStatusAction('PLAYING', nextTrackIndex))
    }
  }
}

const reducer = (state = playerDefaults, action) => {
  switch(action.type) {
    case START:
      return update(state, {$merge: {status: action.newState}})
      break
    case STOP:
      return update(state, {$merge: {status: action.newState}})
      break
    case PAUSE:
      return update(state, {$merge: {status: action.newState}})
      break
    case MUTE:
      return update(state, {$merge: {status: action.newState}})
      break
    case OPTIONS_CHANGE:
      return update(state, {$merge: {options: action.options}})
      break
    case MEMORY_CHANGE:
      return update(state, {$merge: {memory: action.memory}})
      break
    case CHANGE:
      return update(state, {
        drive: {$set: {...action.album, index: action.index}}
      })
      break
    default:
      return state
  }
}

export default reducer