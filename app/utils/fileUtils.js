/**
 * Promise based download file method
 */
const request = require('request')
const fs = require('fs')
const path = require('path')

const LIBRARY_PATH = './library/'

function fileDownload(configuration) {
  return new Promise(function (resolve, reject) {
    // Save variable to know progress
    let received_bytes = 0
    let total_bytes = 0

    let req = request({
      method: 'GET',
      uri: configuration.remoteFile
    })

    let out = fs.createWriteStream(configuration.localFile)
    req.pipe(out)

    req.on('response', function (data) {
      // Change the total bytes value to get progress later.
      total_bytes = parseInt(data.headers['content-length'])
    })

    // Get progress if callback exists
    if (configuration.hasOwnProperty("onProgress")) {
      req.on('data', function (chunk) {
        // Update the received bytes
        received_bytes += chunk.length

        configuration.onProgress(received_bytes, total_bytes)
      })
    } else {
      req.on('data', function (chunk) {
        // Update the received bytes
        received_bytes += chunk.length
      })
    }

    req.on('end', function () {
      resolve()
    });
  });
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

const getAppRoutePath = _ => path.resolve(path.dirname(global.require.main.filename), '../')

const getAudioPath = audioPath => path.resolve(getAppRoutePath(), LIBRARY_PATH, audioPath)

export default {
  fileDownload,
  getAppRoutePath,
  getAudioPath,
  getYtLength
}
