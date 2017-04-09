import { playerDefaults } from './../statics/TypesAndDefaults'
import update from 'immutability-helper'

// TODO:
// 1.) Modify according to recieved data for album
// 2.) Work through every function to make it really work

const START = 'player/START'
const STOP = 'player/STOP'
const PAUSE = 'player/PAUSE'
const MUTE = 'player/MUTE'
const OPTIONS_CHANGE = 'player/OPTIONS_CHANGE'
const CHANGE = 'player/CHANGE'

export const start = (currentState) => ({
  type: START,
  currentState
})
export const stop = (currentState) => ({
  type: STOP,
  currentState
})
export const pause = (currentState) => ({
  type: PAUSE,
  currentState
})
export const mute = (currentState) => ({
  type: MUTE,
  currentState
})
export const optionsChange = (options) => ({
  type: OPTIONS_CHANGE,
  options
})
export const change = (album) => ({
  type: CHANGE,
  album
})

const reducer = (state = playerDefaults, action) => {
  switch(action.type) {
    case START | STOP | PAUSE:
      return update(state, {$merge: action.currentState})
      break
    case OPTIONS_CHANGE || MUTE:
      return update(state, {$merge: {options: action.options}})
      break
    case CHANGE:
      return update(state, {
        drive: {$set: action.album}
      })
      break
    default:
      return state
  }
}

export default reducer