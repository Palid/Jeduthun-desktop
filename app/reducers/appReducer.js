import { combineReducers } from 'redux'
import listReducer from './listReducer'
import playerReducer from './playerReducer'

export default combineReducers({
  listReducer,
  playerReducer
})