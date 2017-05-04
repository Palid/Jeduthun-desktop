/**
 * Promise based download file method
 */
const request = require('request')
const fs = require('fs')
const path = require('path')
const { Pully, Presets } = require('pully')

const LIBRARY_PATH = './library/'

function checkLibrary(libraryPath) {
  let library = libraryPath ? libraryPath : LIBRARY_PATH
  return new Promise(function (resolve, reject) {
    let output = null
    fs.readdir(library, (err, files) => { resolve(files) })
  })
}

function fileDownload(configuration) {
  return new Promise(function(resolve, reject) {
    const pully = new Pully()
    const options = {
      url: configuration.remoteFile,
      dir: configuration.path,
      template: '${title}',
      preset: Presets.MP3,
      info: (format, cancel) => {
        console.log('Verify: ' + format.info.downloadSize);
      },
      progress: (data) => {
        if (data.indeterminate) {
          console.log(`[${new Date().toUTCString()}] Working...`);
        } else {
          configuration.onProgress(data.percent)
        }
      }
    };

    pully.download(options)
    .then((results) => {
      console.log(`Download Complete: "${results.path}"`);
      resolve({status: true, path: results.path})
    })
    .catch(err => resolve({error: err, status: false}))
  })
}

function ytDurationToStr(ytDuration) {
  let reptms = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/
  let hours = 0, minutes = 0, seconds = 0, totalseconds

  if (reptms.test(ytDuration)) {
    let matches = reptms.exec(ytDuration)
    if (matches[1]) hours = Number(matches[1])
    if (matches[2]) minutes = Number(matches[2])
    if (matches[3]) seconds = Number(matches[3])
    totalseconds = hours * 3600  + minutes * 60 + seconds
  }

  if (hours > 0) {
    return `${hours}:${minutes}:${seconds}`
  } else {
    let secondsOutput = String(seconds)
    if(secondsOutput.length === 1){
      secondsOutput = '0' + secondsOutput
    }
    return `${minutes}:${secondsOutput}`
  }
}

function parseJSON(response) {
  return response.json()
}

function getYtLength(id, key) {
  return fetch(`https://www.googleapis.com/youtube/v3/videos?part=id,snippet,contentDetails&id=${id}&key=${key}`)
  .then(parseJSON)
  .then(function(body){
    return ytDurationToStr(body.items[0].contentDetails.duration)
  })
  .catch(err => console.error(err.message))
}

function getRandomArbitrary(min, max) {
  return Math.trunc(Math.random() * (max - min) + min)
}

export default {
  fileDownload,
  getYtLength,
  checkLibrary,
  getRandomArbitrary
}
