// @flow
import { combineReducers } from 'redux'
import listReducer from './listReducer'
import playerReducer from './playerReducer'
import playlistReducer from './playlistReducer'

export default combineReducers({
  listReducer,
  playerReducer,
  playlistReducer
})