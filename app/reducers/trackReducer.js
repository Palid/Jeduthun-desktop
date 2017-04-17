// @flow
import update from 'immutability-helper'
import { change } from './playerReducer'
import {fileDownload, getAudioPath} from '../utils/fileUtils'

const PLAY_TRACK = 'tracks/PLAY_TRACK'
const DOWNLOAD_TRACK = 'tracks/DOWNLOAD_TRACK'
const CHECK_TRACK_STATUS = 'tracks/CHECK_TRACK_STATUS'
const CHANGE_TRACK_STATUS = 'tracks/CHANGE_TRACK_STATUS'
const SET_DOWNLOAD_STATUS = 'tracks/SET_DOWNLOAD_STATUS'
const SAVE_TRACK = 'tracks/SAVE_TRACK'

export function playTrackAction (track, index)  {
  return dispatch => {
    dispatch(change(track, index))
    dispatch(changeTrackStatusAction('PLAYING', index))
  }
}
export function checkTrackStatusAction (track, index) {
  return dispatch => {
    switch(track.status) {
      case 'NEW':
        dispatch(downloadTrackAction(track, index))
        break
      case 'PLAYING':
        dispatch(changeTrackStatusAction(track.status, index))
        break
      case 'PAUSED':
        dispatch(changeTrackStatusAction(track.status, index))
        break
      case 'READY':
        dispatch(changeTrackStatusAction(track.status, index))
        break
      case 'ERROR':
        dispatch(changeTrackStatusAction(track.status, index))
        break
      default:
        console.error(`No status defined for TRACK ${track.title}`)
    }
  }
}
export function downloadTrackAction (track, index) {
  return dispatch => {
    fileDownload({
        remoteFile: `${track.link}`,
        onProgress: function (received){
            dispatch(setDownloadStatusAction(received, index))
        }
    }).then(function(filePath) {
      let responseObject = {
        file: filePath,
        status: 'READY'
      }
      dispatch(saveTrackAction(responseObject, index))
      dispatch(changeTrackStatusAction('READY', index))
    })
  }
}
export const changeTrackStatusAction = (status, index) =>  ({
  type: CHANGE_TRACK_STATUS,
  status,
  index
})
export const setDownloadStatusAction = (loading, index) => ({
  type: SET_DOWNLOAD_STATUS,
  loading,
  index
})
export const saveTrackAction = (track, index) => ({
  type: SAVE_TRACK,
  track,
  index
})

const reducer = (state = {}, action) => {
  switch(action.type) {
    case CHANGE_TRACK_STATUS:
      return update(state, {$merge: {status: action.status}})
      break
    case DOWNLOAD_TRACK:
      return update(state, {$merge: action.track})
      break
    case SET_DOWNLOAD_STATUS:
      return update(state, {$merge: {loading: action.loading}})
      break
    case SAVE_TRACK:
      return update(state, {$merge: action.track})
      break
    default:
      return state
  }
}

export default reducer
